# Models — Users State Store (`models/Users/$`)

Este módulo implementa o gerenciamento de estado e a camada de persistência local para dados de usuários do GitHub na aplicação Gitfy.

---

## 🎯 Arquitetura & Conceito

A abordagem adotada neste modelo aproxima-se da arquitetura de um **banco de dados NoSQL do tipo Key-Value Store local (in-browser database)**:

1. **Estrutura em Memória (`Map<string, TUser>`)**:
   - O estado utiliza a estrutura de dados `Map` nativa do JavaScript onde a chave é o `username` do usuário e o valor é o objeto de perfil `TUser`.
   - Garante tempo de busca, inserção e deleção constante **\(O(1)\)**, dispensando iterações em arrays e mantendo a interface extremamente rápida independente da quantidade de usuários.

2. **Storage Assíncrono via IndexedDB (`idb-keyval`)**:
   - Em vez de utilizar o `localStorage` (limitado a ~5MB e síncrono/bloqueante), o estado é persistido assincronamente no **IndexedDB** do navegador através da biblioteca `idb-keyval`.
   - Permite armazenar volumes consideráveis de dados (centenas de megabytes) sem bloquear a thread principal (UI thread/Event Loop).

---

## 🚀 Principais Vantagens

- **Durabilidade e Continuidade Offline (Offline-First)**:
  - O usuário pode desligar a máquina, fechar o navegador ou perder a conexão com a internet. Ao reabrir a aplicação, o Zustand rehidrata o estado automaticamente via `onRehydrateStorage`, mantendo todos os dados armazenados disponíveis imediatamente.
- **Escalabilidade Sem Perda de Performance**:
  - À medida que mais usuários são buscados e visualizados, o cache em memória cresce dinamicamente sem afetar o desempenho da renderização.
- **Redução de Chamadas à API do GitHub**:
  - Evita consumo desnecessário da cota de requisições (_rate limit_) da API do GitHub ao manter o perfil dos usuários já consultados acessíveis localmente.
- **Partialize Inteligente**:
  - Apenas o mapa `users` é serializado e armazenado no banco local (`partialize`), mantendo o payload limpo e seguro sem guardar estados transitórios da aplicação.

---

## 🛠️ API do Store

```ts
import Users from 'models/Users'

// Acessando o estado
const { users, add, remove, update, clear } = Users.$.UserState()

// Adicionar usuário
add(username, user)

// Remover usuário
remove(username)

// Limpar todo o cache
clear()
```
