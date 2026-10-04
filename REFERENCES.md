# Parallax / scroll-storytelling references

Collected 29 Sep 2026. Every site below was reachable live that day.

## Galleries
- Awwwards Parallax: https://www.awwwards.com/websites/parallax/
- Awwwards Storytelling: https://www.awwwards.com/websites/storytelling/
- Awwwards Scrolling: https://www.awwwards.com/websites/scrolling/
- Awwwards Food & Drink: https://www.awwwards.com/websites/food-drink/
- Awwwards café/coffee search: https://www.awwwards.com/inspiration_search/cafes/
- CSS Design Awards (parallax): https://www.cssdesignawards.com/website-gallery?feature=parallax
- One Page Love (parallax): https://onepagelove.com/tag/parallax-scrolling
- SiteInspire (parallax): https://www.siteinspire.com/websites?categories=parallax
- GSAP Showcase: https://gsap.com/showcase/ · landing.love GSAP: https://www.landing.love/collection/gsap/
- Codrops: https://tympanus.net/codrops/tag/parallax/

## Sites worth studying
| Site | What to borrow |
|---|---|
| bkkdw26.greydientlab.com (Coffee Ground Zero) | Letters fill with ink as you scroll; highlight bars grow behind key phrases; pinned steps with a progress ring |
| bestbeanbestcup.com.au | Pinned horizontal track; slide content staggers in via `containerAnimation`; hold at the end of the pin |
| white-desert.com | Rounded inset card opens to full-bleed via `clip-path: inset(... round)`; route lines drawn as you scroll |
| residences.loamhouse.com.au | Hero headline leaves with blur and drift; video preloaded one screen ahead; clean reduced-motion exit |
| firewatchgame.com | 9-layer hero with roughly exponential speeds; scrim layer between depths |
| archives.surfersjournal.com | Hero drifts up while a dark shade fades in behind the text |
| ladolfinajumping.com | Blur-to-sharp letter intro; clip-path image wipes; footer slides out from under the page |
| vanderhotel.com | Parallax distance set per element by an attribute; image reveal = scale to 1 while an overlay wipes |
| era-residence.com | Day/night hero toggle; horizontal scroll; custom scroll bar |
| catskills-showcase.pages.dev | Attribute-driven parallax; CTA background zooms 1→2 (desktop only) |
| podium.global | Per-column offsets by breakpoint (off on mobile); cards rotate -6°→0 |
| aardvarkbookclub.com | Canvas image-sequence hero (desktop only); tagline slides along a curved SVG path |
| thefriedegg.com | Nav colours switch per section |
| whiteout.overvac.com | "Scroll is altitude": a fixed rail counting metres |
| apple.com/airpods-pro | Sticky stages with scroll-scrubbed frames |
| assemblycoffee.co.uk, apocalypsecoffee.com, ceremonycoffee.com | Coffee brands: editorial imagery, split-text reveals, reduced-motion care |
| nytimes.com/projects/2012/snow-fall | The original long-form scrollytelling |

## Already used in Seed to Cup
Mist layer between the depth layers and the title blurring out on exit (Firewatch, Surfer's Journal, Loam House) · rounded card to full-bleed (White Desert) · harvest captions reveal per photo, progress line and end hold (Best Bean) · highlight bars in the statement (Coffee Ground Zero) · footer revealed from under the finale (La Dolfina) · `ignoreMobileResize`, and blur cleared after the intro.

## Ideas not built yet
- Scroll-drawn origin route (farm → port → roaster → cup) with DrawSVG.
- A journey rail counting altitude → roast temperature → brew seconds.
- A 60–120 frame canvas sequence for the roast. This needs more generated frames; keep the current crossfade on mobile.
- Section colour morph driven by `[data-theme]`.
