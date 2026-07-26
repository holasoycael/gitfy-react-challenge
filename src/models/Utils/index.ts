import chroma from 'chroma-js'

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

  /**
   * Ex.:
    {
      "50": "#dcfffb",
      "100": "#baffdc",
      "200": "#99ffbd",
      "300": "#77ff9f",
      "400": "#53f282",
      "500": "#25d366",
      "600": "#00b44a",
      "700": "#00962f",
      "800": "#007911",
      "900": "#005d00",
      "main": "#25d366",
      "light": "#77ff9f",
      "dark": "#00962f",
      "contrastText": "rgba(0, 0, 0, 0.87)",
      "A100": "#82ff95",
      "A200": "#64ff75",
      "A400": "#00d12a",
      "A700": "#00be00"
    }
   * 
  */
  palette(baseHex: string) {
    const base = chroma(baseHex)

    const palette = {
      50: base.brighten(3).hex(),
      100: base.brighten(2.4).hex(),
      200: base.brighten(1.8).hex(),
      300: base.brighten(1.2).hex(),
      400: base.brighten(0.6).hex(),
      500: base.hex(),
      600: base.darken(0.6).hex(),
      700: base.darken(1.2).hex(),
      800: base.darken(1.8).hex(),
      900: base.darken(2.4).hex(),

      A100: base.saturate(1.2).brighten(1.5).hex(),
      A200: base.saturate(1.5).brighten(1).hex(),
      A400: base.saturate(2).darken(0.2).hex(),
      A700: base.saturate(2.5).darken(0.6).hex()
    }

    return {
      main: palette[500],
      light: palette[300],
      dark: palette[700],
      contrastText: chroma.contrast(palette[500], '#000') > 4.5 ? 'rgba(0, 0, 0, 0.87)' : '#fff',
      ...palette
    }
  }
}

export default new Utils()
