// data
import { LANGUAGE_COLORS } from './data'

export default new (class {
  getColor(language?: string | null): string {
    if (!language) return '#8b8b8b'
    return LANGUAGE_COLORS[language] || '#8b8b8b'
  }
})()
