import '@fontsource/instrument-serif/400.css'
import '@fontsource/instrument-serif/400-italic.css'
import '@fontsource-variable/inter-tight'
import '@fontsource/ibm-plex-mono/400.css'
import './style.css'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger, SplitText)
// the mobile URL bar resizing the viewport shouldn't re-measure (and jump) the sticky scenes
ScrollTrigger.config({ ignoreMobileResize: true })

const $ = (s, r = document) => r.querySelector(s)
const $$ = (s, r = document) => [...r.querySelectorAll(s)]
const clamp01 = (v) => Math.min(1, Math.max(0, v))
const smooth = (a, b, v) => {
  const t = clamp01((v - a) / (b - a))
  return t * t * (3 - 2 * t)
}
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches

document.body.classList.add('is-loading')

// ——— smooth scroll ———
let lenis = null
if (!reduce) {
  lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9 })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((t) => lenis.raf(t * 1000))
  gsap.ticker.lagSmoothing(0)
  lenis.stop()
}

$$('[data-goto]').forEach((a) =>
  a.addEventListener('click', (e) => {
    e.preventDefault()
    const to = a.dataset.goto
    if (lenis) lenis.scrollTo(to === '#top' ? 0 : to, { duration: 1.8 })
    else (to === '#top' ? document.body : $(to)).scrollIntoView()
  }),
)

// ——— chrome: chapter indicator + progress ———
const chNum = $('[data-chapter-num]')
const chName = $('[data-chapter-name]')
// derived from positions (not enter/leave toggles) so jumps via links or the scrollbar stay correct
const chapters = $$('[data-chapter]')
let current = null
const syncChapter = () => {
  const line = innerHeight * 0.55
  let sec = chapters[0]
  for (const c of chapters) if (c.getBoundingClientRect().top <= line) sec = c
  if (sec === current) return
  current = sec
  chNum.textContent = sec.dataset.chapter
  chName.textContent = sec.dataset.name
}
ScrollTrigger.create({ start: 0, end: 'max', onUpdate: syncChapter, onRefresh: syncChapter })
gsap.to('.progress i', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } })

// ——— share ———
const toastEl = $('#toast')
let toastTimer
const toast = (msg) => {
  toastEl.textContent = msg
  toastEl.classList.add('is-on')
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => toastEl.classList.remove('is-on'), 2200)
}
$('#share').addEventListener('click', async () => {
  const url = location.href.split('#')[0]
  const data = { title: 'Seed to Cup — A Coffee Journal', text: 'Happy National Coffee Day. The journey of coffee, from seed to cup.', url }
  try {
    if (navigator.share) return await navigator.share(data)
    await navigator.clipboard.writeText(url)
    toast('Link copied')
  } catch (err) {
    if (err?.name !== 'AbortError') toast('Could not share')
  }
})

// ——— loader ———
async function load() {
  const count = $('#loaderCount')
  const shown = { v: 0 }
  const tick = gsap.to(shown, { v: 88, duration: 2.4, ease: 'power2.out', onUpdate: () => (count.textContent = Math.round(shown.v)) })
  const imgs = $$('.hero img')
  const ready = Promise.all([document.fonts.ready, ...imgs.map((i) => i.decode().catch(() => {}))])
  await Promise.race([ready, new Promise((r) => setTimeout(r, 7000))])
  tick.kill()
  await gsap.to(shown, { v: 100, duration: 0.45, ease: 'power1.out', onUpdate: () => (count.textContent = Math.round(shown.v)) })
}

// ——— hero ———
function heroIntro() {
  const chars = SplitText.create('.hero__word', { type: 'chars', charsClass: 'hc' }).chars
  const tl = gsap.timeline()
  tl.to('#loader', { yPercent: -100, duration: 1.2, ease: 'expo.inOut' })
    .add(() => {
      $('#loader').remove()
      document.body.classList.remove('is-loading')
      lenis?.start()
    })
    .from('.hero__sky', { scale: 1.22, duration: 2.6, ease: 'expo.out' }, 0.35)
    .from('.hero__ridge', { y: () => innerHeight * 0.16, duration: 2.4, ease: 'expo.out' }, 0.4)
    .from('.hero__branch', { x: () => innerWidth * 0.08, y: () => innerHeight * 0.22, duration: 2.4, ease: 'expo.out' }, 0.45)
    .from(chars, { yPercent: 55, opacity: 0, filter: 'blur(14px)', duration: 1.6, ease: 'expo.out', stagger: 0.05, clearProps: 'filter' }, 0.6)
    .from('.hero__meta > *', { y: 24, opacity: 0, duration: 1.2, ease: 'power3.out', stagger: 0.1 }, 1.1)
  return tl
}

function heroScroll() {
  gsap
    .timeline({ scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom bottom', scrub: true } })
    .to('.hero__meta', { opacity: 0, y: -30, ease: 'none', duration: 0.12 }, 0)
    // roughly exponential speeds, far to near
    .to('.hero__sky', { yPercent: -4, ease: 'none', duration: 1 }, 0)
    .to('.hero__title', { yPercent: -12, ease: 'none', duration: 1 }, 0)
    .to('.hero__title', { filter: 'blur(10px)', opacity: 0.55, ease: 'none', duration: 0.6 }, 0.25)
    .to('.hero__haze', { yPercent: -45, opacity: 1, ease: 'none', duration: 1 }, 0)
    .to('.hero__ridge', { yPercent: -30, ease: 'none', duration: 1 }, 0)
    .to('.hero__branch', { scale: 1.45, xPercent: 6, ease: 'none', duration: 1 }, 0)
    .to('.hero__dim', { opacity: 0.55, ease: 'none', duration: 0.6 }, 0.4)
}

// ——— generic scroll effects ———
function splitHeadings() {
  $$('[data-split]').forEach((el) =>
    SplitText.create(el, {
      type: 'lines',
      mask: 'lines',
      linesClass: 'line',
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.lines, {
          yPercent: 110,
          duration: 1.4,
          ease: 'expo.out',
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: 'top 88%' },
        }),
    }),
  )
}

function statementWords() {
  $$('[data-words]').forEach((el) => {
    const { words } = SplitText.create(el, { type: 'words', wordsClass: 'w' })
    gsap.to(words, {
      opacity: 1,
      ease: 'none',
      stagger: 0.1,
      scrollTrigger: { trigger: el, start: 'top 78%', end: 'bottom 42%', scrub: true },
    })
    // highlight bars grow under key phrases as the reading reaches them
    $$('mark', el).forEach((mark) =>
      gsap.to(mark, { backgroundSize: '100% 0.075em', ease: 'none', scrollTrigger: { trigger: mark, start: 'top 62%', end: 'top 50%', scrub: true } }),
    )
  })
}

function rises() {
  gsap.set('[data-rise]', { y: 40, opacity: 0 })
  ScrollTrigger.batch('[data-rise]', {
    start: 'top 90%',
    once: true,
    onEnter: (els) => gsap.to(els, { y: 0, opacity: 1, duration: 1.3, ease: 'expo.out', stagger: 0.1 }),
  })
}

function reveals() {
  $$('[data-reveal]').forEach((fig) => {
    const frame = $('.fig__frame', fig)
    const cap = $('figcaption', fig)
    const tl = gsap.timeline({ scrollTrigger: { trigger: fig, start: 'top 85%' } })
    tl.fromTo(frame, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'expo.inOut' })
    if (cap) tl.from(cap, { opacity: 0, y: 12, duration: 0.9, ease: 'power3.out' }, 0.9)
  })
}

function drift() {
  $$('[data-drift]').forEach((img) =>
    gsap.fromTo(
      img,
      { yPercent: -6 },
      { yPercent: 6, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } },
    ),
  )
}

function depth() {
  $$('[data-speed]').forEach((el) => {
    const s = parseFloat(el.dataset.speed)
    const r = parseFloat(el.dataset.rot || 0)
    gsap.fromTo(
      el,
      { y: () => innerHeight * s * 0.5, rotation: -r / 2 },
      {
        y: () => -innerHeight * s * 0.5,
        rotation: r / 2,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true },
      },
    )
  })
}

// ——— II. bloom: inset card grows to full bleed ———
// Built once per breakpoint (the card's inset/zoom differ) instead of using invalidateOnRefresh,
// which drops the hidden start state of every staggered copy element but the first.
function bloom(mm) {
  const build = () => {
    const css = getComputedStyle($('.bloom'))
    const v = (name) => css.getPropertyValue(`--bloom-${name}`).trim()
    gsap
      .timeline({ scrollTrigger: { trigger: '.bloom', start: 'top top', end: 'bottom bottom', scrub: true } })
      .fromTo('.bloom__pre', { opacity: 1, y: 0 }, { opacity: 0, y: -20, ease: 'none', duration: 0.15 }, 0)
      .fromTo('.bloom__fig', { clipPath: `inset(${v('inset')} round ${v('radius')})` }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'power2.inOut', duration: 0.65 }, 0)
      .fromTo('.bloom__fig img', { scale: parseFloat(v('zoom')) }, { scale: 1, ease: 'power2.inOut', duration: 0.65 }, 0)
      .fromTo('.bloom__stage', { '--shade': 0 }, { '--shade': 1, ease: 'none', duration: 0.25 }, 0.5)
      .fromTo('.bloom__copy > *', { y: 70, opacity: 0 }, { y: 0, opacity: 1, ease: 'power3.out', stagger: 0.05, duration: 0.25 }, 0.55)
      .to({}, { duration: 0.2 })
  }
  mm.add('(max-width: 760px)', build)
  mm.add('(min-width: 761px)', build)
}

// ——— III. harvest: pinned horizontal track ———
function harvest(mm) {
  mm.add('(min-width: 761px)', () => {
    const section = $('.harvest')
    const track = $('.harvest__track')
    const dist = () => track.scrollWidth - innerWidth
    // the extra quarter-screen is a hold on the last photo before the page moves on
    const size = () => (section.style.height = `${dist() + innerHeight * 1.25}px`)
    size()
    ScrollTrigger.addEventListener('refreshInit', size)
    const st = { trigger: section, start: 'top top', end: () => `+=${dist()}`, scrub: true, invalidateOnRefresh: true }
    // explicit start values: these re-measure on refresh, and a bare .to() would re-read its start from mid-scroll
    const move = gsap.fromTo(track, { x: 0 }, { x: () => -dist(), ease: 'none', scrollTrigger: st })
    gsap.fromTo('.harvest__ghost', { x: 0 }, { x: () => -dist() * 0.3, ease: 'none', scrollTrigger: { ...st } })
    gsap.fromTo('.harvest__progress i', { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { ...st } })
    $$('.h-fig figcaption').forEach((cap) =>
      gsap.from(cap, { opacity: 0, y: 14, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: cap.parentElement, containerAnimation: move, start: 'left 70%' } }),
    )
    $$('[data-hdrift]').forEach((img) =>
      gsap.fromTo(
        img,
        { xPercent: -5 },
        { xPercent: 5, ease: 'none', scrollTrigger: { trigger: img.closest('.h-fig'), containerAnimation: move, start: 'left right', end: 'right left', scrub: true } },
      ),
    )
    $$('.h-fig .fig__frame').forEach((frame) =>
      gsap.fromTo(
        frame,
        { clipPath: 'inset(0% 0% 0% 100%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.out', scrollTrigger: { trigger: frame, containerAnimation: move, start: 'left 100%', end: 'left 55%', scrub: true } },
      ),
    )
    return () => {
      ScrollTrigger.removeEventListener('refreshInit', size)
      section.style.height = ''
    }
  })
}

// ——— V. roast: scroll-scrubbed roast levels ———
function roast() {
  const frames = $$('.roast__frame')
  const copies = $$('.roast__stage-copy')
  const temps = [20, 205, 215, 230]
  const tempEl = $('[data-temp]')
  const fill = $('[data-roast-fill]')
  let active = 0
  gsap.fromTo('.roast__frames', { scale: 1.1 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.roast__pin', start: 'top top', end: 'bottom bottom', scrub: true } })
  ScrollTrigger.create({
    trigger: '.roast__pin',
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: ({ progress }) => {
      const f = progress * (frames.length - 1)
      const i = Math.min(frames.length - 2, Math.floor(f))
      const t = smooth(0.25, 0.75, f - i)
      frames.forEach((img, k) => (img.style.opacity = k <= i ? 1 : k === i + 1 ? t : 0))
      tempEl.textContent = Math.round(temps[i] + (temps[i + 1] - temps[i]) * t)
      fill.style.transform = `scaleX(${progress})`
      const now = Math.round(i + t)
      if (now !== active) {
        copies[active].classList.remove('is-on')
        copies[now].classList.add('is-on')
        active = now
      }
    },
  })
  gsap.from('.roast__head > *', { y: 50, opacity: 0, stagger: 0.08, duration: 1.3, ease: 'expo.out', scrollTrigger: { trigger: '.roast__pin', start: 'top 60%' } })
}

// ——— finale + footer ———
function finale() {
  gsap.fromTo('.finale__img', { scale: 1.22 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.finale', start: 'top bottom', end: 'bottom bottom', scrub: true } })
  const title = SplitText.create('.finale__title', { type: 'lines', mask: 'lines', linesClass: 'line' })
  gsap
    .timeline({ scrollTrigger: { trigger: '.finale', start: 'top 15%' } })
    .from('.finale__copy .label', { opacity: 0, y: 20, duration: 1, ease: 'power3.out' })
    .from(title.lines, { yPercent: 110, duration: 1.5, ease: 'expo.out', stagger: 0.1 }, 0.1)
    .from('.finale__body, .finale__actions', { opacity: 0, y: 30, duration: 1.2, ease: 'expo.out', stagger: 0.1 }, 0.5)
  const mark = SplitText.create('.footer__mark', { type: 'chars', mask: 'chars', charsClass: 'fc' })
  // the footer is sticky underneath the finale, so time its reveal off the finale leaving
  gsap.from(mark.chars, { yPercent: 105, duration: 1.4, ease: 'expo.out', stagger: 0.035, scrollTrigger: { trigger: '.finale', start: 'bottom 55%' } })
}

// ——— boot ———
async function boot() {
  await load()
  if (reduce) {
    $('#loader').remove()
    document.body.classList.remove('is-loading')
    return
  }
  heroIntro()
  heroScroll()
  splitHeadings()
  statementWords()
  rises()
  reveals()
  drift()
  depth()
  const mm = gsap.matchMedia()
  bloom(mm)
  harvest(mm)
  roast()
  finale()
  // the harvest section sizes itself from its track, so re-measure everything once it has
  ScrollTrigger.refresh()
}
boot()
