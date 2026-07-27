import axios from 'axios'

// utils
import env from 'utils/env'

export const runtime = 'nodejs'

export default axios.create({
  baseURL: env.GITHUB_API
})
