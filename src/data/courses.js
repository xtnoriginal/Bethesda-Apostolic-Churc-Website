export const courses = [
  {
    slug: 'foundations-of-faith',
    title: 'Foundations of Faith',
    category: 'Foundations',
    description: 'A starting point for new believers covering the core beliefs of the church.',
    image: '/images/10.jpg',
    lessons: [
      {
        id: 'l1',
        title: 'What We Believe',
        type: 'text',
        duration: '4 min read',
        body: [
          'We believe in the Bible as the inspired Word of God and the foundation of our faith.',
          'Our vision is to be a church that transforms lives through the power of the Gospel.',
          'Love, faith, integrity, service, and community guide everything we do.',
        ],
      },
      {
        id: 'l2',
        title: 'Salvation and Grace',
        type: 'text',
        duration: '3 min read',
        isDraft: true,
        body: [
          'Salvation is a free gift from God, received by grace through faith in Jesus Christ, not earned by our own works.',
          'This lesson walks through what it means to accept that gift and what changes in a believer\'s life afterward.',
        ],
      },
      {
        id: 'l3',
        title: 'Prayer and the Holy Spirit',
        type: 'audio',
        duration: '3 min listen',
        audioUrl: '/audio/placeholder-lesson.wav',
        isDraft: true,
        body: [
          'An introduction to prayer as an ongoing conversation with God, and the role of the Holy Spirit in guiding, comforting, and empowering believers.',
        ],
      },
    ],
  },
  {
    slug: 'the-life-of-our-founder',
    title: 'The Life of Arch Bishop Loveless Manhango',
    category: 'Church History',
    description: "A teaching series on the founder's calling, the 14 visions, and his evangelism journeys.",
    image: '/images/18.jpg',
    lessons: [
      {
        id: 'l1',
        title: 'The Night of the Calling',
        type: 'text',
        duration: '5 min read',
        body: [
          'In 1952, Arch Bishop Loveless Manhango was working as a brick moulder on a farm in Chegutu when, on the night of 20 September, he heard a voice while asleep: "Worldly pleasure is temporary but heavenly life is eternal."',
          'What followed, across two nights, were fourteen visions that convinced him God was calling him to preach the gospel. He left his job that same week and never returned to formal employment.',
        ],
        linkHref: '/founder',
        linkLabel: 'Read the full account on the Founder page',
      },
      {
        id: 'l2',
        title: 'The 14 Visions Explained',
        type: 'text',
        duration: '6 min read',
        body: [
          'Across the fourteen visions, recurring themes emerge: the blood of Christ and its power to cleanse, God\'s coming judgment on sin, the Holy Spirit\'s gifts of power and perseverance, and a repeated commission to preach and heal.',
          'The final vision — of oxen, a gully, and worms transformed into rejoicing believers — became the clearest picture of his calling: to preach the Word until the lost are found and made new.',
        ],
        linkHref: '/founder',
        linkLabel: 'Read all fourteen visions in full',
      },
      {
        id: 'l3',
        title: 'The Evangelism Journeys',
        type: 'video',
        duration: '—',
        isComingSoon: true,
        body: [
          'This lesson will cover the evangelism journeys Arch Bishop Loveless Manhango undertook after his calling. That chapter of his story has not been recorded here yet.',
        ],
      },
    ],
  },
  {
    slug: 'discipleship-essentials',
    title: 'Discipleship Essentials',
    category: 'Discipleship',
    description: 'Practical teaching for growing in daily walk with Christ and serving the church.',
    image: '/images/22.jpg',
    lessons: [
      {
        id: 'l1',
        title: 'Following Christ Daily',
        type: 'text',
        duration: '3 min read',
        isDraft: true,
        body: [
          'Discipleship is a daily decision, not a one-time event. This lesson looks at simple habits — prayer, scripture, obedience — that shape a life that follows Christ.',
        ],
      },
      {
        id: 'l2',
        title: 'Serving the Church',
        type: 'text',
        duration: '3 min read',
        isDraft: true,
        body: [
          'Every believer has a part to play in the life of the church. This lesson explores spiritual gifts and practical ways to serve your local congregation.',
        ],
      },
      {
        id: 'l3',
        title: 'Sharing Your Faith',
        type: 'audio',
        duration: '3 min listen',
        audioUrl: '/audio/placeholder-lesson.wav',
        isDraft: true,
        body: [
          'A practical guide to talking about your faith naturally and confidently, without pressure or fear.',
        ],
      },
    ],
  },
  {
    slug: 'family-and-marriage',
    title: 'Family and Marriage',
    category: 'Family',
    description: 'Biblical teaching on marriage, parenting, and building a godly household.',
    image: '/images/24.jpg',
    lessons: [
      {
        id: 'l1',
        title: 'Marriage as a Covenant',
        type: 'text',
        duration: '4 min read',
        isDraft: true,
        body: [
          'Marriage in scripture is presented as a covenant, not just a contract — a lifelong, sacrificial commitment modeled on Christ\'s love for the church.',
        ],
      },
      {
        id: 'l2',
        title: 'Raising Children in Faith',
        type: 'audio',
        duration: '3 min listen',
        audioUrl: '/audio/placeholder-lesson.wav',
        isDraft: true,
        body: [
          'Guidance for parents on raising children with a foundation of faith, from early years through the teenage years.',
        ],
      },
    ],
  },
];

export function getCourseBySlug(slug) {
  return courses.find((course) => course.slug === slug);
}
