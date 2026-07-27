export interface IGitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage?: string | null
  stargazers_count: number
  watchers_count?: number
  subscribers_count?: number
  forks_count?: number
  open_issues_count?: number
  language: string | null
  updated_at: string
  fork: boolean
  license?: {
    key: string
    name: string
    spdx_id: string
    url: string | null
  } | null
  owner: {
    login: string
    avatar_url?: string
    html_url?: string
  }
  topics?: string[]
}

export type TGitHubRepos = IGitHubRepo[]
