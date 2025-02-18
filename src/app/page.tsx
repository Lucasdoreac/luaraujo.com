import Link from 'next/link';
import { Calculator, PiggyBank, Banknote, ShieldCheck, Clock, Laptop } from 'lucide-react';

interface SimulatorCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
  buttonText: string;
  subtitle: string;
}

function SimulatorCard({ title, description, icon: Icon, href, buttonText, subtitle }: SimulatorCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg transition-transform hover:scale-105">
      <div className="p-6">
        <div className="text-center mb-4">
          <Icon className="h-12 w-12 mx-auto text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-center mb-4">{title}</h3>
        <p className="text-gray-600 mb-6">
          {description}
        </p>
        <div className="text-center">
          <Link
            href={href}
            className="inline-block px-6 py-2 rounded-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
          >
            {buttonText}
          </Link>
        </div>
      </div>
      <div className="bg-gray-50 px-6 py-3 rounded-b-lg">
        <p className="text-sm text-gray-500 text-center">{subtitle}</p>
      </div>
    </div>
  );
}

function FeatureSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Recursos que Impulsionam suas Decisões
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="mb-6">
              <ShieldCheck className="h-12 w-12 mx-auto text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Segurança Reforçada</h3>
            <p className="text-gray-600">
              Suas informações permanecem seguras no seu navegador.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="mb-6">
              <Clock className="h-12 w-12 mx-auto text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Resultados Imediatos</h3>
            <p className="text-gray-600">
              Cálculos precisos, sem enrolação, para você agir agora.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="mb-6">
              <Laptop className="h-12 w-12 mx-auto text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Acessibilidade Total</h3>
            <p className="text-gray-600">
              Use em qualquer dispositivo, com a mesma experiência.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CallToAction() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">
            Pronto para decolar rumo aos seus Objetivos?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Não espere mais! Comece a planejar seu futuro financeiro agora mesmo com nossas ferramentas.
          </p>
          <Link
            href="/simulador"
            className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Começar Agora
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <header className="hero-section py-12 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="text-center lg:text-left lg:w-1/2 mb-8 lg:mb-0">
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                Desvende o Potencial do Seu Dinheiro
              </h1>
              <p className="text-xl text-gray-300 mb-6">
                Explore ferramentas avançadas para simular investimentos, planejar seus objetivos financeiros e dominar o mundo das finanças.
              </p>
              <Link 
                href="/simulador"
                className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Iniciar Simulação
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Escolha seu Portal de Simulação
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SimulatorCard
              title="Simulador Educacional"
              description="Desvende os mistérios da renda fixa e CDI, com juros compostos e inflação na prática."
              icon={Calculator}
              href="/simulador/educacional"
              buttonText="Acessar"
              subtitle="Entenda o Futuro"
            />

            <SimulatorCard
              title="PGBL vs CDB"
              description="Compare PGBL e CDB e encontre o investimento perfeito para você, sem complicações."
              icon={PiggyBank}
              href="/simulador/pgbl-cdb"
              buttonText="Comparar"
              subtitle="Compare e Decida"
            />

            <SimulatorCard
              title="Simulador de Investimentos"
              description="Veja seu patrimônio crescer com aportes e juros. Planejar nunca foi tão fácil e estimulante."
              icon={Banknote}
              href="/simulador/investimentos"
              buttonText="Simular"
              subtitle="Visualize seu Crescimento"
            />
          </div>
        </div>
      </section>

      <FeatureSection />
      <CallToAction />
    </main>
  );
}