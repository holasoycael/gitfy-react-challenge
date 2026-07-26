import { z } from 'zod'

export default new (class {
  Pagination = z.object({
    total: z.number(),
    size: z.number(),
    pages: z.number(),
    page: z.number(),
    take: z.number(),
    skip: z.number(),
    from: z.number(),
    to: z.number(),
    isNext: z.boolean(),
    isPrev: z.boolean(),
    isEmpty: z.boolean()
  })
})()
