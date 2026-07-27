export interface IGitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  stargazers_count: number
  language: string | null
  updated_at: string
  fork: boolean
  owner: {
    login: string
  }
}

export type TGitHubRepos = IGitHubRepo[]
