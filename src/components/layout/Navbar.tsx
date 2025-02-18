import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calculator, Home, Book, Settings } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? 'bg-accent' : '';
  };

  const navItems = [
    { href: '/', label: 'Início', icon: Home },
    { href: '/simulador', label: 'Simulador', icon: Calculator },
    { href: '/educacional', label: 'Educacional', icon: Book },
    { href: '/configuracoes', label: 'Configurações', icon: Settings },
  ];

  return (
    <nav className="fixed top-0 w-full bg-background border-b z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">L.U. Araujo</span>
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-accent transition-colors ${isActive(item.href)}`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="md:hidden flex items-center">
            {/* Mobile menu button */}
            <button className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:bg-accent">
              <span className="sr-only">Abrir menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium hover:bg-accent transition-colors ${isActive(item.href)}`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}