# Guia de Contribuição

Obrigado por considerar contribuir com o Hub de Conhecimento Financeiro! Este documento fornece diretrizes para contribuir com o projeto.

## 📋 Processo de Contribuição

1. Fork o repositório
2. Clone seu fork localmente
3. Crie uma branch para sua contribuição:
   ```bash
   git checkout -b feature/nome-da-feature
   ```
4. Faça suas alterações seguindo as convenções do projeto
5. Commit suas mudanças:
   ```bash
   git commit -m "feat: adiciona nova calculadora de juros compostos"
   ```
6. Push para seu fork:
   ```bash
   git push origin feature/nome-da-feature
   ```
7. Abra um Pull Request

## 📝 Convenções de Código

### Commits

Seguimos a convenção [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` nova funcionalidade
- `fix:` correção de bug
- `docs:` alterações na documentação
- `style:` formatação, ponto e vírgula, etc.
- `refactor:` refatoração de código
- `test:` adição ou modificação de testes
- `chore:` manutenção de build, dependências, etc.

### Estilo de Código

- Use TypeScript
- Siga o ESLint e Prettier configurados
- Mantenha componentes pequenos e focados
- Documente funções e componentes complexos
- Escreva testes para novas funcionalidades

### Nomenclatura

- **Branches:** `tipo/descricao-curta` (ex: `feat/calculadora-cdb`)
- **Componentes:** PascalCase (ex: `InvestmentCalculator.tsx`)
- **Funções:** camelCase (ex: `calculateInterest`)
- **Variáveis:** camelCase (ex: `totalInvestment`)
- **Interfaces:** prefixo I (ex: `IInvestmentProps`)
- **Types:** prefixo T (ex: `TCalculatorConfig`)

## 🧪 Testes

- Escreva testes unitários para novas funcionalidades
- Mantenha ou aumente a cobertura de testes
- Verifique se todos os testes passam antes do PR

## 📚 Documentação

- Atualize o README.md se necessário
- Documente novas funcionalidades
- Mantenha a documentação da API atualizada
- Adicione exemplos de uso quando relevante

## ⚠️ O que evitar

- Breaking changes sem discussão prévia
- Commits diretamente na main
- Código não testado
- Funcionalidades sem documentação
- Duplicação de código

## 🤝 Código de Conduta

Este projeto segue um [Código de Conduta](./CODE_OF_CONDUCT.md). Ao participar, você concorda em seguir suas diretrizes.

## 📫 Dúvidas?

Abra uma issue ou entre em contato através do [site](https://luaraujo.com).

---

Agradecemos sua contribuição! 🎉