# SearchUser Component

## 📌 Visão Geral

O **`SearchUser`** é um componente genérico e reutilizável de busca assíncrona com autocompletar. Ele permite buscar usuários com controle de debounce, navegação por teclado, e suporte a estados de carregamento (Skeleton), lista vazia e seleção de itens.

---

## 🏗️ Arquitetura e Decisões de Design

O componente segue os padrões e regras do projeto:

- **Desacoplamento Visual (`SearchUser/index.tsx`)**: Responsável unicamente pela renderização da UI, estado local de apresentação (dropdown visível, índice ativo) e orquestração de eventos de teclado/mouse. O componente recebe a função de busca assíncrona via prop `onFetch`.
- **Skeleton State (`SearchUser/skeleton.tsx`)**: Exibe uma estrutura de carregamento contendo 3 itens com visual Skeleton durante o tempo em que a promessa de `onFetch` está pendente.
- **Tipagem (`SearchUser/types.ts`)**: Define o modelo `TRowUser` (`username`, `avatarUrl`) e a interface `SearchUserProps`.

---

## ⚙️ Props

| Prop          | Tipo                                     | Obrigatório | Descrição                                                                           |
| :------------ | :--------------------------------------- | :---------: | :---------------------------------------------------------------------------------- |
| `onFetch`     | `(query: string) => Promise<TRowUser[]>` |   **Sim**   | Função assíncrona responsável por buscar e retornar os registros de usuários.       |
| `onSelect`    | `(user: TRowUser) => void`               |     Não     | Callback executado ao selecionar um usuário na lista (por clique ou tecla `Enter`). |
| `placeholder` | `string`                                 |     Não     | Texto explicativo exibido dentro do campo de busca quando vazio.                    |

---

## ⌨️ Atalhos e Navegação por Teclado

| Tecla                           | Ação                                                                     |
| :------------------------------ | :----------------------------------------------------------------------- |
| `Seta para Baixo` (`ArrowDown`) | Avança para o próximo item da lista (com rotação/loop ao atingir o fim). |
| `Seta para Cima` (`ArrowUp`)    | Retorna ao item anterior da lista (com rotação/loop ao atingir o topo).  |
| `Tab` / `Shift + Tab`           | Alterna em sequência entre os itens da lista suspensa.                   |
| `Enter`                         | Seleciona o usuário atualmente destacado e fecha o dropdown.             |
| `Escape`                        | Limpa o campo de busca e fecha a lista suspensa.                         |

---

## 🧪 Testes Automatizados

Os testes automatizados em `test.tsx` cobrem os fluxos do componente utilizando `@testing-library/react` e `@testing-library/user-event`:

- Renderização inicial e verificações de marcadores de acessibilidade/testes (`data-testid`).
- Busca com debounce e exibição do dropdown com resultados.
- Estado de carregamento Skeleton durante busca.
- Navegação completa por teclado (`ArrowDown`, `ArrowUp`, `Tab`, `Shift+Tab`, `Enter`, `Escape`).
- Seleção por clique de mouse.
- Exibição de estado vazio com ícone e mensagem informativa.
- Tratamento de erro na requisição à API.

Para executar a suíte de testes do componente:

```bash
npx jest src/components/SearchUser/test.tsx
```

---

## 📚 Storybook

As histórias do **Storybook** em `stories.tsx` demonstram o componente integrado à camada de modelo real do GitHub (`GitHub.search.fetchByQuery`):

- `Default`: Estado inicial do componente.
- `TypingInteraction`: Interação de digitação simulada.
- `KeyboardNavigation`: Teste visual de navegação e atalhos via teclado.

Para executar o Storybook:

```bash
npm run storybook
```
