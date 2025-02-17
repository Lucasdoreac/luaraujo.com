export const concepts = {
  jurosCompostos: {
    title: 'Juros Compostos',
    description: 'São os juros que incidem não apenas sobre o capital inicial, mas também sobre os juros acumulados em períodos anteriores.',
    examples: [
      {
        title: 'Exemplo Prático',
        description: 'Investimento de R$ 1.000 a 10% ao ano por 2 anos:',
        steps: [
          'Ano 1: 1.000 × (1 + 0,10) = R$ 1.100',
          'Ano 2: 1.100 × (1 + 0,10) = R$ 1.210'
        ],
        conclusion: 'O ganho total foi de R$ 210, sendo R$ 100 no primeiro ano e R$ 110 no segundo.'
      }
    ],
    tips: [
      'Quanto maior o prazo, maior o efeito dos juros compostos',
      'Pequenas diferenças na taxa podem gerar grandes diferenças no longo prazo',
      'Começar a investir cedo é fundamental para aproveitar este efeito'
    ],
    resources: [
      {
        type: 'video',
        title: 'Entenda os Juros Compostos',
        url: 'https://youtube.com/watch?v=exemplo'
      },
      {
        type: 'article',
        title: 'O Poder dos Juros Compostos',
        url: 'https://exemplo.com/artigo'
      }
    ]
  },
  cdi: {
    title: 'CDI (Certificado de Depósito Interbancário)',
    description: 'Taxa de referência no mercado financeiro brasileiro, muito utilizada para remunerar investimentos de renda fixa.',
    examples: [
      {
        title: 'Como funciona',
        description: 'CDB que rende 100% do CDI com CDI a 13,75% ao ano:',
        steps: [
          'Investimento acompanha exatamente a taxa CDI',
          'Para cada R$ 1.000, rendimento anual de R$ 137,50 (bruto)'
        ],
        conclusion: 'O CDI é uma das principais referências para investimentos conservadores.'
      }
    ],
    tips: [
      'Compare sempre o % do CDI oferecido entre investimentos',
      'Considere o imposto de renda ao calcular o rendimento líquido',
      'Observe se há garantia do FGC no investimento'
    ],
    resources: [
      {
        type: 'calculator',
        title: 'Calculadora de Rendimento CDI',
        url: '/calculadoras/cdi'
      }
    ]
  },
  inflacao: {
    title: 'Inflação',
    description: 'Aumento generalizado dos preços que reduz o poder de compra do dinheiro ao longo do tempo.',
    examples: [
      {
        title: 'Impacto da Inflação',
        description: 'Com inflação de 5% ao ano:',
        steps: [
          'R$ 1.000 hoje valerão R$ 950 em poder de compra daqui a um ano',
          'É preciso rendimento acima da inflação para ganho real'
        ],
        conclusion: 'A inflação é um fator crucial ao planejar investimentos.'
      }
    ],
    tips: [
      'Busque investimentos que paguem acima da inflação',
      'IPCA+ é um bom indicador para proteção contra inflação',
      'Diversifique para se proteger de diferentes cenários'
    ],
    resources: [
      {
        type: 'tool',
        title: 'Calculadora de Valor Real',
        url: '/calculadoras/inflacao'
      }
    ]
  },
  rendaFixa: {
    title: 'Renda Fixa',
    description: 'Investimentos com rentabilidade previsível, geralmente atrelados a taxas de juros.',
    examples: [
      {
        title: 'Tipos principais',
        description: 'Exemplos de investimentos em renda fixa:',
        items: [
          'CDB: Certificado de Depósito Bancário',
          'Tesouro Direto: Títulos públicos',
          'LCI/LCA: Letras de Crédito Imobiliário/Agronegócio'
        ]
      }
    ],
    tips: [
      'Verifique a liquidez do investimento',
      'Atente-se ao rating do emissor',
      'Compare as taxas entre diferentes produtos'
    ],
    resources: [
      {
        type: 'comparison',
        title: 'Comparativo Renda Fixa',
        url: '/comparativos/renda-fixa'
      }
    ]
  },
  impostoRenda: {
    title: 'Imposto de Renda',
    description: 'Tributação sobre os rendimentos dos investimentos.',
    examples: [
      {
        title: 'Tabela Regressiva',
        description: 'Alíquotas para renda fixa:',
        items: [
          'Até 180 dias: 22,5%',
          '181 a 360 dias: 20%',
          '361 a 720 dias: 17,5%',
          'Acima de 720 dias: 15%'
        ]
      }
    ],
    tips: [
      'Planeje o prazo do investimento considerando o IR',
      'Alguns investimentos são isentos (LCI/LCA)',
      'PGBL pode trazer benefício fiscal'
    ],
    resources: [
      {
        type: 'simulator',
        title: 'Simulador de IR',
        url: '/calculadoras/imposto-renda'
      }
    ]
  }
};

export const quizzes = [
  {
    title: 'Juros Compostos',
    questions: [
      {
        question: 'O que são juros compostos?',
        options: [
          'Juros que incidem apenas sobre o capital inicial',
          'Juros que incidem sobre o capital e juros acumulados',
          'Juros fixos mensais',
          'Juros sem capitalização'
        ],
        correctAnswer: 1,
        explanation: 'Juros compostos são aqueles que incidem tanto sobre o capital inicial quanto sobre os juros acumulados em períodos anteriores.'
      }
    ]
  }
];

export const glossary = {
  liquidez: {
    term: 'Liquidez',
    definition: 'Facilidade de converter um investimento em dinheiro sem perda significativa de valor.'
  },
  volatilidade: {
    term: 'Volatilidade',
    definition: 'Medida da variação do preço de um ativo ao longo do tempo.'
  }
};