// utils
import api from 'utils/api'

// types and interfaces
import type { IGitHubRepo, TGitHubRepos } from './types'

export default new (class {
  async fetchByUsername(username: string): Promise<TGitHubRepos> {
    const response = await api.get<TGitHubRepos>(`users/${username}/repos?per_page=100&sort=updated`)
    return response.data
  }

  async fetchByName(owner: string, repo: string): Promise<IGitHubRepo> {
    const response = await api.get<IGitHubRepo>(`repos/${owner}/${repo}`)
    return response.data
  }
})()
