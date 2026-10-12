// Converts assets-src/art/raw/*.png into responsive WebP files in public/img.
// usage: node scripts/process.mjs [name ...]
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'

const RAW = 'assets-src/art/raw'
const OUT = 'public/img'
fs.mkdirSync(OUT, { recursive: true })

const FLOATS = new Set(['bean', 'bean-2', 'leaf', 'cherry'])
// hero layers must keep their full canvas so they stay registered with each other
const LAYERS = new Set(['hero-sky', 'hero-ridge', 'hero-branch'])

const args = process.argv.slice(2)
const files = fs.readdirSync(RAW).filter((f) => f.endsWith('.png') && (!args.length || args.includes(path.basename(f, '.png'))))

for (const f of files) {
  const name = path.basename(f, '.png')
  const src = path.join(RAW, f)
  const meta = await sharp(src).metadata()
  const alpha = meta.hasAlpha && (FLOATS.has(name) || LAYERS.has(name))

  if (FLOATS.has(name)) {
    const trimmed = await sharp(src).trim({ threshold: 1 }).png().toBuffer()
    const info = await sharp(trimmed).resize({ width: 520, withoutEnlargement: true }).webp({ quality: 86, alphaQuality: 90 }).toFile(path.join(OUT, name + '.webp'))
    console.log(name.padEnd(15), `${info.width}x${info.height}`, `${Math.round(info.size / 1024)}KB`)
    continue
  }

  const big = meta.width >= meta.height ? 1920 : 1024
  const small = meta.width >= meta.height ? 960 : 640
  for (const [suffix, w, q] of [['', big, 80], ['-sm', small, 76]]) {
    let img = sharp(src).resize({ width: w, withoutEnlargement: true })
    if (!alpha) img = img.removeAlpha()
    const info = await img.webp({ quality: q, alphaQuality: 88, effort: 5 }).toFile(path.join(OUT, name + suffix + '.webp'))
    console.log((name + suffix).padEnd(15), `${info.width}x${info.height}`, `${Math.round(info.size / 1024)}KB`)
  }
}
