// types and interfaces
import type { IGitHubRepo } from 'models/Github/repos/types'

const mockRepos: IGitHubRepo[] = [
  {
    id: 1,
    name: 'gitfy-react-challenge',
    full_name: 'holasoycael/gitfy-react-challenge',
    description: 'Desafio React para buscar e visualizar perfis e repositórios do GitHub',
    html_url: 'https://github.com/holasoycael/gitfy-react-challenge',
    stargazers_count: 142,
    language: 'TypeScript',
    updated_at: '2026-07-26T18:00:00Z',
    fork: false,
    owner: {
      login: 'holasoycael'
    }
  },
  {
    id: 2,
    name: 'make-currency',
    full_name: 'holasoycael/make-currency',
    description: 'Biblioteca para manipular valores de preços em JavaScript moderno',
    html_url: 'https://github.com/holasoycael/make-currency',
    stargazers_count: 98,
    language: 'JavaScript',
    updated_at: '2026-06-15T12:30:00Z',
    fork: false,
    owner: {
      login: 'holasoycael'
    }
  },
  {
    id: 3,
    name: 'gltf-react-three',
    full_name: 'holasoycael/gltf-react-three',
    description: 'Convert GLTF files to React Three Fiber Components',
    html_url: 'https://github.com/holasoycael/gltf-react-three',
    stargazers_count: 15,
    language: 'TypeScript',
    updated_at: '2026-05-24T10:00:00Z',
    fork: true,
    owner: {
      login: 'holasoycael'
    }
  }
]

export default mockRepos
