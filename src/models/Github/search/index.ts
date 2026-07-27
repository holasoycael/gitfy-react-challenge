import axios from 'axios'

// types and interfaces
import type { TGitHubSearchResponse, IGitHubUser } from './types'

export default new (class {
  baseUrl = 'https://api.github.com'

  async fetchByQuery(query: string, perPage = 5): Promise<IGitHubUser[]> {
    if (!query.trim()) return []

    const fetchUrl = `${this.baseUrl}/search/users?q=${encodeURIComponent(query)}&per_page=${perPage}`
    const response = await axios.get<TGitHubSearchResponse>(fetchUrl)
    return response.data.items
  }
})()
