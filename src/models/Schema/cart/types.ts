import { z } from 'zod'

// mdoels
import Schema from 'models/Schema'

export type TItem = z.infer<typeof Schema.cart.Item>
export type TItems = z.infer<typeof Schema.cart.Items>
