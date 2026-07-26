import { z } from 'zod'

// models
import Schema from 'models/Schema'

export type TFormProduct = z.infer<typeof Schema.product.Product>
export type TFormFiles = z.infer<typeof Schema.product.FormFiles>
export type TVariationType = z.infer<typeof Schema.product.VariationType>
