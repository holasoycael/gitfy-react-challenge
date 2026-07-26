import { z } from 'zod'

export default new (class {
  DataType = z.enum(['LOCAL', 'CLOUD'])
  SizeUnit = z.enum(['B', 'KB', 'MB', 'GB'])
  SizeLimit = z.tuple([this.SizeUnit, z.number()])
  AcceptType = z.enum(['JPG', 'JPEG', 'PDF', 'PNG', 'WEBP'])
  FormatType = z.enum(['.jpg', '.jpeg', '.pdf', '.png', '.webp'])
  ContentType = z.enum([
    'image/jpg',
    'image/jpeg',
    'application/pdf',
    'image/png',
    'image/webp',
    'application/octet-stream'
  ])

  ContentTypeAccept = z.enum([
    this.ContentType.Enum['image/jpg'],
    this.ContentType.Enum['image/jpeg'],
    this.ContentType.Enum['application/pdf'],
    this.ContentType.Enum['image/png'],
    this.ContentType.Enum['image/webp']
  ])

  DataTypeItem = z.object({
    dataType: z.string(),
    formatType: z.string()
  })

  DataTypes = z.object({
    KEY: z.object({
      [this.AcceptType.Enum.JPG]: z.object({
        mimeType: z.literal(this.ContentType.Enum['image/jpg']),
        extension: z.literal(this.FormatType.Enum['.jpg'])
      }),
      [this.AcceptType.Enum.JPEG]: z.object({
        mimeType: z.literal(this.ContentType.Enum['image/jpeg']),
        extension: z.literal(this.FormatType.Enum['.jpeg'])
      }),
      [this.AcceptType.Enum.PDF]: z.object({
        mimeType: z.literal(this.ContentType.Enum['application/pdf']),
        extension: z.literal(this.FormatType.Enum['.pdf'])
      }),
      [this.AcceptType.Enum.PNG]: z.object({
        mimeType: z.literal(this.ContentType.Enum['image/png']),
        extension: z.literal(this.FormatType.Enum['.png'])
      }),
      [this.AcceptType.Enum.WEBP]: z.object({
        mimeType: z.literal(this.ContentType.Enum['image/webp']),
        extension: z.literal(this.FormatType.Enum['.webp'])
      })
    }),
    MIME_TYPE: z.object({
      [this.ContentType.Enum['image/jpg']]: z.object({
        key: z.literal(this.AcceptType.Enum.JPG),
        extension: z.literal(this.FormatType.Enum['.jpg'])
      }),
      [this.ContentType.Enum['image/jpeg']]: z.object({
        key: z.literal(this.AcceptType.Enum.JPEG),
        extension: z.literal(this.FormatType.Enum['.jpeg'])
      }),
      [this.ContentType.Enum['application/pdf']]: z.object({
        key: z.literal(this.AcceptType.Enum.PDF),
        extension: z.literal(this.FormatType.Enum['.pdf'])
      }),
      [this.ContentType.Enum['image/png']]: z.object({
        key: z.literal(this.AcceptType.Enum.PNG),
        extension: z.literal(this.FormatType.Enum['.png'])
      }),
      [this.ContentType.Enum['image/webp']]: z.object({
        key: z.literal(this.AcceptType.Enum.WEBP),
        extension: z.literal(this.FormatType.Enum['.webp'])
      })
    }),
    EXTENSION: z.object({
      [this.FormatType.Enum['.jpg']]: z.object({
        key: z.literal(this.AcceptType.Enum.JPG),
        mimeType: z.literal(this.ContentType.Enum['image/jpg'])
      }),
      [this.FormatType.Enum['.jpeg']]: z.object({
        key: z.literal(this.AcceptType.Enum.JPEG),
        mimeType: z.literal(this.ContentType.Enum['image/jpeg'])
      }),
      [this.FormatType.Enum['.pdf']]: z.object({
        key: z.literal(this.AcceptType.Enum.PDF),
        mimeType: z.literal(this.ContentType.Enum['application/pdf'])
      }),
      [this.FormatType.Enum['.png']]: z.object({
        key: z.literal(this.AcceptType.Enum.PNG),
        mimeType: z.literal(this.ContentType.Enum['image/png'])
      }),
      [this.FormatType.Enum['.webp']]: z.object({
        key: z.literal(this.AcceptType.Enum.WEBP),
        mimeType: z.literal(this.ContentType.Enum['image/webp'])
      })
    })
  })

  BaseFile = z.object({
    id: z.string(),
    name: z.string(),
    contentType: this.ContentType,
    nonce: z.string().optional(),
    size: z.number()
  })

  FileCloud = this.BaseFile.extend({
    url: z.string(),
    dataType: z.literal(this.DataType.Enum.CLOUD)
  })

  FileLocal = this.BaseFile.extend({
    dataType: z.literal(this.DataType.Enum.LOCAL),
    file: z.custom<File>(),
    __: z.custom<object>()
  })

  Asset = z.discriminatedUnion('dataType', [this.FileCloud, this.FileLocal])

  Media = z.object({
    dataType: this.DataType,
    nonce: z.string().optional(),
    contentType: this.ContentType,
    id: z.string(),
    name: z.string(),
    src: z.string(),
    size: z.number()
  })
})()
