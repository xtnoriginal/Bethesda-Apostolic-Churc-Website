export const archiveItems = [
  {
    slug: 'walking-in-the-light-of-god',
    title: 'Walking in the Light of God',
    type: 'Sermon',
    date: '2025-02-10',
    image: '/images/18.jpg',
    description: 'A powerful message on staying aligned with God’s will.',
    isDraft: true,
    body: [
      'This sermon looks at what it means to walk in the light rather than in darkness — living each day in a way that is open, honest, and aligned with God’s will rather than hidden or compromised.',
      '"But if we walk in the light, as he is in the light, we have fellowship with one another, and the blood of Jesus his Son cleanses us from all sin." 1 John 1:7',
    ],
  },
  {
    slug: 'power-of-faith-in-difficult-times',
    title: 'Power of Faith in Difficult Times',
    type: 'Article',
    date: '2025-01-15',
    image: '/images/18.jpg',
    description: 'Exploring how faith gives us strength.',
    body: [
      'Life often brings challenges that test our faith, courage, and endurance. Yet the Scriptures assure us that God walks with us through every storm we face.',
      'The Scriptures remind us that "Jehovah is close to the brokenhearted" and that He sustains those who are crushed in spirit.',
      'Psalm 34:18 — "Jehovah is close to the brokenhearted; he saves those who are crushed in spirit."',
      'No matter how heavy our burdens may feel, God promises comfort, strength, and peace to those who rely on Him. Challenges refine us. Like gold tested by fire, trials help us develop trust, endurance, and spiritual maturity.',
      'Romans 5:3-4 — "Tribulation produces endurance; endurance, in turn, an approved condition; and an approved condition, hope."',
      'God assures His people: "I will never leave you nor forsake you." His love, power, and guidance are constant — even when circumstances feel overwhelming. When we draw close to Him in prayer, study His Word, and fellowship with other believers, we gain strength for every challenge we face.',
    ],
  },
  {
    slug: 'youth-leadership-guide',
    title: 'Youth Leadership Guide',
    type: 'PDF',
    date: '2024-12-01',
    image: '/images/18.jpg',
    description: 'A downloadable resource for youth ministry leaders.',
    isDownloadPending: true,
    body: [
      'A downloadable guide for youth ministry leaders, covering practical guidance for mentoring and leading young people in the church.',
    ],
  },
];

export function getArchiveItemBySlug(slug) {
  return archiveItems.find((item) => item.slug === slug);
}
