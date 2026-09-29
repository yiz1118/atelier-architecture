export type Article = {
  slug: string;
  number: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  sections: { heading: string; paragraphs: string[] }[];
  relatedProject: string;
};

export const articles: Article[] = [
  {
    slug: "the-shape-of-daylight", number: "01", title: "The Shape of Daylight", category: "Perspective", date: "September 2026",
    excerpt: "Light is not an effect applied to a room. It is one of the materials from which a room is made.",
    image: "/images/north-light-apartment-01.webp", imageAlt: "Diffuse daylight entering a calm Stockholm apartment", relatedProject: "north-light-apartment",
    sections: [
      { heading: "Begin with the sun", paragraphs: ["Before a room has a finish or a piece of furniture, it has an orientation. Morning light asks something different of a kitchen than low evening light asks of a place to gather. The first design decision is therefore often where a person will be at a particular hour.", "A generous window is not automatically a generous experience. Depth, reveal and the surfaces around the opening decide whether light is soft, direct, reflected or held at the edge of a room."] },
      { heading: "Give the eye somewhere to rest", paragraphs: ["A sequence of bright and shaded spaces can make a building feel larger than a uniformly lit interior. A quiet passage prepares the eye for an open living space. A darker niche gives a wide view its force.", "In North Light Apartment, pale walls and a long run of oak joinery make diffuse northern light legible. The room does not need dramatic gestures; it needs proportion and a place for daylight to settle."] },
      { heading: "Let light change", paragraphs: ["Architecture is experienced over time. Rather than treating each room as a fixed image, we think about the changes it can hold: the movement of a shadow, a muted afternoon, the first light on a wall in winter.", "The most memorable spaces often leave enough calm for those small events to be noticed."] },
    ],
  },
  {
    slug: "materials-that-acquire-character", number: "02", title: "Materials That Acquire Character", category: "Materials", date: "August 2026",
    excerpt: "The right surface has a life beyond the photograph. It gains depth through use, weather and touch.",
    image: "/images/coastal-house-03.webp", imageAlt: "Limestone and oak material detail in the coastal house concept", relatedProject: "coastal-house",
    sections: [
      { heading: "A material in context", paragraphs: ["A material is never selected in isolation. Stone behaves differently under a grey coastal sky than it does beneath strong southern sun. Timber can feel warm or severe depending on its grain, finish and the company it keeps.", "For Coastal House, pale mineral walls provide a steady foreground for changing weather. Oak at the openings softens the line between the protective shell and the rooms within."] },
      { heading: "Allow evidence of life", paragraphs: ["Perfect uniformity can make a surface feel distant. Small variations in stone, brick and plaster give scale to a wall and evidence of the hand behind it. We are interested in materials that can remain beautiful as they take on marks and patina.", "That choice asks for care in detailing. A junction should account for movement, water, cleaning and repair. The quietest detail is often the result of the most deliberate thinking."] },
      { heading: "Use fewer things well", paragraphs: ["A restrained palette is not a rule about minimalism. It is a way to let proportion and texture do more work. Repetition builds continuity from one space to the next, while a change of surface can mark a threshold without an added sign."] },
    ],
  },
  {
    slug: "the-quiet-threshold", number: "03", title: "The Quiet Threshold", category: "Process", date: "July 2026",
    excerpt: "What happens between rooms is as important as the rooms themselves: a pause, a turn, a change in scale.",
    image: "/images/gallery-hotel-01.webp", imageAlt: "Shaded stone arcade opening into a hotel courtyard", relatedProject: "gallery-hotel",
    sections: [
      { heading: "Design the in-between", paragraphs: ["Plans can reduce movement to lines of circulation. In experience, those lines are made of moments: leaving the street, passing beneath shade, seeing a garden before entering it.", "The Gallery Hotel concept begins with such a sequence. Its arcade is not simply an efficient route to reception. It is a place where the pace of the city gives way to the pace of the hotel."] },
      { heading: "A change you can feel", paragraphs: ["A threshold can be almost invisible. A lower ceiling, a deeper wall, or a shift from stone to timber changes how a space is perceived. These moves are strongest when they arise from structure and use rather than decoration.", "In a residence, a protected entrance can make the first view of a courtyard feel expansive. In a public building, a generous covered edge offers a moment of orientation before a visitor joins the activity inside."] },
      { heading: "Leave room for discovery", paragraphs: ["We do not believe every space should announce itself at once. When a building reveals its setting in measured steps, arrival becomes part of the memory of being there."] },
    ],
  },
];

export const articleBySlug = (slug: string) => articles.find((article) => article.slug === slug);
