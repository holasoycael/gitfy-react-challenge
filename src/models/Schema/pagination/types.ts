import { z } from 'zod'

// models
import Schema from 'models/Schema'

export type TPagination = z.infer<typeof Schema.pagination.Pagination>
