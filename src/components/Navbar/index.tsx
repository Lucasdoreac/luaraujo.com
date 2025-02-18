import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from '@/contexts/ThemeContext';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const navigation = [
    { name: 'Início', href: '/' },
    {
      name: 'Calculadoras',
      href: '#',
      subItems: [
        { name: 'Simulador Educacional', href: '/calculadoras/educacional' },
        { name: 'PGBL vs CDB', href: '/calculadoras/pgbl-cdb' },
        { name: 'Investimentos', href: '/calculadoras/investimentos' },
      ]
    },
    { name: 'Contato', href: '/contato' },
  ];

  return (
    <nav className={`shadow-lg transition-colors ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-500">
                Luciana Araujo
              </Link>
            </div>
            
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => (
                <div key={item.name} className="relative group">
                  {item.subItems ? (
                    <>
                      <button
                        className={`${
                          router.pathname.startsWith(item.href)
                            ? 'border-blue-500'
                            : 'border-transparent hover:border-gray-300'
                        } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                      >
                        {item.name}
                        <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <div className={`absolute left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ${isDark ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow-lg ring-1 ring-black ring-opacity-5`}>
                        <div className="py-1" role="menu">
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className={`block px-4 py-2 text-sm ${
                                router.pathname === subItem.href
                                  ? 'bg-blue-500 text-white'
                                  : isDark
                                    ? 'text-gray-100 hover:bg-gray-600'
                                    : 'text-gray-700 hover:bg-gray-100'
                              }`}
                              role="menuitem"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`${
                        router.pathname === item.href
                          ? 'border-blue-500'
                          : 'border-transparent hover:border-gray-300'
                      } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
            >
              {isDark ? (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              type="button"
              className={`sm:hidden inline-flex items-center justify-center p-2 rounded-md transition-colors ${
                isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          {navigation.map((item) => (
            <div key={item.name}>
              {item.subItems ? (
                <>
                  <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'} px-3 py-2 text-sm font-medium`}>
                    {item.name}
                  </div>
                  <div className="pl-4">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className={`block px-3 py-2 text-sm ${
                          router.pathname === subItem.href
                            ? 'bg-blue-500 text-white'
                            : isDark
                              ? 'text-gray-100 hover:bg-gray-600'
                              : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  href={item.href}
                  className={`block px-3 py-2 text-sm font-medium ${
                    router.pathname === item.href
                      ? 'bg-blue-500 text-white'
                      : isDark
                        ? 'text-gray-100 hover:bg-gray-600'
                        : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}