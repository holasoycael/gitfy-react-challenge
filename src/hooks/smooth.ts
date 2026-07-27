// Caso deseje suporte a browsers antigos / que não suportam scroll smooth nativo
/**
 * Smooth scroll animation
 * @param {int} endX: destination x coordinate
 * @param {int) endY: destination y coordinate
 * @param {int} duration: animation duration in ms
 * @param {element} current: element with scroll
 */

function smoothScrollTo(endX: number, endY: number, duration: number, current?: HTMLDivElement | null) {
  const startX = current ? current.scrollLeft : window.scrollX || window.pageXOffset
  const startY = current ? current.scrollTop : window.scrollY || window.pageYOffset
  const distanceX = endX - startX
  const distanceY = endY - startY
  const startTime = new Date().getTime()

  duration = typeof duration !== 'undefined' ? duration : 400

  // Easing function
  const easeInOutQuart = (time: number, from: number, distance: number, duration: number) => {
    if ((time /= duration / 2) < 1) return (distance / 2) * time * time * time * time + from
    return (-distance / 2) * ((time -= 2) * time * time * time - 2) + from
  }

  const timer = setInterval(() => {
    const time = new Date().getTime() - startTime
    const newX = easeInOutQuart(time, startX, distanceX, duration)
    const newY = easeInOutQuart(time, startY, distanceY, duration)
    if (time >= duration) {
      clearInterval(timer)
    }

    if (current) {
      current.scroll(newX, newY)
    } else {
      window.scroll(newX, newY)
    }
  }, 1000 / 60) // 60 fps
}

export default smoothScrollTo
