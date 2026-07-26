import { z } from 'zod'

// mdoels
import Schema from 'models/Schema'

export type TField = z.infer<typeof Schema.form.Field>
export type TFieldList = z.infer<typeof Schema.form.FieldList>
