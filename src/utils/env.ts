import { z } from 'zod'

const schema = z.object({
  GITHUB_API: z.string()
})

export default schema.parse({
  GITHUB_API: import.meta.env.VITE_GITHUB_API
})
