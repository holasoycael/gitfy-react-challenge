# 🚀 Gitfy — Explorer & Analytics para GitHub

![React 19](https://img.shields.io/badge/React-19.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-8.1-purple?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss)
![HeroUI](https://img.shields.io/badge/HeroUI-2.8-black?style=for-the-badge)
![Jest](https://img.shields.io/badge/Jest-30.4-C21325?style=for-the-badge&logo=jest)
![Storybook](https://img.shields.io/badge/Storybook-10.5-FF4785?style=for-the-badge&logo=storybook)

O **Gitfy** é uma plataforma moderna, de alta performance e visualmente impressionante para exploração profunda de usuários e repositórios do GitHub. Projetado sob os princípios de **Domain-Driven Models**, **Clean Architecture** e **Design System Modular**, o projeto entrega uma experiência de usuário (UI/UX) fluida, responsiva e altamente resiliente.

---

## 💻 Como Executar o Projeto

### Pré-requisitos
- **Node.js** (`>= 18.0.0`)
- **npm** ou **yarn**

### 1. Instalar dependências
```bash
npm install
# ou
yarn install
```

### 2. Rodar em ambiente de desenvolvimento
```bash
npm run dev
# ou
yarn dev
```
Acesse a aplicação no navegador em: `http://localhost:5173`

### 3. Build de Produção e Preview
```bash
# Compilar o código TypeScript e gerar o bundle otimizado
npm run build

# Visualizar a versão de produção localmente
npm run preview
```

---

## 🧪 Como Executar os Testes

O projeto utiliza **Jest** combinado com **React Testing Library** para validar o comportamento dos componentes, a renderização de skeletons e a integridade da camada de modelos.

```bash
# Executar a suíte completa de testes
npm run test

# Executar testes em modo interativo (Watch)
npm run test:watch
```

---

## 📖 Como Usar o Storybook

O **Storybook** é utilizado no Gitfy para visualizar, isolar e documentar todos os componentes visuais com suporte a controles dinâmicos de propriedades (Controls), modo escuro e acessibilidade (`a11y`).

```bash
# Iniciar o servidor do Storybook (disponível em http://localhost:6006)
npm run storybook

# Gerar build estático da documentação
npm run build-storybook
```

---

## 🌟 Proposta do Projeto & Diferenciais

### 🎨 UI/UX Design Futurista e Efeitos Ambientais
- **Design System Premium**: Interface com temática Dark Mode imersiva, utilizando efeitos neon, glassmorphism e ilhas ambientais personalizadas ([`GlowTop`](file:///d:/challenger/gitfy-react-challenge/src/components/GlowTop/index.tsx), [`GlowBottom`](file:///d:/challenger/gitfy-react-challenge/src/components/GlowBottom/index.tsx) e [`Atmosphere`](file:///d:/challenger/gitfy-react-challenge/src/components/Atmosphere/index.tsx)).
- **Zero CLS (Cumulative Layout Shift)**: Skeletons estruturais customizados ([`skeleton.tsx`](file:///d:/challenger/gitfy-react-challenge/src/components/RepoList/skeleton.tsx)) garantem um carregamento progressivo suave durante requisições assíncronas.
- **Responsividade Total (Mobile-First)**: Adaptado e testado minuciosamente para resoluções a partir de 320px (smartphones menores), tablets e monitores Ultra-Wide.

### ⚡ Performance & Escalabilidade Enterprise
- **Model-Driven Business Logic**: Lógica de negócios 100% desvinculada da camada visual (React). Toda a transformação de dados, validação de contratos e chamadas de infraestrutura residem em modelos Singleton reutilizáveis e testáveis isoladamente.
- **Reatividade e Caching Resiliente**: Utilização de **SWR** para estratégia *Stale-While-Revalidate* e integração com **IndexedDB** (`idb-keyval`) para retenção local de histórico de pesquisas e navegação em cache offline.
- **Syntax Highlighting & Renderização GFM**: Visualização nativa de arquivos `README.md` com tabelas, alertas e blocos de código formatados dinamicamente via **React Syntax Highlighter** e **Remark GFM**.

---

## 🏗️ Arquitetura do Projeto

A arquitetura do **Gitfy** foi projetada para garantir baixo acoplamento, alta coesão e facilidade de manutenção.

```
Gitfy Architecture
├── Camada Visual (UI / React)
│   ├── Templates (Home, Profile, Repository)
│   ├── Components (Atomizados, Isolados, com skeleton e stories)
│   └── Layouts & Estilos (Tailwind CSS v4 + HeroUI)
│
├── Camada de Estado & Cache (State & Cache Layer)
│   ├── Zustand (Estado Global Leve)
│   ├── SWR (Data Fetching Reativo)
│   └── IndexedDB (Persistência de Usuários Recentes)
│
└── Camada de Domínio (Domain Models Layer - Singletons)
    ├── Models (Users, Github, Utils)
    └── Schemas Zod (Validação de Tipos Runtime & Contratos de API)
```

### Principais Padrões Utilizados:

1. **Singleton Models (`src/models/`)**:
   - Modelos como `Users` e `Github` são exportados como instâncias únicas (`new (class { ... })()`).
   - Organização modular por subcampos e coleções (`User.followers`, `User.__Array__`, `User.__`).
   - Proibição de imports do React dentro da camada de modelos (com exceção do Router), mantendo o domínio puro e agnóstico ao framework.

2. **Tipagem com Zod**:
   - Todos os dados recebidos da API do GitHub são validados via schemas **Zod**, derivando tipos TypeScript automaticamente (`z.infer<typeof Schema...>`).
   - Zero uso de `any` em todo o projeto.

3. **Convenção BEM em Testes (`data-testid`)**:
   - Seletores de teste estruturados segundo o padrão `block__element--modifier` (ex: `data-testid="search__input"`, `data-testid="profile__button--save"`), garantindo que refatorações visuais não quebrem a suíte de testes.

4. **Organização Semântica de Imports**:
   - Estrutura rigorosa de agrupamento com comentários explicativos (`// contexts`, `// models`, `// hooks`, `// components JSX`, `// types and interfaces`).

---

## 🛠️ Tecnologias e Ferramentas

| Categoria | Tecnologia / Ferramenta | Descrição |
| :--- | :--- | :--- |
| **Core** | [React 19](https://react.dev/) | Bibliotecas de UI para interfaces reativas modernas |
| **Linguagem** | [TypeScript 6](https://www.typescriptlang.org/) | Superset JS com tipagem estática e segurança de código |
| **Build Tool** | [Vite 8](https://vitejs.dev/) | Bundler ultrarrápido com Hot Module Replacement (HMR) |
| **Estilização** | [Tailwind CSS v4](https://tailwindcss.com/) & [HeroUI](https://heroui.com/) | Framework CSS utilitário e biblioteca de componentes acessíveis |
| **Ícones** | [Lucide React](https://lucide.dev/) & [Phosphor Icons](https://phosphoricons.com/) | Conjuntos de ícones vetoriais modernos e leves |
| **Estado & Cache** | [Zustand](https://zustand-demo.pmnd.rs/) & [SWR](https://swr.vercel.app/) | Gerenciamento de estado global atômico e data fetching reativo |
| **Persistência** | [idb-keyval](https://github.com/jakearchibald/idb-keyval) | Armazenamento de chave-valor leve em IndexedDB |
| **Validação** | [Zod](https://zod.dev/) | Validação de schemas orientada a tipos em runtime |
| **Testes** | [Jest](https://jestjs.io/) & [Testing Library](https://testing-library.com/) | Suíte de testes unitários e de integração de componentes |
| **Documentação** | [Storybook 10](https://storybook.js.org/) | Ambiente isolado para desenvolvimento e documentação de componentes |
| **Qualidade** | [ESLint 9](https://eslint.org/) & [Prettier](https://prettier.io/) | Padronização de código, linting e formatação automática |

---

## 📂 Estrutura de Diretórios

```txt
src/
├── @types/          # Definições globais de tipos e declarações de módulos
├── app/             # Configurações de rotas e inicializadores da aplicação
├── components/      # Componentes UI reutilizáveis (index, skeleton, stories, test, types)
│   ├── Atmosphere/
│   ├── GlowBottom/
│   ├── GlowTop/
│   ├── MarkdownRenderer/
│   ├── ProfileCard/
│   ├── RecentUsers/
│   ├── RepoItem/
│   ├── RepoList/
│   ├── ScrollShadow/
│   ├── SearchUser/
│   └── UsersDrawer/
├── contexts/        # React Contexts para estados globais leves da interface
├── helpers/         # Helpers de testes e utilitários de suporte (TestingLibrary setup)
├── hooks/           # Custom React Hooks
├── models/          # Camada de Domínio - Singletons e Regras de Negócio
│   ├── Github/      # Integrações de API do GitHub e manipulação de repositórios
│   ├── Users/       # Gerenciamento de dados de usuário e histórico
│   └── Utils/       # Utilitários de domínio e formatadores
├── pages/           # Camada de roteamento da aplicação
├── styles/          # Tokens Globais, Tailwind CSS e configurações de estilo
├── templates/       # Páginas principais encapsuladas (Home, Profile, Repository)
├── typings/         # Tipos e interfaces compartilhados entre componentes
└── utils/           # Funções utilitárias puras
```

---

## 🎨 Principais Funcionalidades da Aplicação

1. **Busca Avançada de Desenvolvedores**:
   - Pesquisa em tempo real de usuários do GitHub com tratamento de erros de API e estados limpos de não encontrado.
2. **Perfis Completos**:
   - Visualização de bio, foto de perfil, localização, empresa, número de seguidores, repositórios públicos e estrelas.
3. **Listagem & Filtro de Repositórios**:
   - Ordenação e filtragem por linguagem, estrelas e data de atualização.
4. **Visualizador de Repositório & Arquivos**:
   - Leitura de `README.md` estilizado com suporte a Markdown completo, Syntax Highlighting para diversos arquivos de código, histórico de commits, tópicos e licenças.
5. **Histórico de Usuários Recentes (Drawer)**:
   - Gaveta lateral interativa para acesso rápido a perfis buscados recentemente, persistidos localmente.

---

## 🛡️ Qualidade de Código & Linting

O projeto inclui regras estritas de linting e formatação configuradas com **ESLint v9** e **Prettier**.

```bash
# Executar a verificação do ESLint
npm run lint

# Corrigir automaticamente problemas de lint e formatação
npm run lint:fix
```

---

## 📄 Licença

Este projeto é um software livre distribuído sob a licença **MIT**. Sinta-se à vontade para utilizar, estudar e aprimorar!
