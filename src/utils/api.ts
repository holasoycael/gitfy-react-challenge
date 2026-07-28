import axios from 'axios'

// utils
import env from 'utils/env'

export const runtime = 'nodejs'

export default axios.create({
  baseURL: env.GITHUB_API,
  headers: {
    ...(env.GITHUB_TOKEN ? { Authorization: `Bearer ${env.GITHUB_TOKEN}` } : {})
  }
})
