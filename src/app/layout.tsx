import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import { RootLayout } from '@/components/layout/RootLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'L.U. Araujo - Hub de Conhecimento Financeiro',
  description: 'Hub educacional focado em calculadoras e simuladores de investimento',
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  );
}