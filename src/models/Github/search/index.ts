// utils
import api from 'utils/api'

// types and interfaces
import type { TGitHubSearchResponse, IGitHubUser } from './types'

export default new (class {
  async fetchByQuery(query: string, perPage = 5): Promise<IGitHubUser[]> {
    const q = encodeURIComponent(query)
    const fetchUrl = `search/users?q=${q}&per_page=${perPage}`
    const response = await api.get<TGitHubSearchResponse>(fetchUrl)
    return response.data.items
  }
})()
