'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import PlaceholderNote from '@/components/PlaceholderNote';
import { ArrowLeft } from 'lucide-react';

const visions = [
  {
    number: 1,
    title: 'The Orchard and the Cloud of Blood',
    paragraphs: [
      'I looked up and found myself as though I was in a different setting altogether. In this vision I saw a vast orchard made up of all fruit trees on earth. The trees were very beautiful and the fruits were ripe and looked appetizing. Above the vast orchard stood a "cloud of blood". The same voice said, "Take the fruits and eat". I took oranges and they tasted sour like lemons and I had to spit the juice to the ground. Sugar canes were hard like bamboo sticks and were not edible. Mangoes looked appetizing from the outside appearance but inside they were rotten and worm infested. Bananas were many but they were rotten and uneatable. I could hardly find any edible fruits in this vast orchard. While I was wondering about this vision, I heard a voice say:',
      '"The cloud of blood hanging above the orchard is the blood of Jesus Christ who sacrificed his life and shed his blood at the cross for the salvation of human kind. The blood has power to cleanse people of their sins, but there is no one to make use of it. You have been chosen to make use of the blood for the deliverance of my people."',
      '"The vast field you have seen symbolizes the world. The wonderful fruit trees are the people on earth who seem to be healthy and full of life but inside, their hearts are rotten with sin. They do not please God."',
      'I was only hearing a voice but saw no being. The vision left me worried and I slept for a short while before dawn. I went to work as usual but my mind was occupied with the vision the whole day. On the second night, while in deep sleep, I heard the same voice saying again, "Worldly pleasure is for a short-time only but heavenly joy is eternal". I tried to wake up to see who was speaking but could not because of some heaviness in my body. While pondering on this, I felt a strong kind of spiritual power go through my body and I saw the following visions as if I was watching television.',
    ],
  },
  {
    number: 2,
    title: 'The Rod That Pierced My Finger',
    paragraphs: [
      'In the second vision, I was visited by two men wearing shining white robes and they spoke to me. They were angels. I then saw a white rod with a red bottom end. One of the men (angel) took the rod and pierced my finger with it. A severe pain went through my whole body and a lot of water like sweat came out of my body. The voice said "Your sins are forgiven, do not sin again". From that moment, I started to hate drinking beer and sin.',
    ],
  },
  {
    number: 3,
    title: 'The Two White Bulls',
    paragraphs: [
      'In the third vision, I saw two huge snow-white bulls charging towards me powerfully and they entered into my body. I felt great power flowing in my body and could not control myself. I felt an urge to speak and heard myself speaking in tongues and prophesying. One of the angels spoke to me and said: "The first bull is the Holy Spirit and power to perform miracles and the second bull is the power to persevere in preaching the gospel of Jesus Christ. You have been given these gifts".',
      'God was fulfilling his promise as is written in Acts 2:17, "And it shall come to pass in the last days, says God, That I will pour out my Spirit on all flesh, your sons and daughters shall prophesy, your young men shall see visions, and your old men shall dream dreams".',
      'Filled with the Holy Spirit, I left my tent and went to the nearby earth mounts called Mitoro around 0300hrs in the morning. These hills were formed because of the mining activities which were carried out on the farm. I prayed strongly and continued to see the following visions.',
    ],
  },
  {
    number: 4,
    title: 'The Two Bodies — Earthly and Spiritual',
    paragraphs: [
      'It was revealed to me that every person has two bodies, the earthly body and the heavenly spiritual body. The spiritual body of a sinner is pitch black, and the spiritual body of a saint is as white as snow. If a Christian commits a sin on earth, a black mark is put on his spiritual body in heaven. These marks increase as the person continues to sin. I saw many Christians worshipping God, but their spiritual bodies had black marks indicating that they continued to sin whilst in the church. All is naked to Him whom we must give account. I kept looking at this vision and saw God’s judgment coming. The black marks transformed and became hot flames of fire. I heard people crying because of the intense heat which was burning their bodies. I heard a voice saying "When God’s judgment comes, people will not be asked to give account of what they did or why, but their deeds will follow them and they will be judged accordingly".',
      'I felt sorry for the people who were crying. The works of all church goers will be brought to light and the hypocrites will be brought to justice. In 2 Corinthians 5:10, God’s Word says "For we must appear before the judgment seat of Christ, that each one may receive the things done in the body, according to what he has done, whether good or bad".',
    ],
  },
  {
    number: 5,
    title: 'The Pool of Boiling Water',
    paragraphs: [
      'I saw in a vision a big pool of boiling water and inside the pool was the devil and all his agents being punished without any rest or mercy.',
    ],
  },
  {
    number: 6,
    title: 'The Pit Being Dug for Sinners',
    paragraphs: [
      'In another vision, I saw a very big pit being dug and I heard a voice saying, "This pit is being made for sinners. This is where they will end". While I was wondering how the sinners will be identified, I saw the following vision:',
    ],
  },
  {
    number: 7,
    title: 'The Multitude at the Pit of Fire',
    paragraphs: [
      'A multitude of people were standing like cattle at a market place. In front of the people was a very deep pit and inside the pit I could hear flames of roaring fire. I saw sinners heading towards the pit like cattle moving towards a dip tank. When they got closer to the pit, their road ended. Their deeds were displayed on their bodies.',
      'Thieves were standing with all that they had stolen, and adulterers with all the persons they had committed adultery with, witches with the people they had killed, and the blood of those people was flowing all over the witches’ bodies. Alcoholics were swimming in pools of beer. When sinners reached the edge of the pit of roaring fire, their deeds turned to fire burning their bodies, and a strong power threw them into the pit where there was moaning and gnashing of teeth. A voice said, "That is the judgment of sinners, they are not asked to give an account of what they did, but their deeds follow them".',
      'I also saw the righteous with their bodies bathed in the blood of the Lamb entering by the same gate. Works of love, mercy and righteousness clothed their bodies. When they got to the doorway overlooking the pit of roaring fire, their bodies grew wings because of their good deeds. They got power to become angels and flew to the place of peace and tranquility in heaven. I heard very pacifying voices and sounds coming from that place, and a voice saying, "That is the sound of angels welcoming those who conquered the world and the beast".',
    ],
  },
  {
    number: 8,
    title: 'The Cloud of Aborted Souls',
    paragraphs: [
      'In my eighth vision, I saw a cloud from the eastern side of the sky, and I heard a lot of noise coming from it. While I was still wondering what this sound was all about, a voice said, "This is the blood of fetal abortions carried out on earth, praising God because their souls were taken away from earth before committing sins. They are the Cherubins and Seraphims of God." I saw many women walking in pools of blood, with their feet covered by this blood. A voice said, "These are the women who committed abortions and are guilty of murder and will be judged accordingly".',
    ],
  },
  {
    number: 9,
    title: 'The New Earth and the New Jerusalem',
    paragraphs: [
      'I saw a New Earth with very beautiful trees, grass and flowers. The splendor and beauty of what I saw is indescribable. The new earth I saw was full of righteousness, peace and happiness and it was lit with heavenly glory. As I kept looking at this place, I saw a hill and sitting on top was a man whose appearance was like that of jasper and His appearance illuminated the whole earth.',
      'A voice said to me, "This is the New Jerusalem adorned for those who conquered the world, and sitting on top is the blessed Lamb of God who is lighting this city". When John was at the Island of Patmos, he saw the New Jerusalem, which was also revealed to me. Revelation 21:23, "The city has no need of the sun or moon to light it, for the glory of God illuminated it. The Lamb is its light". There was melodious singing in the city. The music filled my heart and I longed to go and dwell in this city. Two of the songs, which I heard in Shona, are as follows:',
    ],
    songs: [
      {
        columns: [
          ['Mwari uri zuva redu', 'Unopenya pauzuru', 'Asi mweya ungaone', 'Paunozo famba napo'],
          ['Dombondipa meso ndione', 'Pauzuru kudenga', 'Ndivaone vatsvene', 'Vanofara kunaShe'],
        ],
      },
      {
        columns: [
          ['Mwari muri nhowo yedu', 'Hatidzitye hondo dzedu', 'Dzose dzinokundwa newe', 'Togouya nokufara'],
          ['Zviya zvavaive panyika', 'Vaichema misodzi', 'Vaimanikwa nekuyedzwa', 'Muedzi achiedza'],
        ],
      },
      {
        columns: [
          ['Unotipa ngoni dzenyu', 'Unotipa nehutsvene', 'Unopa vanonamata', 'Unopa rukomborero'],
          ['Ndakaona negwara rake', 'Ndikabvunza makadii?', 'Ndiye wanga watifira', 'Wanga wafira isu'],
        ],
      },
      {
        columns: [
          ['Rukomborero rukuru', 'Rukomborero rwedenga', 'Rwuripo rwavanofunga', 'Kuti vanodiwa naye'],
          ['Ngaarumbidzwe mutungamiri', 'Zvaatitungamirira', 'Kusashaikwe muteveri', 'Panero gwara rake'],
        ],
      },
    ],
  },
  {
    number: 10,
    title: 'The Guinea Fowls',
    paragraphs: [
      'In another vision, I saw guinea fowls. Their spots were beautiful and a marvel to look at. They were fighting and trying to outdo each other with the beauty of their spots, and a voice said, "What you have seen is what some people in different churches are doing today. They are selfish worshippers who are power hungry and greedy in their hearts and are far from God. They just keep records and registers like burial societies but are not doing the will of God. You have been chosen to work in God’s field. Go henceforth". I became convinced that this was coming from God and He wanted me to work for Him. At the same time, I became worried as to how I was going to begin and wondered who would listen to me.',
    ],
  },
  {
    number: 11,
    title: 'The Swarm of Bees',
    paragraphs: [
      'While I was thinking about this, I saw a vision of a swarm of bees coming to me and the voice said, "Have you seen all those bees? That is a reflection of the multitude of people who will follow you and assist you in God’s work. But some of them will turn against you and sting you like bees".',
    ],
  },
  {
    number: 12,
    title: 'The Man in White and the Dogs',
    paragraphs: [
      'I thought this was a difficult and impossible task to accomplish. As I pondered about this, I saw a vision of a man wearing white clothes and numerous dogs following him. I became frightened because the dogs looked vicious. I was on a flat plain and I started to run away. I saw a small mutamba tree and tried to climb up that tree but it was too small to hold me. A voice said to me, "If you refuse to obey my command, the dogs are evil spirits and they will destroy you. You have been prohibited from taking formal employment with effect from today. I will take care of you, so go and work in the field which I have shown you". I saw these words being written under my feet: "You shall not get formally employed any more but serve God".',
    ],
  },
  {
    number: 13,
    title: 'The Beautiful but Joyless City',
    paragraphs: [
      'I saw another vision of a very beautiful city with beautiful houses. Although the inhabitants of this city had beautiful houses and wealthy possessions, they were not happy and looked like bereaved people. A voice said, "These people you see are not happy at all despite their wealthy possessions and luxurious life because evil spirits are tormenting them, go and preach for them to be delivered."',
    ],
  },
  {
    number: 14,
    title: 'The Oxen, the Gully, and the Worms',
    paragraphs: [
      'Another vision I saw that night, was of my span of oxen pulling a plough. They got to a curve where they were trying to avoid a deep gully. The two in front managed to avoid the gully but the two at the back together with the plough fell into the gully. They pulled the ones in front and all fell into the deep gorge. They kept on moving and the plough started to unearth strange creatures in the gully which looked like worms.',
      'When the oxen pulled out of the gully they were transformed to men who were carrying bibles and preaching the word of God to the worms in the gully. I saw the worms being transformed to people who were tormented by evil spirits. Those who accepted the Word of God which was being preached were saved and given new lives. The sight of the tormented people was very touching that I almost wept but I was later relieved when I saw them rejoicing after they had accepted Christ. This gave me the determination to go and preach the Word of God and I am still looking forward to seeing people accepting Christ and become saved. At the end, I saw a river flowing with clear water. The people who had accepted Christ were brought to this river by the preachers of the Word and were baptized, and they came out of the river filled with joy. This is the command of God to all Christians: "Go into the entire world and preach the gospel to every creature. He who believes and is baptized will be saved, but he who does not believe will be condemned." Mark 16:15, 16.',
      'I heard the saved people singing the following song in Shona:',
    ],
    songs: [
      {
        columns: [
          ['Nyama yangu yateterera', 'Moyo wangu wafunga musha', 'Jerusalem rakanakisa', 'Uyu musha ndinochemera'],
        ],
      },
      {
        columns: [
          ['Moyo wangu wafunga', 'Jesu mubatsiri wangu', 'Moyo wangu wafunga', 'Jesu mubatsiri wangu uyu.'],
        ],
      },
    ],
  },
];

const journeyMilestones = [
  { year: '19XX', place: '[Place]', description: '[Description of this leg of the evangelism journey — to be provided.]' },
  { year: '19XX', place: '[Place]', description: '[Description of this leg of the evangelism journey — to be provided.]' },
  { year: '19XX', place: '[Place]', description: '[Description of this leg of the evangelism journey — to be provided.]' },
  { year: '19XX', place: '[Place]', description: '[Description of this leg of the evangelism journey — to be provided.]' },
];

function SongBlock({ song, index }) {
  const isTwoColumn = song.columns.length === 2;
  return (
    <div className="bg-blue-50 rounded-lg p-4 my-4">
      {isTwoColumn ? (
        <div className="grid grid-cols-2 gap-x-6 text-gray-700 italic">
          {song.columns[0].map((line, i) => (
            <div key={`a-${i}`} className="contents">
              <div>{line}</div>
              <div>{song.columns[1][i]}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-700 italic">
          {song.columns[0].map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function FounderPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Back link bar */}
      <div className="container mx-auto px-4 pt-8">
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
          <ArrowLeft className="mr-2" />
          Back to Home
        </Link>
      </div>

      {/* Hero / Intro */}
      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-white to-blue-50" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-200/40 blur-3xl -z-10" />
        <div className="absolute -bottom-32 -left-24 w-96 h-96 rounded-full bg-blue-100/50 blur-3xl -z-10" />

        <div className="container mx-auto px-4">
          <motion.div
            className="flex flex-col lg:flex-row items-center gap-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="lg:w-1/3 relative w-full h-[320px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/18.jpg"
                alt="Placeholder portrait — to be replaced with a real photo of Arch Bishop Loveless Manhango"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 33vw, 100vw"
              />
            </div>
            <div className="lg:w-2/3 text-center lg:text-left">
              <div className="inline-block px-3 py-1 mb-4 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full">
                Our Founder
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Arch Bishop <span className="text-blue-600">Loveless Manhango</span>
              </h1>
              <p className="text-gray-600 leading-relaxed">
                Founder of Bethesda Apostolic Church. In September 1952, over two nights, he was
                called by God through a voice and fourteen visions that set the course for the
                rest of his life.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Scripture banner */}
      <section className="bg-blue-600">
        <div className="container mx-auto px-4 py-10 max-w-3xl text-center">
          <p className="text-white/95 text-lg md:text-xl italic leading-relaxed">
            "Also, I heard the voice of the Lord, saying &lsquo;Whom shall I send and who will go
            for us?&rsquo; Then I said, &lsquo;Here am I, send me,&rsquo;"
          </p>
          <span className="block mt-3 text-blue-200 font-semibold not-italic tracking-wide">
            Isaiah 6:8
          </span>
        </div>
      </section>

      {/* The Calling */}
      <section className="section bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="section-title">
            <h2>The Calling</h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-4">
            In 1952, a white man named Eric and his brother John contracted Loveless Manhango to
            mould bricks on their farm in Chegutu (formerly Hartley). The farm was located 14
            kilometers from the town of Chegutu along the Bulawayo road. He had left home with a
            team of four people: Mr D. Marume, Mr T. Pise, Mr Shamu, and Ms Veronica Manhango.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            They camped on the farm in make-shift shelters. Every day after work, he went to a
            nearby beer hall to drink. He had completely forgotten about God and that God wanted
            him to worship Him. He was, in his own words, "now a sinner and an alcoholic who
            always wanted to cause trouble to other people through fist fighting."
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            On 20 September 1952, he visited the beer hall as usual after work and got totally
            drunk. After closing time, he returned to camp and slept. At midnight, while fast
            asleep, he heard a voice saying, "Worldly pleasure is temporary but heavenly life is
            eternal." He looked around to see where the voice was coming from, but there was no
            one with him in the makeshift room — he later learned it was an angel from God. After
            a while, he heard the same voice saying, "Look." He then saw the following visions,
            something akin to watching a television.
          </p>
        </div>
      </section>

      {/* 14 Visions */}
      <section className="section bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="section-title">
            <h2>The 14 Visions</h2>
            <p className="max-w-2xl mx-auto text-gray-600 mt-4">
              Across two nights, Arch Bishop Loveless Manhango saw fourteen visions. His account
              of each is below.
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-8">
            {visions.map((vision) => (
              <motion.div
                key={vision.number}
                className="bg-white rounded-2xl shadow-sm p-6 md:p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-shrink-0 bg-blue-100 text-blue-600 rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
                    {vision.number}
                  </div>
                  <h3 className="font-semibold text-gray-900 text-xl">{vision.title}</h3>
                </div>
                {vision.paragraphs.map((paragraph, i) => (
                  <p key={i} className="text-gray-600 leading-relaxed mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
                {vision.songs && vision.songs.map((song, i) => (
                  <SongBlock key={i} song={song} index={i} />
                ))}
              </motion.div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto mt-12 bg-white rounded-2xl shadow-sm p-6 md:p-8">
            <p className="text-gray-600 leading-relaxed mb-4">
              The above visions, together with many others revealed to him that night,
              strengthened his heart and inspired his spirit. He became convinced that God was
              sending him to preach the gospel. He did not know that many challenges,
              persecutions, and numerous other problems lay ahead. He climbed down the hill and
              went straight to his work place, and told his colleagues what he had experienced —
              and that he was quitting his job.
            </p>
            <p className="text-gray-600 leading-relaxed">
              They persuaded him to stay until the contract was finished, but he refused because
              he could feel the Holy Spirit urging him to preach and heal the sick. He went to
              the contractor, Mr Eric, and bade him and his workmates farewell, then returned
              home. "Those called by God forsake everything and commit themselves to do God’s
              work," he later wrote. "I have never been employed ever since and I am doing God’s
              work full time."
            </p>
          </div>
        </div>
      </section>

      {/* Evangelism Journeys */}
      <section className="section bg-white">
        <div className="container mx-auto px-4">
          <div className="section-title">
            <h2>Evangelism Journeys</h2>
            <p className="max-w-2xl mx-auto text-gray-600 mt-4">
              Following his calling, Arch Bishop Loveless Manhango carried the Gospel
              across these journeys.
            </p>
          </div>
          <PlaceholderNote className="mb-12 flex" />
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-blue-100 md:-translate-x-1/2" />
            <div className="space-y-12">
              {journeyMilestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  className={`relative flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-0 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-blue-600 rounded-full md:-translate-x-1/2 mt-1.5" />
                  <div className={`pl-12 md:pl-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div className="card p-6 inline-block text-left">
                      <div className="text-blue-600 font-semibold mb-1">
                        {milestone.year} &middot; {milestone.place}
                      </div>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
