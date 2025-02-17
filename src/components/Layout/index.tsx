import React from 'react';
import Head from 'next/head';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export function Layout({ 
  children, 
  title = 'Lucas Araujo - Personal Website',
  description = 'Personal website of Lucas Araujo'
}: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="flex-grow">
        {children}
      </main>

      <Footer />
    </div>
  );
}