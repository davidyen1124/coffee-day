// Generates art with Codex CLI's built-in image_gen tool.
// usage: node scripts/gen.mjs [--force] [-j 4] [name ...]   (default: every entry in assets-src/art/manifest.mjs)
// Each entry runs one `codex exec`; the produced PNG is copied to assets-src/art/raw/<name>.png.
import { spawn } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { ASSETS, STYLE } from '../assets-src/art/manifest.mjs'

const ROOT = path.resolve(import.meta.dirname, '..')
const RAW = path.join(ROOT, 'assets-src/art/raw')
const LOG = path.join(ROOT, 'assets-src/art/logs')
const GEN = path.join(os.homedir(), '.codex/generated_images')
fs.mkdirSync(RAW, { recursive: true })
fs.mkdirSync(LOG, { recursive: true })

const argv = process.argv.slice(2)
const force = argv.includes('--force')
const jIdx = argv.indexOf('-j')
const jobs = jIdx >= 0 ? Number(argv[jIdx + 1]) : 4
const names = argv.filter((a, i) => !a.startsWith('-') && argv[i - 1] !== '-j')

const pick = ASSETS.filter((a) => (names.length ? names.includes(a.name) : true))
const todo = pick.filter((a) => force || !fs.existsSync(path.join(RAW, a.name + '.png')))

function brief(a) {
  const lines = [
    'Use your built-in image_gen tool to create exactly ONE image from the brief below, then reply with just DONE.',
    'Do not write code, do not edit or create files, do not generate more than one image.',
  ]
  if (a.ref) lines.push('An image is attached: treat it as described in the brief (reference for an edit or for style/colour matching).')
  if (a.transparent)
    lines.push('This asset MUST have a genuinely transparent background (real alpha channel). Request a transparent background from image_gen and preserve the alpha. No backdrop, no floor, no vignette.')
  lines.push('', `Canvas: ${a.size}.`, '', 'BRIEF:', a.prompt, '', a.style === false ? '' : STYLE)
  return lines.join('\n')
}

function run(a) {
  return new Promise((resolve) => {
    const args = ['exec', '--skip-git-repo-check', '-c', 'model_reasoning_effort="low"', '-C', RAW, '--json']
    if (a.ref) args.push('-i', path.join(RAW, a.ref + '.png'))
    args.push('-')
    const t0 = Date.now()
    const p = spawn('codex', args, { stdio: ['pipe', 'pipe', 'pipe'] })
    const out = fs.createWriteStream(path.join(LOG, a.name + '.jsonl'))
    let first = ''
    p.stdout.on('data', (d) => {
      if (!first) first = d.toString()
      out.write(d)
    })
    p.stderr.pipe(fs.createWriteStream(path.join(LOG, a.name + '.err')))
    p.stdin.end(brief(a))
    p.on('close', (code) => {
      out.end()
      const tid = (first.match(/"thread_id":"([^"]+)"/) || [])[1]
      const dir = tid && path.join(GEN, tid)
      const pngs = dir && fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith('.png')) : []
      const secs = Math.round((Date.now() - t0) / 1000)
      if (pngs.length) {
        const newest = pngs.map((f) => path.join(dir, f)).sort((x, y) => fs.statSync(y).mtimeMs - fs.statSync(x).mtimeMs)[0]
        fs.copyFileSync(newest, path.join(RAW, a.name + '.png'))
        console.log(`ok   ${a.name.padEnd(14)} ${secs}s`)
      } else console.log(`FAIL ${a.name.padEnd(14)} exit=${code} ${secs}s thread=${tid}`)
      resolve()
    })
  })
}

// entries with a ref must wait for their ref to exist
const done = new Set(ASSETS.filter((a) => fs.existsSync(path.join(RAW, a.name + '.png')) && !todo.includes(a)).map((a) => a.name))
const queue = [...todo]
let active = 0
await new Promise((resolveAll) => {
  const tick = () => {
    if (!queue.length && !active) return resolveAll()
    while (active < jobs) {
      const i = queue.findIndex((a) => !a.ref || done.has(a.ref) || !todo.some((t) => t.name === a.ref))
      if (i < 0) break
      const a = queue.splice(i, 1)[0]
      active++
      run(a).then(() => {
        active--
        done.add(a.name)
        tick()
      })
    }
  }
  tick()
})
console.log('all done')
