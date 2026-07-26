import { z } from 'zod'

export default new (class {
  Item = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string().optional(),
    picture_url: z.string().optional(),
    category_id: z.string().optional(),
    quantity: z.number(),
    currency_id: z.string().optional(),
    unit_price: z.number(),
    warranty: z.boolean().optional(),
    category_descriptor: z.custom<object>().optional(),
    event_date: z.string().optional()
  })

  Items = z.array(this.Item)
})()
