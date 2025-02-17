import Head from 'next/head';
import { Header } from '@/components/Header';
import { Calculators } from '@/components/Calculators';
import { Features } from '@/components/Features';
import { CTA } from '@/components/CTA';

export default function Home() {
  return (
    <>
      <Head>
        <title>Calculadoras Financeiras - Seu Futuro Financeiro Começa Aqui</title>
        <meta name="description" content="Explore ferramentas avançadas para simular investimentos, planejar seus objetivos financeiros e dominar o mundo das finanças." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" 
          rel="stylesheet"
        />
      </Head>

      <main className="min-h-screen bg-gray-50">
        <Header />
        <Calculators />
        <Features />
        <CTA />
      </main>
    </>
  );
}