export type ProjectCategory = "Residential" | "Hospitality" | "Interiors" | "Commercial";

export type Project = {
  slug: string;
  number: string;
  title: string;
  location: string;
  year: string;
  category: ProjectCategory;
  type: string;
  summary: string;
  concept: string;
  conceptTitle: string;
  materials: string[];
  detail: string;
  images: { src: string; alt: string; caption: string }[];
  plan: { label: string; x: number; y: number; w: number; h: number }[];
};

export const projects: Project[] = [
  {
    slug: "coastal-house", number: "01", title: "Coastal House", location: "Northumberland coast, UK", year: "2026", category: "Residential", type: "Private residence",
    summary: "A sheltered place to live with the horizon: mineral surfaces, timber warmth and a measured relationship with the coast.",
    concept: "Two low volumes frame a protected court before opening toward the sea. Arrival is deliberately compressed; the living rooms then unfold to light and distance. The plan gives the landscape a presence without leaving the home exposed to it.",
    conceptTitle: "Shelter, open to the horizon.",
    materials: ["Pale limestone", "Natural oak", "Honed stone", "Lime plaster"],
    detail: "A concept study of threshold, shelter and exposure. The living spaces follow the changing coastal light while private rooms remain quietly gathered around the courtyard.",
    images: [
      { src: "/images/coastal-house-01.webp", alt: "Pale stone coastal residence framing a sheltered court and sea view", caption: "01 / The sheltered court" },
      { src: "/images/coastal-house-02.webp", alt: "Limestone and oak living space facing the Northumberland coast", caption: "02 / Living with the horizon" },
      { src: "/images/coastal-house-03.webp", alt: "Close view of limestone, oak and coastal light at the house", caption: "03 / Material and light" },
    ],
    plan: [
      { label: "LIVING", x: 32, y: 35, w: 216, h: 132 }, { label: "COURT", x: 248, y: 35, w: 137, h: 132 },
      { label: "DINING", x: 385, y: 35, w: 180, h: 132 }, { label: "BEDROOMS", x: 32, y: 167, w: 260, h: 155 },
      { label: "ENTRY", x: 292, y: 167, w: 94, h: 155 }, { label: "STUDY", x: 386, y: 167, w: 179, h: 155 },
    ],
  },
  {
    slug: "courtyard-residence", number: "02", title: "Courtyard Residence", location: "Copenhagen outskirts, Denmark", year: "2025", category: "Residential", type: "Private residence",
    summary: "An inward-looking brick home arranged around a living garden and the quiet rhythm of ordinary days.",
    concept: "The courtyard is the home's central room. A series of brick edges, glazed passages and timber-lined spaces offers long views across the garden while protecting privacy from the surrounding neighborhood.",
    conceptTitle: "A garden at the center of life.",
    materials: ["Handmade dark brick", "Oiled oak", "Gravel", "Soft mineral plaster"],
    detail: "A concept study in domestic privacy. Each room borrows atmosphere from the garden, making the passing seasons part of daily life.",
    images: [
      { src: "/images/courtyard-residence-01.webp", alt: "Dark brick residence surrounding a mature tree in a planted courtyard", caption: "01 / The garden room" },
      { src: "/images/courtyard-residence-02.webp", alt: "Oak-framed interior overlooking the brick courtyard and garden", caption: "02 / Looking inward" },
      { src: "/images/courtyard-residence-03.webp", alt: "Detail of brick, oak and planting at the courtyard residence", caption: "03 / The material edge" },
    ],
    plan: [
      { label: "LIVING", x: 35, y: 35, w: 170, h: 95 }, { label: "KITCHEN", x: 205, y: 35, w: 145, h: 95 },
      { label: "BEDROOM", x: 350, y: 35, w: 215, h: 95 }, { label: "GARDEN", x: 168, y: 130, w: 232, h: 140 },
      { label: "STUDIO", x: 35, y: 130, w: 133, h: 192 }, { label: "PASSAGE", x: 400, y: 130, w: 165, h: 140 },
      { label: "ENTRY", x: 168, y: 270, w: 397, h: 52 },
    ],
  },
  {
    slug: "gallery-hotel", number: "03", title: "Gallery Hotel", location: "Porto, Portugal", year: "2025", category: "Hospitality", type: "Boutique hotel",
    summary: "A place of arrival and retreat, where a shaded limestone arcade leads to intimate rooms and a planted court.",
    concept: "The hotel is imagined as a sequence of thresholds. The open arcade welcomes the city; a shaded interior gallery slows the pace; guest rooms gather around a private courtyard. New work is deliberately quiet alongside the existing masonry character.",
    conceptTitle: "Arrival becomes a quiet retreat.",
    materials: ["Warm limestone", "Dark bronze", "Linen", "Oiled timber"],
    detail: "A concept for hospitality on a more human scale. Circulation becomes a place to pause, and shared spaces feel like an extension of the city rather than a separate world.",
    images: [
      { src: "/images/gallery-hotel-01.webp", alt: "Limestone arcade and planted court at a fictional Porto gallery hotel", caption: "01 / Arrival through the arcade" },
      { src: "/images/gallery-hotel-02.webp", alt: "Quiet limestone hotel lounge with dark bronze framed openings", caption: "02 / A room for pause" },
      { src: "/images/gallery-hotel-03.webp", alt: "Detail of limestone, bronze and soft light at the hotel", caption: "03 / Warmth in restraint" },
    ],
    plan: [
      { label: "ARCADE", x: 32, y: 35, w: 90, h: 287 }, { label: "LOUNGE", x: 122, y: 35, w: 190, h: 112 },
      { label: "COURT", x: 312, y: 35, w: 130, h: 188 }, { label: "DINING", x: 442, y: 35, w: 122, h: 188 },
      { label: "GALLERY", x: 122, y: 147, w: 190, h: 76 }, { label: "GUEST ROOMS", x: 122, y: 223, w: 442, h: 99 },
    ],
  },
  {
    slug: "north-light-apartment", number: "04", title: "North Light Apartment", location: "Stockholm, Sweden", year: "2024", category: "Interiors", type: "Interior architecture",
    summary: "An interior composed around diffuse daylight, considered storage and the understated character of natural materials.",
    concept: "A continuous oak joinery wall gives the apartment a calm backbone. The living and dining spaces remain open to the northern view, while enclosed functions are absorbed into a precise sequence of cabinets and passages.",
    conceptTitle: "A place for light to settle.",
    materials: ["Oak joinery", "Limewash", "Honed stone", "Woven linen"],
    detail: "A concept study of what to leave visible and what to put away. Light, proportion and crafted storage make an uncluttered home feel deeply lived in.",
    images: [
      { src: "/images/north-light-apartment-01.webp", alt: "Pale Stockholm apartment with three tall windows, oak joinery and soft daylight", caption: "01 / The north-facing room" },
      { src: "/images/north-light-apartment-02.webp", alt: "Oak joinery and quiet kitchen in the north light apartment", caption: "02 / A continuous interior" },
      { src: "/images/north-light-apartment-03.webp", alt: "Material close-up of oak joinery, limewash and stone", caption: "03 / Details in daylight" },
    ],
    plan: [
      { label: "LIVING", x: 32, y: 35, w: 250, h: 178 }, { label: "DINING", x: 282, y: 35, w: 134, h: 178 },
      { label: "KITCHEN", x: 416, y: 35, w: 148, h: 178 }, { label: "BEDROOM", x: 32, y: 213, w: 189, h: 110 },
      { label: "HALL", x: 221, y: 213, w: 195, h: 110 }, { label: "STUDY", x: 416, y: 213, w: 148, h: 110 },
    ],
  },
  {
    slug: "urban-pavilion", number: "05", title: "Urban Pavilion", location: "Rotterdam, Netherlands", year: "2026", category: "Commercial", type: "Cultural and commercial space",
    summary: "A clear, adaptable public room at the edge of the city, made from concrete, glass and open possibility.",
    concept: "A deep concrete roof creates a civic threshold between plaza and hall. Inside, an unobstructed floorplate can support exhibitions, gatherings or temporary retail. The facade makes activity visible without dictating its use.",
    conceptTitle: "An open frame for possibility.",
    materials: ["Board-formed concrete", "Clear glazing", "Brushed steel", "Stone paving"],
    detail: "A concept for a generous public interior. The simple structural frame provides a durable setting that can change with its community.",
    images: [
      { src: "/images/urban-pavilion-01.webp", alt: "Concrete and glass urban pavilion opening onto a Rotterdam plaza", caption: "01 / The public edge" },
      { src: "/images/urban-pavilion-02.webp", alt: "Flexible concrete exhibition hall inside the urban pavilion", caption: "02 / A room for many uses" },
      { src: "/images/urban-pavilion-03.webp", alt: "Detail of concrete and glazing at the pavilion", caption: "03 / Structure as character" },
    ],
    plan: [
      { label: "COVERED EDGE", x: 32, y: 35, w: 532, h: 62 }, { label: "OPEN HALL", x: 32, y: 97, w: 363, h: 225 },
      { label: "SERVICE", x: 395, y: 97, w: 169, h: 87 }, { label: "STORAGE", x: 395, y: 184, w: 169, h: 70 },
      { label: "ENTRY", x: 395, y: 254, w: 169, h: 68 },
    ],
  },
];

export const projectBySlug = (slug: string) => projects.find((project) => project.slug === slug);
