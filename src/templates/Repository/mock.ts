// types and interfaces
import type { IGitHubRepo } from 'models/Github/repos/types'
import type { TRepositoryDetailData } from './types'

export const mockRepo: IGitHubRepo = {
  id: 123456,
  name: 'gitfy-react-challenge',
  full_name: 'holasoycael/gitfy-react-challenge',
  description: 'Um desafio incrível em React e TypeScript para buscas no GitHub.',
  html_url: 'https://github.com/holasoycael/gitfy-react-challenge',
  stargazers_count: 42,
  language: 'TypeScript',
  updated_at: '2026-07-27T12:00:00Z',
  fork: false,
  owner: {
    login: 'holasoycael'
  }
}

export const mockRepositoryData: TRepositoryDetailData = {
  repo: mockRepo,
  readme: '# Gitfy React Challenge\n\nBem-vindo ao repositório de teste!'
}

export default mockRepositoryData
