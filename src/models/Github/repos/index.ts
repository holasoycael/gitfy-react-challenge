// childrens
import language from './language'

// utils
import api from 'utils/api'

// types and interfaces
import type { IGitHubRepo, TGitHubRepos } from './types'

export default new (class {
  language = language

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

  async fetchReadme(owner: string, repo: string): Promise<string | null> {
    try {
      const fetchUrl = `repos/${owner}/${repo}/readme`
      const response = await api.get<{ content: string; encoding: string }>(fetchUrl)
      if (response.data?.content && response.data?.encoding === 'base64') {
        const cleanContent = response.data.content.replace(/\n/g, '')
        const binString = atob(cleanContent)
        const bytes = Uint8Array.from(binString, (m) => m.codePointAt(0) || 0)
        return new TextDecoder().decode(bytes)
      }
      return null
    } catch {
      return null
    }
  }
})()
