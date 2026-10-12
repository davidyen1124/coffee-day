// Art direction for "Seed to Cup — a coffee journal".
// One shared photographic grade so every frame feels like it came from the same shoot.
export const STYLE = `STYLE: Genuine editorial photograph for a specialty coffee magazine (the look of Standart or Drift). It must be indistinguishable from a real, unretouched photo taken on location with a full-frame camera and a prime lens, using available natural light only. True-to-life colour with a restrained, slightly warm grade; realistic depth of field and lens falloff; fine natural grain; real-world imperfections (dust, wear, uneven ripeness, stray leaves, small blemishes). NOT illustration, painting, concept art, matte painting, 3D render or CGI. NOT steampunk or fantasy. NOT HDR, oversharpened or oversaturated. No glossy plastic-looking surfaces, no god rays, no theatrical spotlighting. Absolutely no text, letters, logos, watermark, border or frame.`

const WIDE = 'wide cinematic landscape, 16:9 (e.g. 1920x1088 or larger)'
const LAND = 'landscape 3:2 (e.g. 1536x1024)'
const PORT = 'portrait 2:3 (e.g. 1024x1536)'
const SQ = 'square (e.g. 1254x1254)'

const CUTOUT = `STYLE: Real photograph cut-out, indistinguishable from an unretouched product photo shot on a full-frame camera with a macro lens in soft window light from the upper left. True-to-life colour, natural matte-to-satin surfaces with small imperfections; NOT glossy or plastic-looking, NOT CGI, 3D render or illustration. Isolated subject only on a fully transparent background, crisp natural edges, no drop shadow, no floor, no text.`

export const ASSETS = [
  // ——— Hero: three depth layers ———
  {
    name: 'hero-sky',
    size: WIDE,
    prompt: `Cinematic dawn over a high-altitude coffee region in cloud-forest mountains. Only sky and far-away mountain ranges: five or six layered ridges receding into blue-grey haze, a thin band of pale apricot light low on the horizon, soft overcast upper sky with a gentle gradient from muted slate blue to warm grey. Valley fog pools in the lower third. The upper-middle half of the frame is calm, empty sky (room for a very large headline). No foreground hills, no trees in the foreground, no people, no buildings, no birds.`,
  },
  {
    name: 'hero-ridge',
    size: WIDE,
    ref: 'hero-sky',
    transparent: true,
    prompt: `Attached image = the background plate this layer will sit on top of; match its dawn light direction, haze and colour grade exactly. Create ONLY a real landscape photograph, shot with a 200mm telephoto lens from across a valley, of the mid-ground hillside of a working coffee farm: a steep slope with contour rows of dark-green coffee shrubs, a few tall shade trees (Inga and Grevillea with natural, irregular crowns) and banana plants along the crest, a thin veil of morning mist in the hollows, low warm light just catching the crest. Photographic foliage: individually resolved leaves and branches, natural atmospheric perspective, no painted or dithered canopies. The crest line undulates between 52% and 68% of the canvas height; the hillside is solid from the crest down to the bottom edge and bleeds off the left, right and bottom edges. EVERYTHING above the crest line must be fully transparent — no sky, no mountains, no fog above it.`,
  },
  {
    name: 'hero-branch',
    size: WIDE,
    transparent: true,
    prompt: `${CUTOUT}\n\nA real coffee branch photographed very close to the lens: a woody branch entering from the lower-right corner and arching up and to the left, matte dark-green Arabica leaves with wavy edges, realistic wear, small holes and dust, two clusters of coffee cherries of mixed ripeness (deep red, red-orange, a few green and yellow), soft natural sheen only, warm low dawn backlight glowing through the leaf edges, very slightly soft focus. The branch occupies only the right 45% and bottom 45% of the canvas; everything else is fully transparent.`,
    style: false,
  },

  // ——— I. Seed ———
  {
    name: 'seed',
    size: PORT,
    prompt: `Macro photograph of a coffee seedling at the "soldier" stage emerging from dark, moist volcanic soil: a pale green hooked stem lifting the papery beige parchment seed shell on its tip like a tiny helmet, fine soil crumbs and a few water droplets, very shallow depth of field, soft raking side light, background falls off into deep brown-black.`,
  },
  {
    name: 'seedlings',
    size: LAND,
    prompt: `Rows of young coffee seedlings with glossy leaves growing in black nursery bags under a shade-net nursery on a mountain farm, soft diffused green-tinted light filtering through the netting, receding rows with shallow depth of field, calm and quiet.`,
  },

  // ——— II. Tree ———
  {
    name: 'bloom',
    size: WIDE,
    prompt: `Close-up of coffee tree branches in full bloom: dense clusters of small white star-shaped jasmine-like blossoms at the leaf nodes, glossy dark-green leaves, soft morning mist, gently backlit, very shallow depth of field with creamy bokeh. Blossoms concentrated in the right half; the left third is soft, dark, out-of-focus foliage.`,
  },
  {
    name: 'cherries',
    size: PORT,
    prompt: `Close-up documentary photograph of a real coffee branch on a farm in overcast daylight: a cluster of Arabica coffee cherries at mixed ripeness — hard green, yellow-green, orange-red and a few deep crimson — slightly irregular in size, matte skin with a soft natural sheen (not glossy), small blemishes and dried flower remnants at the tips, leaves with realistic wear and dust. 100mm macro lens at f/4, background a soft blur of coffee trees, muted true-to-life colour.`,
  },

  // ——— III. Harvest ———
  {
    name: 'harvest-hands',
    size: PORT,
    prompt: `A coffee picker's weathered hands (face not visible, cropped at the chest) gently pulling ripe red coffee cherries off a branch into a worn woven basket tied at the waist, faded cotton shirt sleeve, overcast mountain light, candid documentary moment.`,
  },
  {
    name: 'harvest-basket',
    size: LAND,
    prompt: `Top-down view of freshly picked ripe coffee cherries heaped in a worn woven basket resting on dark earth, a few yellow and green cherries mixed in, a couple of leaves, the fruit glistening with moisture, soft natural daylight.`,
  },
  {
    name: 'drying',
    size: WIDE,
    prompt: `Raised drying beds on a mountain coffee farm in late-afternoon light: long parallel rows of waist-high mesh tables covered with pale parchment coffee and dark-red drying cherries, long soft shadows, rolling misty hills beyond, one tiny distant figure raking (small, unidentifiable). Horizon in the upper third.`,
  },

  // ——— IV. Process (three methods) ———
  {
    name: 'washed',
    size: PORT,
    prompt: `Close-up at a small coffee wet mill: clear water rushing through a worn concrete channel full of pale, slippery parchment coffee beans, a wooden paddle resting on the edge, overcast light.`,
  },
  {
    name: 'natural',
    size: PORT,
    prompt: `Close-up of whole coffee cherries drying in the sun on a raised mesh bed, a mix of deep burgundy raisin-wrinkled cherries and still-red ones, a hand-raked texture, warm afternoon side light.`,
  },
  {
    name: 'honey',
    size: PORT,
    prompt: `Close-up documentary photograph of honey-process coffee drying on a raised bed: pale beige parchment coffee beans (oval, about 1 cm long, each with a central split line) coated in a thin, tacky, amber-brown film of dried mucilage that makes them clump in small groups, lying on black plastic mesh, some beans darker where the coating is thicker. Soft late-afternoon daylight, 50mm macro lens, shallow depth of field, realistic scale, matte-to-satin surfaces — not glossy, not candy-like, not caramel syrup.`,
  },

  // ——— V. Roast: one composition, four roast levels ———
  {
    name: 'roast-0',
    size: WIDE,
    prompt: `Macro still-life of a loose heap of raw GREEN arabica coffee beans (pale jade-grey-green, matte) on a dark charcoal steel surface, low warm raking light from the left, background falling to near black. The heap fills the lower-centre of the frame, top edge around 40% of the height, generous dark space above.`,
  },
  {
    name: 'roast-1',
    size: WIDE,
    ref: 'roast-0',
    prompt: `Attached image = edit target. Keep the IDENTICAL composition, camera, heap shape, every bean's position, surface and lighting. Change ONLY the roast level: the beans are now LIGHT roasted — cinnamon to tan-gold colour, dry matte surface, slightly swollen with visible centre creases and a few flecks of chaff.`,
  },
  {
    name: 'roast-2',
    size: WIDE,
    ref: 'roast-0',
    prompt: `Attached image = edit target. Keep the IDENTICAL composition, camera, heap shape, every bean's position, surface and lighting. Change ONLY the roast level: the beans are now MEDIUM roasted — rich chestnut brown, even colour, satin surface with no oil, clearly swollen.`,
  },
  {
    name: 'roast-3',
    size: WIDE,
    ref: 'roast-0',
    prompt: `Attached image = edit target. Keep the IDENTICAL composition, camera, heap shape, every bean's position, surface and lighting. Change ONLY the roast level: the beans are now DARK roasted — deep espresso brown to near-black with an oily sheen and small specular highlights.`,
  },
  {
    name: 'roaster',
    size: WIDE,
    prompt: `Documentary photograph inside a working specialty coffee roastery on a weekday morning: a modern commercial drum roaster (about 15 kg, matte black powder-coated steel with brushed stainless details) with its round stainless cooling tray at the front; freshly roasted medium-brown beans pour from the drum door into the tray while the stirring arms turn, a thin haze of roasting smoke. A roaster's forearm and plain canvas apron are partly in frame at the edge (face not visible). Background: stacked jute sacks of green coffee, a steel work table, a bag sealer. Soft, even daylight from large industrial windows, accurate white balance, 35mm lens at f/2.8. Machine on the right half, quieter background on the left. No logos, brand names or text on the machine. Avoid steampunk or antique machinery, copper pipes, rivets, clusters of gauges, god rays and concept-art lighting.`,
  },

  // ——— VI. Brew ———
  {
    name: 'pour',
    size: PORT,
    prompt: `A matte black gooseneck kettle pouring a thin, glassy stream of water into a ceramic pour-over dripper with a paper filter, the coffee bed blooming, steam curling in soft side window light, dark neutral background, calm morning ritual.`,
  },
  {
    name: 'cup',
    size: WIDE,
    prompt: `Editorial photograph for a specialty coffee magazine: a single handmade speckled stoneware cup of black filter coffee on a plain, lightly worn oak table, early-morning daylight from a window on the left casting soft, natural shadows, a faint wisp of steam, three roasted beans nearby. Minimal and uncluttered: no fruit, no books, no plants, no props. The cup sits in the right third; the left half is calm negative space of table and soft shadow. 50mm lens at f/2.8, true-to-life colour, restrained warm grade.`,
  },

  // ——— Floating depth elements (transparent) ———
  { name: 'bean', size: SQ, transparent: true, style: false, prompt: `${CUTOUT}\n\nOne single medium-roast arabica coffee bean seen at a three-quarter angle showing its centre crease, satin chestnut-brown surface.` },
  { name: 'bean-2', size: SQ, transparent: true, style: false, prompt: `${CUTOUT}\n\nOne single medium-roast arabica coffee bean seen from its rounded back (crease hidden), tilted, satin chestnut-brown surface.` },
  { name: 'leaf', size: SQ, transparent: true, style: false, prompt: `${CUTOUT}\n\nOne single glossy dark-green coffee leaf with wavy edges and a short stem, slightly curled, lit so the veins show.` },
  { name: 'cherry', size: SQ, transparent: true, style: false, prompt: `${CUTOUT}\n\nTwo ripe Arabica coffee cherries joined on a short woody stem with one small leaf: deep red with slight natural colour variation toward orange at the shoulders, matte skin with a soft natural sheen, a small dried blossom scar at each tip, realistic size and small blemishes.` },
]

