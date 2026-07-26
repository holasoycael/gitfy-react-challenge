// childrens
import validators from './validators'
import doubleclick from './doubleclick'

// utils
import env from 'utils/env'

// types and interfaces
import { TDigits } from './types'

class Utils {
  validators = validators
  doubleclick = doubleclick

  sectionOffsetTop(section: string) {
    return document.querySelector<HTMLDivElement>(`[data-section="${section}"]`)?.offsetTop ?? 0
  }

  schemaParse<T>(schema: z.SafeParseReturnType<T, T>) {
    if (schema.success) return undefined
    return schema.error.errors[0]?.message
  }

  clipboard(text: string, callback: () => void) {
    if (window.clipboardData && window.clipboardData.setData) {
      callback()
      // IE specific code path to prevent textarea being shown while dialog is visible.
      return window.clipboardData.setData('Text', text)
    } else if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
      const textarea = document.createElement('textarea')
      textarea.textContent = text
      textarea.style.position = 'fixed' // Prevent scrolling to bottom of page in MS Edge.
      document.body.appendChild(textarea)
      textarea.select()
      try {
        return document.execCommand('copy') // Security exception may be thrown by some browsers.
      } catch (ex) {
        console.warn('Copy to clipboard failed.', ex)
        return false
      } finally {
        callback()
        document.body.removeChild(textarea)
      }
    }
  }

  between(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  randomId(digit: TDigits, excludeIds: string[] = []) {
    const r = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    let id = ''

    const generateId = () => {
      let newId = ''
      for (let i = 0; i < digit; i++) {
        const randomIndex = this.between(0, r.length - 1)
        newId += r[randomIndex]
      }
      return newId
    }

    // Tentamos encontrar um ID que não esteja na lista de excluídos
    do {
      id = generateId()
    } while (excludeIds.includes(id))

    return id
  }

  randomNumber(digit: TDigits, excludeIds: string[] = []) {
    const r = '0123456789'
    let id = ''

    const generateId = () => {
      let newId = ''
      for (let i = 0; i < digit; i++) {
        const randomIndex = this.between(0, r.length - 1)
        newId += r[randomIndex]
      }
      return newId
    }

    // Tentamos encontrar um ID que não esteja na lista de excluídos
    do {
      id = generateId()
    } while (excludeIds.includes(id))

    return id
  }

  getBorderColor(baseColor: string) {
    const color = chroma(baseColor)

    // Se a cor for clara → escurece
    if (color.luminance() > 0.6) {
      return color.darken(2).saturate(0.5).hex()
    }

    // Se a cor for escura → clareia
    return color.brighten(2).saturate(0.5).hex()
  }

  fileSize(value: number) {
    return value < 1000000 ? Math.floor(value / 1000) + ' KB' : Math.floor(value / 1000000) + ' MB'
  }

  formatWeight(size: number, unit: 'B' | 'KB' | 'MB' | 'GB') {
    const multipliers = {
      B: 1,
      KB: 1024,
      MB: 1024 * 1024,
      GB: 1024 * 1024 * 1024
    }
    const value = size / multipliers[unit]
    return `${parseFloat(value.toFixed(2))} ${unit}`
  }

  isValidYear(year: string) {
    const currentYear = new Date().getFullYear()

    if (!/^\d{4}$/.test(year)) return false

    const numericYear = Number(year)

    return numericYear >= 1900 && numericYear <= currentYear + 1
  }

  formatNumber(current: number, total: number) {
    const length = String(total).length
    return String(current).padStart(length, '0')
  }

  async fileToBase64(file: Blob | File): Promise<string> {
    if (typeof window !== 'undefined') {
      // ✅ Se estiver no navegador, usa FileReader
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = (error) => reject(error)
      })
    } else {
      // ✅ No backend (Node.js), converte Blob para Buffer e Base64
      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      return `data:${file.type};base64,${buffer.toString('base64')}`
    }
  }

  base64ToFile(base64: string, filename: string, type: string): File {
    const [metadata, data] = base64.split(',')
    const mime = metadata.match(/:(.*?);/)?.[1] || type
    const binary = atob(data)
    const array = new Uint8Array(binary.length)

    for (let i = 0; i < binary.length; i++) {
      array[i] = binary.charCodeAt(i)
    }

    return new File([array], filename, { type: mime })
  }

  async drawBase64OnCanvas(blob: Blob, w: number, h: number, contentType: string) {
    const canvas = document.createElement('canvas')

    canvas.width = w
    canvas.height = h

    const bitmap = await createImageBitmap(blob)

    const ctx = canvas.getContext('2d')

    // Calcular dimensões para cover (preencher todo o espaço)
    const aspectRatio = bitmap.width / bitmap.height
    const canvasAspectRatio = w / h

    let drawWidth, drawHeight, offsetX, offsetY

    if (aspectRatio > canvasAspectRatio) {
      // Imagem é mais larga que o canvas - ajustar pela altura
      drawHeight = h
      drawWidth = h * aspectRatio
      offsetX = (w - drawWidth) / 2
      offsetY = 0
    } else {
      // Imagem é mais alta que o canvas - ajustar pela largura
      drawWidth = w
      drawHeight = w / aspectRatio
      offsetX = 0
      offsetY = (h - drawHeight) / 2
    }

    // Desenhar imagem com crop centralizado (cover behavior)
    ctx?.drawImage(bitmap, offsetX, offsetY, drawWidth, drawHeight)

    return canvas.toDataURL(contentType, 0.75)
  }

  // %2F
  // http://127.0.0.1:9199/v0/b/summary-development.appspot.com/o/branch%2Fproducts%2F88I0pSnIxF8la8VYtP0X%2F1585280_1_1753799910.jpg?alt=media&token=f4aab63f-82e0-4de8-a347-f56fb907ebc6
  // https://firebasestorage.googleapis.com/v0/b/summary-development.appspot.com/o/arquivo.png?alt=media&token=c1cce619-4674-4e05-990a-97730f0e1063
  parseUrl(id: string, fileName: string) {
    const baseUrl = env.BUCKET_DOMAIN
    const storageBucket = env.STORAGE_BUCKET
    const path = encodeURIComponent(`branch/products/${id}/${fileName}`)
    return `${baseUrl}/v0/b/${storageBucket}/o/${path}?alt=media`
  }
}

export default new Utils()
