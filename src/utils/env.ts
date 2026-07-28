import { z } from 'zod'

const schema = z.object({
  GITHUB_API: z.string(),
  GITHUB_TOKEN: z.string().optional()
})

export default schema.parse({
  GITHUB_API: import.meta.env.VITE_GITHUB_API,
  GITHUB_TOKEN: import.meta.env.VITE_GITHUB_TOKEN
})
