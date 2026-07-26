import { currency } from 'make-currency'
import { z } from 'zod'

// models
import Utils from 'models/Utils'

// types and interfaces
import type { TFormProduct } from './types'

export default new (class {
  // PRICE → Preço
  // PORCENT → Porcetagem
  DiscountType = z.enum(['PRICE', 'PORCENT'])

  RecordDiscount = z.object({
    [this.DiscountType.Enum.PRICE]: z.string(),
    [this.DiscountType.Enum.PORCENT]: z.string()
  })

  ProductStatus = z.enum([
    'APROVED',
    'RECEIVED',
    'ARCHIVED',
    'IN_THE_TRASH',
    'ANALYZING',
    'SOLD',
    'PENDING',
    'PAID',
    'RETURNED',
    'CANCELLED'
  ])
  AssetsType = z.enum(['THUMB_FRONT', 'THUMB_BACK', 'OTHER'])
  FormFiles = z.enum(['FRONT', 'BACK'])

  // COIN → Moeda
  // BANKNOTE → Nota
  // MEDAL → Medalha
  // TOKEN → Token
  // OTHER → Outros
  ProductType = z.enum(['COIN', 'BANKNOTE', 'MEDAL', 'TOKEN', 'OTHER'])

  ProductRecord = z.object({
    [this.ProductType.Enum.COIN]: z.string(),
    [this.ProductType.Enum.BANKNOTE]: z.string(),
    [this.ProductType.Enum.MEDAL]: z.string(),
    [this.ProductType.Enum.TOKEN]: z.string(),
    [this.ProductType.Enum.OTHER]: z.string()
  })

  // NONE → Não Certificada
  // NGC → NGC
  // PCGS → PCGS
  // ICG → ICG
  // ANACS → ANACS
  CertificationType = z.enum(['NONE', 'NGC', 'PCGS', 'ICG', 'ANACS'])

  RecordCertification = z.object({
    [this.CertificationType.Enum.NONE]: z.string(),
    [this.CertificationType.Enum.NGC]: z.string(),
    [this.CertificationType.Enum.PCGS]: z.string(),
    [this.CertificationType.Enum.ICG]: z.string(),
    [this.CertificationType.Enum.ANACS]: z.string()
  })

  // GOLD → Ouro
  // SILVER → Prata
  // BRONZE → Bronze
  // COPPER → Cobre
  // CUPRO_NICKEL → Cupro-Níquel
  // PAPER → Papel
  MaterialType = z.enum(['GOLD', 'SILVER', 'BRONZE', 'COPPER', 'CUPRO_NICKEL', 'PAPER'])

  RecordMaterial = z.object({
    [this.MaterialType.Enum.GOLD]: z.string(),
    [this.MaterialType.Enum.SILVER]: z.string(),
    [this.MaterialType.Enum.BRONZE]: z.string(),
    [this.MaterialType.Enum.COPPER]: z.string(),
    [this.MaterialType.Enum.CUPRO_NICKEL]: z.string(),
    [this.MaterialType.Enum.PAPER]: z.string()
  })

  // COMMON → Comum
  // SCARCE → Escassa
  // RARE → Rara
  // VERY_RARE → Muito Rara
  // EXTREMELY_RARE → Raríssima
  RarityType = z.enum(['COMMON', 'SCARCE', 'RARE', 'VERY_RARE', 'EXTREMELY_RARE'])

  RecordRarity = z.object({
    [this.RarityType.Enum.COMMON]: z.string(),
    [this.RarityType.Enum.SCARCE]: z.string(),
    [this.RarityType.Enum.RARE]: z.string(),
    [this.RarityType.Enum.VERY_RARE]: z.string(),
    [this.RarityType.Enum.EXTREMELY_RARE]: z.string()
  })

  // UNC → Uncirculated
  // AU → About Uncirculated
  // EF → Extremely Fine
  // VF → Very Fine
  // F → Fine
  // VG → Very Good
  // G → Good
  // P → Poor
  ClassType = z.enum(['UNC', 'AU', 'EF', 'VF', 'F', 'VG', 'G', 'P'])

  RecordClass = z.object({
    [this.ClassType.Enum.UNC]: z.string(),
    [this.ClassType.Enum.AU]: z.string(),
    [this.ClassType.Enum.EF]: z.string(),
    [this.ClassType.Enum.VF]: z.string(),
    [this.ClassType.Enum.F]: z.string(),
    [this.ClassType.Enum.VG]: z.string(),
    [this.ClassType.Enum.G]: z.string(),
    [this.ClassType.Enum.P]: z.string()
  })

  PictureContentType = z.enum(['image/jpg', 'image/jpeg', 'image/png', 'image/webp'])

  Country = z.string()

  VariationType = z.enum(['thumb', 'small', 'medium', 'large', 'master'])

  OriginalPicture = z.object({
    src: z.string().optional(),
    fileName: z.string(),
    contentType: z.string(),
    width: z.number(),
    height: z.number(),
    size: z.number()
  })

  Picture = z.object({
    id: z.string(),
    name: z.string(),
    assetType: this.AssetsType,
    original: this.OriginalPicture,
    thumb: this.OriginalPicture, // (150x150)
    master: this.OriginalPicture, // (2000x2000)
    small: this.OriginalPicture, // (300x300)
    medium: this.OriginalPicture, // (600x600)
    large: this.OriginalPicture, // (1200x1200)
    timestamp: z.string()
  })

  Images = z.array(this.Picture)

  Product = z.object({
    title: z.string(),
    price: z.number(),
    discountType: this.DiscountType.nullish(),
    discountValue: z.number().nullish(),
    status: this.ProductStatus,
    stock: z.number(),
    images: this.Images,
    dataType: this.ProductType, // Tipo ou classificação do produto
    ownerId: z.string().nullish(), // Id. do usuario vinculado
    productYear: z.string().nullish(),
    description: z.string(),
    classType: this.ClassType,
    country: z.string().optional(),
    denomination: z.string().optional(),
    materialType: this.MaterialType,
    rarityType: this.RarityType,
    certificationType: this.CertificationType,
    receivedAt: z.string().optional(), // Data de recebimento do item
    approvedAt: z.string().optional(), // Data de aprovação
    listedAt: z.string().optional(), // Data de listagem no catálogo
    soldAt: z.string().optional(), // Data da venda
    paidAt: z.string().optional(), // Data do pagamento ao proprietário
    returnedAt: z.string().optional() // Data de devolução
  })

  Validations = {
    title: z.string().min(1, 'O campo é obrigatório'),
    grade: z.string().min(1, 'O campo é obrigatório'),
    country: z.string().min(1, 'O campo é obrigatório'),
    productYear: z
      .string()
      .regex(/^\d{4}$/, 'Informe um ano válido')
      .refine(
        (value) => {
          const year = Number(value)
          const currentYear = new Date().getFullYear()

          return year >= 1900 && year <= currentYear + 1
        },
        {
          message: 'Ano inválido'
        }
      ),
    denomination: z.string().min(1, 'O campo é obrigatório'),
    materialType: z.string().min(1, 'O campo é obrigatório'),
    classType: z.string().min(1, 'O campo é obrigatório'),
    certificationType: z.string().min(1, 'O campo é obrigatório'),
    description: z.string().min(1, 'O campo é obrigatório'),
    stock: z.string().min(1, 'O campo é obrigatório'),
    price: z.string().min(1, 'O preço deve ser maior que zero'),
    discountType: z.string().min(1, 'O campo é obrigatório'),
    rarityType: z.string().min(1, 'O campo é obrigatório'),
    dataType: z.string().min(1, 'O campo é obrigatório')
  }

  preventValues(current: Partial<TFormProduct>): Record<keyof typeof this.Validations, string> {
    const __stock = current.stock ?? 0
    const stock = isNaN(__stock) ? NaN : __stock < 0 ? NaN : __stock

    return {
      title: current.title ?? '',
      grade: current.classType ?? '',
      country: current.country ?? '',
      productYear: current.productYear ?? '',
      denomination: current.denomination ?? '',
      materialType: current.materialType ?? '',
      classType: current.classType ?? '',
      certificationType: current.certificationType ?? '',
      description: current.description ?? '',
      stock: stock >= 1 ? String(stock) : '',
      price: currency(current.price ?? 0, 'INPUT'),
      discountType: current.discountType?.toString() ?? '',
      rarityType: current.rarityType?.toString() ?? '',
      dataType: current.dataType?.toString() ?? ''
    }
  }

  errorFn(current: Partial<Record<keyof typeof this.Validations, string>>) {
    return {
      title:
        typeof current.title === 'string'
          ? Utils.schemaParse(this.Validations.title.safeParse(current.title))
          : undefined,
      grade:
        typeof current.grade === 'string'
          ? Utils.schemaParse<string>(this.Validations.grade.safeParse(current.grade))
          : undefined,
      country:
        typeof current.country === 'string'
          ? Utils.schemaParse<string>(this.Validations.country.safeParse(current.country))
          : undefined,
      productYear:
        typeof current.productYear === 'string'
          ? Utils.schemaParse<string>(this.Validations.productYear.safeParse(current.productYear))
          : undefined,
      denomination:
        typeof current.denomination === 'string'
          ? Utils.schemaParse<string>(this.Validations.denomination.safeParse(current.denomination))
          : undefined,
      materialType:
        typeof current.materialType === 'string'
          ? Utils.schemaParse<string>(this.Validations.materialType.safeParse(current.materialType))
          : undefined,
      classType:
        typeof current.classType === 'string'
          ? Utils.schemaParse<string>(this.Validations.classType.safeParse(current.classType))
          : undefined,
      certificationType:
        typeof current.certificationType === 'string'
          ? Utils.schemaParse<string>(this.Validations.certificationType.safeParse(current.certificationType))
          : undefined,
      description:
        typeof current.description === 'string'
          ? Utils.schemaParse<string>(this.Validations.description.safeParse(current.description))
          : undefined,
      stock:
        typeof current.stock === 'string'
          ? Utils.schemaParse<string>(this.Validations.stock.safeParse(current.stock))
          : undefined,
      price:
        typeof current.price === 'string'
          ? Utils.schemaParse<string>(this.Validations.price.safeParse(current.price))
          : undefined,
      discountType:
        typeof current.discountType === 'string'
          ? Utils.schemaParse<string>(this.Validations.discountType.safeParse(current.discountType))
          : undefined,
      rarityType:
        typeof current.rarityType === 'string'
          ? Utils.schemaParse<string>(this.Validations.rarityType.safeParse(current.rarityType))
          : undefined,
      dataType:
        typeof current.dataType === 'string'
          ? Utils.schemaParse<string>(this.Validations.dataType.safeParse(current.dataType))
          : undefined
    }
  }
})()
