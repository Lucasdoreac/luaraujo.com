import React from 'react';
import Head from 'next/head';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Lucas Araujo - Personal Website</title>
        <meta name="description" content="Personal website of Lucas Araujo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to My Personal Website
          </h1>
          <p className="text-xl text-gray-600">
            Site under construction - Coming soon!
          </p>
        </div>
      </main>
    </div>
  );
}