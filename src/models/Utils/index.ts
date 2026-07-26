// childrens
import doubleclick from './doubleclick'

// types and interfaces
import { TDigits } from './types'

class Utils {
  doubleclick = doubleclick

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

  randomNumber(digit: TDigits, excludeNumbers: string[] = []) {
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
    } while (excludeNumbers.includes(id))

    return id
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
}

export default new Utils()
