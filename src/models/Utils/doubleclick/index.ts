// models
import Utils from 'models/Utils'

export default class DoubleClick {
  id: string

  counter: number = 0
  fn: NodeJS.Timeout | null = null

  handle(doubleclick: React.RefObject<InstanceType<typeof Utils.doubleclick>>, fn: () => void) {
    doubleclick.current.counter += 1

    doubleclick.current.fn = setTimeout(() => {
      doubleclick.current.counter = 0

      if (doubleclick.current.fn) {
        clearTimeout(doubleclick.current.fn)
        doubleclick.current.fn = null
      }
    }, 350)

    if (doubleclick.current.counter === 2) {
      fn()
    }
  }

  constructor() {
    this.id = Utils.randomId(13)
  }
}
