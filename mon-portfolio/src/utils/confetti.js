// src/utils/confetti.js
export function confettiBurst(x, y) {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.style.position = 'fixed'
    canvas.style.inset = '0'
    canvas.style.pointerEvents = 'none'
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    document.body.appendChild(canvas)
  
    const colors = ['#00ffff', '#e91e63', '#7C4DFF', '#ffffff']
    const particles = Array.from({ length: 120 }).map(() => ({
      x, y,
      vx: (Math.random() - 0.5) * 8,
      vy: (Math.random() - 0.8) * 10 - 4,
      size: Math.random() * 4 + 2,
      color: colors[(Math.random() * colors.length) | 0],
      life: 60 + (Math.random() * 20 | 0),
    }))
  
    function tick() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.vy += 0.25
        p.x += p.vx
        p.y += p.vy
        p.life -= 1
        ctx.globalAlpha = Math.max(p.life / 80, 0)
        ctx.fillStyle = p.color
        ctx.fillRect(p.x, p.y, p.size, p.size)
      })
      if (particles.some(p => p.life > 0)) {
        requestAnimationFrame(tick)
      } else {
        document.body.removeChild(canvas)
      }
    }
    tick()
  }
  