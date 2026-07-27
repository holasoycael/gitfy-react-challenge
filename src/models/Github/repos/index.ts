// utils
import api from 'utils/api'

// types and interfaces
import type { IGitHubRepo, TGitHubRepos } from './types'

export default new (class {
  async fetchByUsername(username: string): Promise<TGitHubRepos> {
    const fetchUrl = `users/${username}/repos?per_page=100&sort=updated`
    const response = await api.get<TGitHubRepos>(fetchUrl)
    return response.data
  }

  async fetchByName(owner: string, repo: string): Promise<IGitHubRepo> {
    const fetchUrl = `repos/${owner}/${repo}`
    const response = await api.get<IGitHubRepo>(fetchUrl)
    return response.data
  }
})()
