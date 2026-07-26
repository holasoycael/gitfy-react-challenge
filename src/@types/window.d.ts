declare global {
  interface Window {
    clipboardData: ClipboardData
  }
}

// clipboardData do IE
export interface ClipboardData {
  setData: (val: string, txt: string) => void
}
