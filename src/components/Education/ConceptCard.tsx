import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface Example {
  title: string;
  description: string;
  steps?: string[];
  items?: string[];
  conclusion?: string;
}

interface Resource {
  type: 'video' | 'article' | 'calculator' | 'tool' | 'comparison' | 'simulator';
  title: string;
  url: string;
}

interface ConceptCardProps {
  title: string;
  description: string;
  examples: Example[];
  tips: string[];
  resources?: Resource[];
}

export function ConceptCard({
  title,
  description,
  examples,
  tips,
  resources
}: ConceptCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { theme } = useTheme();

  const getResourceIcon = (type: Resource['type']) => {
    switch (type) {
      case 'video':
        return 'play-circle';
      case 'article':
        return 'file-text';
      case 'calculator':
        return 'calculator';
      case 'tool':
        return 'tools';
      case 'comparison':
        return 'balance-scale';
      case 'simulator':
        return 'desktop';
      default:
        return 'link';
    }
  };

  return (
    <div 
      className={`rounded-lg shadow-lg overflow-hidden transition-all duration-300
        ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}
        ${isExpanded ? 'ring-2 ring-blue-500' : ''}`}
    >
      <div 
        className="p-6 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button 
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors
              ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'} text-blue-500`}></i>
          </button>
        </div>
        
        <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          {description}
        </p>
      </div>

      {isExpanded && (
        <div className="px-6 pb-6 space-y-6">
          {/* Examples */}
          <div>
            <h4 className="font-semibold mb-3">Exemplos</h4>
            <div className="space-y-4">
              {examples.map((example, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}
                >
                  <h5 className="font-medium mb-2">{example.title}</h5>
                  <p className={`mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {example.description}
                  </p>
                  {example.steps && (
                    <ul className="list-decimal pl-5 space-y-1 mb-3">
                      {example.steps.map((step, stepIndex) => (
                        <li key={stepIndex}>{step}</li>
                      ))}
                    </ul>
                  )}
                  {example.items && (
                    <ul className="list-disc pl-5 space-y-1 mb-3">
                      {example.items.map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {example.conclusion && (
                    <p className="text-blue-500 font-medium">{example.conclusion}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div>
            <h4 className="font-semibold mb-3">Dicas Importantes</h4>
            <ul className="space-y-2">
              {tips.map((tip, index) => (
                <li key={index} className="flex items-start">
                  <i className="fas fa-lightbulb text-yellow-500 mt-1 mr-2"></i>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          {resources && resources.length > 0 && (
            <div>
              <h4 className="font-semibold mb-3">Recursos Adicionais</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {resources.map((resource, index) => (
                  <a
                    key={index}
                    href={resource.url}
                    className={`flex items-center p-3 rounded-lg transition-colors
                      ${theme === 'dark' 
                        ? 'bg-gray-700 hover:bg-gray-600' 
                        : 'bg-gray-50 hover:bg-gray-100'}`}
                  >
                    <i className={`fas fa-${getResourceIcon(resource.type)} text-blue-500 mr-3`}></i>
                    <span>{resource.title}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}