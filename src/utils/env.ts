import { z } from 'zod'

const schema = z.object({
  API_KEY: z.string(),
  AUTH_DOMAIN: z.string(),
  DATABASE_URL: z.string(),
  PROJECT_ID: z.string(),
  STORAGE_BUCKET: z.string(),
  MESSAGING_SENDER_ID: z.string(),
  APP_ID: z.string(),
  SERVER_URL: z.string(),
  SERVER_URL_LP: z.string(),
  BUCKET_DOMAIN: z.string(),
  LOCAL_URL: z.string().url(),
  LOCAL_API: z.string().url(),
  GOOGLE_ID: z.string(),
  TYPESENSE_AVAILABLE: z.enum(['true', 'false']).optional().default('true'),
  MP_PUBLIC_KEY: z.string()
})

export default schema.parse({
  API_KEY: process.env.NEXT_PUBLIC_API_KEY,
  AUTH_DOMAIN: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  DATABASE_URL: process.env.NEXT_PUBLIC_DATABASE_URL,
  PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID,
  STORAGE_BUCKET: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  APP_ID: process.env.NEXT_PUBLIC_APP_ID,
  SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
  SERVER_URL_LP: process.env.NEXT_PUBLIC_SERVER_URL_LP,
  BUCKET_DOMAIN: process.env.NEXT_PUBLIC_BUCKET_DOMAIN,
  LOCAL_URL: process.env.NEXT_PUBLIC_LOCAL_URL,
  LOCAL_API: process.env.NEXT_PUBLIC_LOCAL_API,
  GOOGLE_ID: process.env.NEXT_PUBLIC_GOOGLE_ID,
  TYPESENSE_AVAILABLE: process.env.NEXT_PUBLIC_TYPESENSE_AVAILABLE,
  MP_PUBLIC_KEY: process.env.NEXT_PUBLIC_MP_PUBLIC_KEY
})
