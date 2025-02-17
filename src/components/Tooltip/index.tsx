import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'right' | 'bottom' | 'left';
  width?: string;
  delay?: number;
}

export function Tooltip({
  content,
  children,
  position = 'top',
  width = '200px',
  delay = 200,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  let timeout: NodeJS.Timeout;

  const showTooltip = () => {
    timeout = setTimeout(() => setIsVisible(true), delay);
  };

  const hideTooltip = () => {
    clearTimeout(timeout);
    setIsVisible(false);
  };

  useEffect(() => {
    if (isVisible && targetRef.current && tooltipRef.current) {
      const targetRect = targetRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      let x = 0;
      let y = 0;

      switch (position) {
        case 'top':
          x = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
          y = targetRect.top - tooltipRect.height - 10;
          break;
        case 'right':
          x = targetRect.right + 10;
          y = targetRect.top + (targetRect.height - tooltipRect.height) / 2;
          break;
        case 'bottom':
          x = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
          y = targetRect.bottom + 10;
          break;
        case 'left':
          x = targetRect.left - tooltipRect.width - 10;
          y = targetRect.top + (targetRect.height - tooltipRect.height) / 2;
          break;
      }

      // Keep tooltip within viewport
      x = Math.max(10, Math.min(x, window.innerWidth - tooltipRect.width - 10));
      y = Math.max(10, Math.min(y, window.innerHeight - tooltipRect.height - 10));

      setCoordinates({ x, y });
    }
  }, [isVisible, position]);

  return (
    <div 
      className="inline-block relative"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
      ref={targetRef}
    >
      {children}
      {isVisible && (
        <div
          ref={tooltipRef}
          className={`fixed z-50 px-3 py-2 text-sm rounded-lg shadow-lg transition-opacity duration-200
            ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}
            ${position === 'top' ? 'transform -translate-y-full' : ''}
            ${position === 'bottom' ? 'transform translate-y-2' : ''}
            ${position === 'left' ? 'transform -translate-x-full' : ''}
            ${position === 'right' ? 'transform translate-x-2' : ''}`}
          style={{
            width,
            left: `${coordinates.x}px`,
            top: `${coordinates.y}px`,
          }}
        >
          {content}
          <div 
            className={`absolute w-2 h-2 transform rotate-45
              ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
              ${position === 'bottom' ? '-top-1' : ''}
              ${position === 'top' ? '-bottom-1' : ''}
              ${position === 'left' ? '-right-1' : ''}
              ${position === 'right' ? '-left-1' : ''}
              ${position === 'top' || position === 'bottom' ? 'left-1/2 -translate-x-1/2' : ''}
              ${position === 'left' || position === 'right' ? 'top-1/2 -translate-y-1/2' : ''}`}
          />
        </div>
      )}
    </div>
  );
}