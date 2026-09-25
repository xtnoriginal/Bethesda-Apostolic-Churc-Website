'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react';

const visions = [
  {
    number: 1,
    title: 'The Orchard and the Cloud of Blood',
    summary:
      'A vast orchard of beautiful fruit that is rotten inside, beneath a cloud of blood. The world looks healthy but is rotten with sin, and he is chosen to bring the cleansing blood of Christ to the people.',
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
    summary:
      'Two angels in shining white pierce his finger with a white rod. His sins are forgiven, and from that moment he hates drinking and sin.',
    paragraphs: [
      'In the second vision, I was visited by two men wearing shining white robes and they spoke to me. They were angels. I then saw a white rod with a red bottom end. One of the men (angel) took the rod and pierced my finger with it. A severe pain went through my whole body and a lot of water like sweat came out of my body. The voice said "Your sins are forgiven, do not sin again". From that moment, I started to hate drinking beer and sin.',
    ],
  },
  {
    number: 3,
    title: 'The Two White Bulls',
    summary:
      'Two snow-white bulls enter his body, representing the Holy Spirit with the power to perform miracles and the power to persevere in preaching the gospel.',
    paragraphs: [
      'In the third vision, I saw two huge snow-white bulls charging towards me powerfully and they entered into my body. I felt great power flowing in my body and could not control myself. I felt an urge to speak and heard myself speaking in tongues and prophesying. One of the angels spoke to me and said: "The first bull is the Holy Spirit and power to perform miracles and the second bull is the power to persevere in preaching the gospel of Jesus Christ. You have been given these gifts".',
      'God was fulfilling his promise as is written in Acts 2:17, "And it shall come to pass in the last days, says God, That I will pour out my Spirit on all flesh, your sons and daughters shall prophesy, your young men shall see visions, and your old men shall dream dreams".',
      'Filled with the Holy Spirit, I left my tent and went to the nearby earth mounts called Mitoro around 0300hrs in the morning. These hills were formed because of the mining activities which were carried out on the farm. I prayed strongly and continued to see the following visions.',
    ],
  },
  {
    number: 4,
    title: 'The Two Bodies — Earthly and Spiritual',
    summary:
      'Every person has an earthly body and a spiritual body. Sin leaves black marks on the spiritual body, and at judgment those marks turn to fire.',
    paragraphs: [
      'It was revealed to me that every person has two bodies, the earthly body and the heavenly spiritual body. The spiritual body of a sinner is pitch black, and the spiritual body of a saint is as white as snow. If a Christian commits a sin on earth, a black mark is put on his spiritual body in heaven. These marks increase as the person continues to sin. I saw many Christians worshipping God, but their spiritual bodies had black marks indicating that they continued to sin whilst in the church. All is naked to Him whom we must give account. I kept looking at this vision and saw God’s judgment coming. The black marks transformed and became hot flames of fire. I heard people crying because of the intense heat which was burning their bodies. I heard a voice saying "When God’s judgment comes, people will not be asked to give account of what they did or why, but their deeds will follow them and they will be judged accordingly".',
      'I felt sorry for the people who were crying. The works of all church goers will be brought to light and the hypocrites will be brought to justice. In 2 Corinthians 5:10, God’s Word says "For we must appear before the judgment seat of Christ, that each one may receive the things done in the body, according to what he has done, whether good or bad".',
    ],
  },
  {
    number: 5,
    title: 'The Pool of Boiling Water',
    summary:
      'The devil and all his agents are punished without rest or mercy in a great pool of boiling water.',
    paragraphs: [
      'I saw in a vision a big pool of boiling water and inside the pool was the devil and all his agents being punished without any rest or mercy.',
    ],
  },
  {
    number: 6,
    title: 'The Pit Being Dug for Sinners',
    summary:
      'A great pit is being dug, and a voice says it is being made for sinners.',
    paragraphs: [
      'In another vision, I saw a very big pit being dug and I heard a voice saying, "This pit is being made for sinners. This is where they will end". While I was wondering how the sinners will be identified, I saw the following vision:',
    ],
  },
  {
    number: 7,
    title: 'The Multitude at the Pit of Fire',
    summary:
      'Sinners are carried by their own deeds into a pit of fire, while the righteous, washed in the blood of the Lamb, grow wings and are welcomed into heaven.',
    paragraphs: [
      'A multitude of people were standing like cattle at a market place. In front of the people was a very deep pit and inside the pit I could hear flames of roaring fire. I saw sinners heading towards the pit like cattle moving towards a dip tank. When they got closer to the pit, their road ended. Their deeds were displayed on their bodies.',
      'Thieves were standing with all that they had stolen, and adulterers with all the persons they had committed adultery with, witches with the people they had killed, and the blood of those people was flowing all over the witches’ bodies. Alcoholics were swimming in pools of beer. When sinners reached the edge of the pit of roaring fire, their deeds turned to fire burning their bodies, and a strong power threw them into the pit where there was moaning and gnashing of teeth. A voice said, "That is the judgment of sinners, they are not asked to give an account of what they did, but their deeds follow them".',
      'I also saw the righteous with their bodies bathed in the blood of the Lamb entering by the same gate. Works of love, mercy and righteousness clothed their bodies. When they got to the doorway overlooking the pit of roaring fire, their bodies grew wings because of their good deeds. They got power to become angels and flew to the place of peace and tranquility in heaven. I heard very pacifying voices and sounds coming from that place, and a voice saying, "That is the sound of angels welcoming those who conquered the world and the beast".',
    ],
  },
  {
    number: 8,
    title: 'The Cloud of Aborted Souls',
    summary:
      'A cloud from the east is filled with the praises of souls taken from the earth before they could sin, and the women who aborted them walk in pools of blood.',
    paragraphs: [
      'In my eighth vision, I saw a cloud from the eastern side of the sky, and I heard a lot of noise coming from it. While I was still wondering what this sound was all about, a voice said, "This is the blood of fetal abortions carried out on earth, praising God because their souls were taken away from earth before committing sins. They are the Cherubins and Seraphims of God." I saw many women walking in pools of blood, with their feet covered by this blood. A voice said, "These are the women who committed abortions and are guilty of murder and will be judged accordingly".',
    ],
  },
  {
    number: 9,
    title: 'The New Earth and the New Jerusalem',
    summary:
      'A new earth full of righteousness and peace, and the New Jerusalem lit by the Lamb of God, filled with songs of praise in Shona.',
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
    summary:
      'Guinea fowls compete over the beauty of their spots, a picture of power-hungry churches that are far from God. He is told to go and work in God’s field.',
    paragraphs: [
      'In another vision, I saw guinea fowls. Their spots were beautiful and a marvel to look at. They were fighting and trying to outdo each other with the beauty of their spots, and a voice said, "What you have seen is what some people in different churches are doing today. They are selfish worshippers who are power hungry and greedy in their hearts and are far from God. They just keep records and registers like burial societies but are not doing the will of God. You have been chosen to work in God’s field. Go henceforth". I became convinced that this was coming from God and He wanted me to work for Him. At the same time, I became worried as to how I was going to begin and wondered who would listen to me.',
    ],
  },
  {
    number: 11,
    title: 'The Swarm of Bees',
    summary:
      'A swarm of bees shows the multitude who will follow him in God’s work, and warns that some will turn and sting him.',
    paragraphs: [
      'While I was thinking about this, I saw a vision of a swarm of bees coming to me and the voice said, "Have you seen all those bees? That is a reflection of the multitude of people who will follow you and assist you in God’s work. But some of them will turn against you and sting you like bees".',
    ],
  },
  {
    number: 12,
    title: 'The Man in White and the Dogs',
    summary:
      'A man in white leads a pack of vicious dogs, which are evil spirits. He is forbidden from formal employment and told to serve God full time.',
    paragraphs: [
      'I thought this was a difficult and impossible task to accomplish. As I pondered about this, I saw a vision of a man wearing white clothes and numerous dogs following him. I became frightened because the dogs looked vicious. I was on a flat plain and I started to run away. I saw a small mutamba tree and tried to climb up that tree but it was too small to hold me. A voice said to me, "If you refuse to obey my command, the dogs are evil spirits and they will destroy you. You have been prohibited from taking formal employment with effect from today. I will take care of you, so go and work in the field which I have shown you". I saw these words being written under my feet: "You shall not get formally employed any more but serve God".',
    ],
  },
  {
    number: 13,
    title: 'The Beautiful but Joyless City',
    summary:
      'A wealthy, beautiful city whose people are tormented by evil spirits. He is told to go and preach for them to be delivered.',
    paragraphs: [
      'I saw another vision of a very beautiful city with beautiful houses. Although the inhabitants of this city had beautiful houses and wealthy possessions, they were not happy and looked like bereaved people. A voice said, "These people you see are not happy at all despite their wealthy possessions and luxurious life because evil spirits are tormenting them, go and preach for them to be delivered."',
    ],
  },
  {
    number: 14,
    title: 'The Oxen, the Gully, and the Worms',
    summary:
      'His oxen fall into a gully and become preachers. The worms they unearth become people who are saved and baptized in a clear river.',
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

const journeys = [
  {
    number: 1,
    title: 'My Journey to Zaka',
    summary:
      'With five companions he travels via Bulawayo to Chivingwe. A blind boy is healed, the local Dutch Reformed leader and his family are baptized, and 170 converts found the church in Zaka District.',
    date: 'September 1966',
    route: 'Chiwiriri → Bulawayo → Masvingo → Chivingwe, Zaka',
    paragraphs: [
      'In September 1966, I made the journey to Zaka via Bulawayo with John Muroyi, Abel Matundu, Mrs G Samkange, Mrs Musuna and Mr Nhira. We left Chiwiriri and headed for Bulawayo and we preached the gospel and prayed for the sick all the way. We stayed in Bulawayo for a few days, preaching, casting out demons and healing the sick. We later left Bulawayo and went to Masvingo, proceeding to Chivingwe School which is near Jichidza Mission. At this school was a teacher who came from our home area and his name was Nathan Murwira. The Dutch Reformed Church was running Chivingwe School and Nathan had sent me a message that the people from this area were hungry for the Word of God.',
      'We were warmly received by Nathan but he was afraid of the Dutch authorities at the school since our presence could put his job in jeopardy. The following morning, Nathan took us to the local Dutch Church and introduced us to the church elders saying, "This man, Loveless Manhango is a prophet sent by God to heal the sick and cast out demons in the name of Jesus Christ. Those who want to be prayed for can come to him at no cost."',
      'We erected some makeshift tents outside the school yard and a large number of people came for our evening service that day. We preached the gospel of Christ and many people accepted Jesus Christ as their Saviour. We laid our hands on the sick and a lot of miracles were performed in Jesus Christ’s name and many people were healed. The leader of the Dutch Reformed Church, Mr. Lazarus Mudzamatira brought his son Rutsatse Mudzamatira who had become blind and was no longer going to school. His father had visited many hospitals with him but his sight had not been restored. I prayed for him in the name of Jesus Christ and he was healed. When Mr. Mudzamatira saw that his son had been healed, he asked his whole family to join us but he could not leave the Dutch Reformed Church since he was the local leader.',
      'I told him that we do not pray to become church leaders but to receive Christ together with our families. His church had failed to deliver his son but it was only Jesus who could heal the sick. He later accepted Jesus Christ and was baptized together with his family. We later established a branch at his home and he became our leader in the whole of Zaka district till his death. His son Rutsatse Mudzamatira is now a priest in our church.',
      'A young girl named Shingairai was brought to me by her parents. She had stomach problems as a result of sorcery. I prayed for her in Jesus’ name and she was healed. She gave her testimony in front of the people that she was indeed healed.',
      'A certain elderly woman, Mrs. Marume, was brought to me. She was blind and her legs were weak. I prayed for her and her sight was restored the following morning and her legs became strong.',
      'Our makeshift tents were just across the confluence of two rivers and this was a convenient place for us to pray and do God’s work. We baptized all the people who accepted Christ and taught them how to live according to God’s commandments. They were one hundred and seventy converts in total and that marked the establishment of our church in Zaka District.',
      'We stayed for some time and it was difficult for us to find enough food but we thank Mr. Murwira who did all he could to feed us. He was rearing some chickens and he slaughtered them for us until they were all finished. He later gave us a sheep for meat and his wife was very caring and prepared all our food with love and care. She had real interest in God’s Word. We later returned to Chiwiriri to prepare for the next convention which we held in October 1966.',
    ],
  },
  {
    number: 2,
    title: 'My Journey to Svuure, Zaka',
    summary:
      'He returns alone to strengthen the new believers and walks for two days to Svuure, where a branch is founded. With no bus fare home, strangers on a bus pay his way back to Chiwiriri.',
    date: 'Late October 1966',
    route: 'Chivingwe → Svuure → Jerera → Ndanga → Chivhu → Chiwiriri',
    paragraphs: [
      'After our October 1966 Convention at Chiwiriri Headquarters, Chikomba, I became concerned about the new believers we had left at Chivingwe, Zaka the previous month. Chivingwe Centre is about 50 km east of Masvingo. Although we had stayed with them for more than a week preaching the gospel to them, teaching them and praying for them, they needed to be strengthened and encouraged in faith. They also needed leaders to guide them.',
      'I needed rest and there were more pressing issues at the Headquarters but these new believers, who had shown great zeal for the Lord, were my greatest concern. At the end of October, I made the journey alone. I arrived at Chivingwe School Zaka. The believers there were very happy to see me and they gave me a great welcome. When people in the surrounding area heard that I had come, they brought their sick people and those possessed by evil spirits for healing. I preached the gospel to them and prayed for them in the name of Jesus Christ and they were delivered. I then ordained leaders to look after them.',
      'Meanwhile, the works of God we did among them during our first journey had spread to far places like Jerera Growth Point which is 60 km away. A number of people of Svuure Township, about 50 km on the way to Jerera had pleaded with the Chivingwe believers that on my return I was to visit them without fail. They needed help and they had heard that people were being saved and healed.',
      'I was eager to go but the major challenge was that I had left home with money for bus fare only. I had not been able to get money for my food. During this period, people in the indigenous churches preached that God had freely given the Holy Spirit so people were not supposed to contribute money in the church. Hence the missionary journeys which I undertook were financed by proceeds from my fields and vegetable garden. Sometimes, I left my family with no food.',
      'The people from Chivingwe were so poor that they were not able to help me with finances. I travelled the journey to Svuure on foot. They chose eight people who accompanied me. These people had no money to fend for themselves on the way but that was not a deterrent to them. Since it was summer and very hot during the day, we started our journey late in the afternoon. We spent the whole night walking and by dawn we were nearly halfway. After resting for some hours, we could not continue with our journey because we were very hungry. I was forced to use the money I had reserved for my bus fare back home. I used some of the money to buy food for myself and those who were with me. After eating, we continued with our journey.',
      'We rested again by the roadside and we all fell asleep. People who passed by thought we were dead since this area had already been affected by the liberation war. It took us two days to reach our destination since our pace was retarded by exhaustion and hunger. But God gave us strength to reach our destination. Since word had reached them that we were coming, we found many people waiting for us.',
      'Because we were very tired, we rested a bit while food was being prepared for us. What followed was a wonderful church service. I preached Jesus Christ to them, prayed for them and prophesied. Many people accepted the Lord as their Saviour and I baptized them. I taught them church principles and how to continue in the Word of God. That is how our Svuure Branch was established. After my work at Svuure, we went to Jerera where I bade farewell to the Chivingwe group and I told them I was going back home. I did not tell them that I did not have enough money since I knew they could not help me. In fact, they also needed money to buy food on their way back home. I decided to walk to Ndanga which is about 35 km from Jerera. I walked for the whole day and I became very hungry. My feet became sore and my body weak. I rested by the roadside and prayed to God asking Him to help me.',
      'When I woke up it was nearly dark. I could not walk because of hunger. While preparing for a place to sleep by the roadside, I saw a wild mutamba tree with two or three ripe fruits. I ate the fruit swallowing the seeds. I got a bit of strength and started to walk again although it was now dark.',
      'I reached a homestead which was near the main road. I narrated my story to the owners of the homestead. They received me well into their house. Unfortunately, they had finished their supper and they had no food to give me. They offered me a room to sleep. In the morning, they prepared breakfast for me. I thanked them and continued with my journey. I walked for some hours. My legs became painful and my feet had developed blisters. My kidneys felt as though they were now swollen. I kept on walking until I was dragging my legs. I was determined not to stop because though rest would help me, it would be difficult to continue again.',
      'Although I did not know the area, sometimes I used short-cuts. When I got to the road, I saw a lorry heading to Ndanga. I asked for transport to the nearest township. They agreed and I paid two and a half cents for the journey. I went into a shop and bought food for ten cents. A car took me to Ndanga and I paid fifty cents for the journey. After buying more food at Ndanga, I had twenty cents left to take me to Harare which is about three hundred kilometers from Ndanga. I decided to go through Harare because the Holy Spirit had revealed to me that the Church in Harare was facing challenges which needed urgent attention. I had twenty cents, my blanket which was still new and a sleeping tent. I took my blanket and tent and offered them to the bus conductor in settlement of my bus fare to Harare although they were worth more than the bus fare required. I narrated my plight to him and he believed me and was moved by my story.',
      'The conductor told me to keep my blanket and tent. He agreed to take me to Harare without paying and I praised God for His grace and mercy. When we arrived in Chivhu, the conductor told me that it was now difficult for him to take me to Harare without a ticket for he feared that if we met their inspector, he could lose his job. I thanked him.',
      'Since I had no means of transport to go to Harare, I decided to go home which is about 100 km from Chivhu but had no bus fare. I approached a Rutendo bus which plied our Chivhu–Shumba route and passed through my village. I asked the conductor to take my blanket for my bus fare or allow me to pay him when I reached home. I explained to him why I had gone to Zaka and how I had travelled from Zaka to Chivhu.',
      'A certain lady by the name of Phoebe Mudimu, who lives in our rural area, listened to my story. She felt sorry for me and gave me twenty cents. Other passengers in the bus gave what they could and the money came to two dollars and fifty cents. I paid my bus fare to Chiwiriri and bought a few groceries for my family with the change. When I reached home, I thanked God for the wonderful work the Holy Spirit had demonstrated in Zaka and how God had provided for all my needs along the trip. God wants us to take His Word to the four corners of the world and He always provides the means.',
    ],
  },
  {
    number: 3,
    title: 'My Journey to Melsetter (Chimanimani)',
    summary:
      'Sent by the Holy Spirit into lion country near the Mozambique border, he is taken in by Chief Chikukwa after the chief dreams of him. The chief’s people and more than a hundred at Musapa Mission give their lives to Christ.',
    date: '1969',
    route: 'Deedzo, Hwedza → Rukweza → Nyazura → Mutare → Chimanimani → Nyatsoma → Bulawayo → Harare',
    paragraphs: [
      'In 1969, the Holy Spirit instructed me to go and pray in the mountains of Nyatsoma. These mountains are situated in Manicaland Province near the border with Mozambique. I prepared for the journey and advised my brethren in Christ and they organized a group of people to accompany me. I left home with thirty people and we walked towards Deedzo Mountain in Hwedza. While we were praying in this mountain, God revealed to me several visions about future events. One of the visions which I saw was the intensification of the liberation struggle and how it was going to end with the black majority coming into power. While we were up on this mountain, we had problems getting enough food for we were many. We were however assisted by followers of Johanne Marange.',
      'The rest of the people returned home except Mrs. Samkange and Mrs. Moyo who were going to Harare. The three of us left Deedzo and walked to Gurure near Rukweza Township. We wanted to see one of our church members, Mrs. Mutikani who was staying at her husband’s workplace. She welcomed us and gave us food. I told her that the Holy Spirit had instructed me to go and pray in the Nyatsoma Mountains. Mrs. Mutikani said, "What do you think you will gain by going to such a frightening place to pray? I know your family and your life is respectful and decent, why do you want to endanger your life?" One other man, who was there in the shop, said "Nyatsoma is a frightening place; you will be devoured by lions. You cannot go to Nyatsoma and come back alive. You will not come back!"',
      'When Mr. Mutikani heard this, he begged me not to go, and when he saw that I was determined, he wept. However, because I knew that the Holy Spirit had sent me, I was not afraid and was eager to go. I was convinced that since God had sent me, He would also look after me even if this place was infested with lions.',
      'We left Rukweza and headed for Nyazura. When we got to Nyazura the two women Mrs. Samkange and Mrs. Moyo left for Harare and I proceeded to Mutare. I did not know anyone in Mutare neither did I know where I was going. I became worried and wondered what I was going to do. While I was still wondering, the Holy Spirit said to me, "Go and board a bus belonging to B & C Company and pay twenty-five cents". I saw a B & C bus, and boarded the bus and paid the money. When I received my ticket, it was written "Melsetter" as the destination. I stayed on the bus until I got to Melsetter (Chimanimani).',
      'The area was scenic but frightening. It was full of mountains decorated with thick forests. When I got off the bus I did not know what to do next or where to go. I remained standing for some time like a lost child. At that time, Chimanimani was still a very small township. Whilst I was still standing wondering where to go, I saw a Police Officer coming towards me, and he greeted me but I did not recognize him. He asked me to follow him to the camp. I thought he had suspected me of something and wanted to arrest me. I could not refuse and I followed him. When we got to the camp, we went to his house. He then asked me if I had recognized him and I told him that I had not. He then introduced himself as Caston Taderera who came from my home area and he had received Christ when he was in Bulawayo. I was greatly relieved and happy that I had found a relative in such a distant place. I stayed at his house for one and a half days and realized that my money was no longer sufficient for the journey. I asked him to call Shakespeare Samkange in Harare and ask him to send me money by telegram. He responded accordingly on receiving the message. On the second day, the Holy Spirit said to me "Rise up and go to Nyatsoma where I sent you."',
      'As I highlighted earlier, Nyatsoma Mountains are near the border with Mozambique, and at that time, this area was under Chief Chikukwa. Before leaving Chimanimani, I went into a shop and bought some bread, margarine and a bottle of sterilized milk. I walked for quite a distance heading towards the Nyatsoma Mountains. The place was frightening because it had very dense and dark forests. I could only hear the sound of wild animals and birds. I did not meet any person and the warnings I had been given in Mr. Mutikani’s shop in Nyazura that I would be devoured by lions came back into my mind.',
      'When fear seemed to get the better of me, I placed my blanket and food on the ground and knelt down and prayed "Father, remove fear from me. Be with me to the end. If you leave me I will become frightened. Amen!" Tears rolled down my cheeks and I felt stronger and was much encouraged. I felt like I was not alone and I knew that the Lord Christ was with me. I started walking and got to a major road. A small car with three men was approaching. I stopped it and one of the three men asked me in one of the local dialects known as Ndau, "Where do you come from?" And I answered "Harare".',
      'They said "Where are you going?", and I answered "To Chief Chikukwa’s place". They asked me "What do you want there?" And I replied, "I have been sent by God". They asked me again, "Do you know his place?" and I said, "No". They kept on asking me, "Have you ever travelled around this place before?" and one of them said "Do not bother him".',
      'They asked me to get into the car and we travelled for a short distance. They stopped the car and said, "Now follow that path; it will lead you to Chief Chikukwa’s homestead."',
      'The sun was about to set and the three men felt compassion for me because they said that I still had a long distance to travel to reach Chief Chikukwa’s homestead. I walked briskly but it got dark while I was still in the wilderness full of lions and other wild animals. I kept thinking about the warning I had been given earlier that I was going to be ravaged by lions. The men in Nyazura had said that if I returned alive I was to inform them.',
      'I became very frightened and I began to sing the following song:',
    ],
    songs: [
      {
        columns: [
          [
            'Garai neni izuva radoka',
            'Rima rinosvika gara neni',
            'Vamwe vayamuri vakatadza',
            'Ishe muyamuri gara neni',
            'Handitye kana uri pedyo',
            'Nhamo hairemi handichemi',
            'Handine nhamo naiko kufa',
            'Ndinokunda kana ugere neni',
          ],
        ],
        translation:
          'Lord be with me, it’s getting dark and I am afraid. Others have failed to help me. When you are with me, I am not afraid of anything. Lord my helper, help me.',
      },
    ],
    closingParagraphs: [
      'I resumed walking and my feet had become sore and painful. I came to a stream and I saw a house that was on the other side of the stream. In the nearby field was a man and I asked him the way to the Chief’s house. He asked me what I wanted at the Chief’s house and I told him that the Lord had sent me to him. He was not satisfied with my explanation so he asked me to come with him to the house but he did not tell me that he was the Chief. I got there and stayed outside the yard as was customary and when he came out, he directed me to a makeshift hut that was not far away from his house.',
      'He sent two children with food and we ate the food together, then they went back to the house after the meal. I spread my tent, leaned against the wall of the hut and covered myself with my blanket. The moon was shining and the sky was clear but because I was not in a real hut I got so cold that I could hardly sleep. Around midnight I heard the Chief calling me. "Hey man, it’s me the Chief calling you".',
      'I wondered why he was calling me at such a time. He asked me to come to the house and I went with him. When we got into his house, he asked me where I had come from and I told him that I came from Charter (Chivhu) which is not far away from Harare. The Chief said that he had once gone to Salisbury by plane on government business. He then asked me why I had come to see him. I explained to him how the Holy Spirit had sent me and I said: "God is saying you have left His paths. Have you forgotten that He is the one who made you Chief?" He agreed that indeed God had made him Chief when it was not his turn for chieftainship. He asked, "What does God want me to do?". I told him to seek God’s ways and I preached the gospel of Christ to him. The Chief narrated that before he called me to his house, he had had a dream. He saw in the dream people clothed in white standing right round his home. He then heard a voice saying, "Why have you left my servant outside your house?" That was the reason why the chief had come to take me in the middle of the night. He then prepared a bed for me in his house and I had a comfortable sleep the rest of the night.',
      'The following morning, he called all his subjects to his home and he sat on his throne. He gave me the platform to preach to his people. I began with Genesis Chapter three, highlighting how people had sinned before God and how He had sent Jesus Christ to save them. All the people listened attentively and even the chief’s wife received Jesus Christ that day. The Chief took me to the local Methodist Church at Musapa Mission. They asked me to take charge of the service and I preached to them. More than one hundred people came forward crying and confessing their sins and gave their lives to Christ and were saved.',
      'On the following day, I bade the chief farewell and he together with a few others accompanied me for some reasonable distance and returned. I continued with my journey and walked again until I got to Chimanimani. I was supposed to go to Chiredzi but could not because my money was not enough. I telephoned Shakespeare again and he promised to send me fourteen dollars. Caston Taderera gave me the money in advance and I left Chimanimani aboard a "Blue Line" bus that took me to Birchenough Bridge. When I got there, I could not find a place to sleep so I went and slept on a shop veranda. It started to rain and a certain man and woman came to this veranda, fondling each other. I took my blanket, moved away from the veranda and stood off in the rain because I did not want to witness these two people sinning right in my presence.',
      'I got into the train heading for Bulawayo the following day. When we got to Imbizo, we had to disembark for a while, because the train was going to Maputo. Imbizo is near Chiredzi and on that day there were strong and cold winds. It became so cold that I felt as if I had no clothes on my body at all. I covered myself up with my blanket but that did not help. My whole body was cold and I started shivering terribly. I tried to stand up and lean against a tree but I failed. Someone helped me to lean against the tree which was nearby. When the train arrived, he said, "Be strong, stand up and let us walk to the train". We arrived in Bulawayo but my body was still very cold. Our brethren in Christ gave me some tea and I had a warm bath. However, I could still feel the cold. I started to feel better after three days.',
      'I phoned Shakespeare Samkange and he asked me to come to Harare. When I got there, I narrated what had transpired during my journey. When Shakespeare heard my story, he wept and said "I fear God and I thank Him for His guidance". I later departed and went home to Chiwiriri.',
    ],
  },
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
      {song.translation && (
        <p className="mt-4 pt-4 border-t border-blue-100 text-gray-600 text-sm">
          <span className="font-semibold text-gray-700">In English: </span>
          &ldquo;{song.translation}&rdquo;
        </p>
      )}
    </div>
  );
}

function ExpandableCard({ number, eyebrow, title, meta, summary, className = '', children }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <motion.div
      className={`rounded-2xl shadow-sm p-6 md:p-8 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 bg-blue-100 text-blue-600 rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
          {number}
        </div>
        <div className="min-w-0">
          {eyebrow && <div className="text-blue-600 font-semibold text-sm">{eyebrow}</div>}
          <h3 className="font-semibold text-gray-900 text-xl">{title}</h3>
          {meta && <p className="text-sm text-gray-500 mt-1">{meta}</p>}
        </div>
      </div>

      {!open && <p className="text-gray-600 leading-relaxed mt-4">{summary}</p>}

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
      >
        {open ? 'Show less' : 'Read full account'}
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
    </motion.div>
  );
}

function Paragraphs({ items }) {
  return items.map((paragraph, i) => (
    <p key={i} className="text-gray-600 leading-relaxed mb-4 last:mb-0">
      {paragraph}
    </p>
  ));
}

const tabs = [
  { id: 'calling', label: 'The Calling' },
  { id: 'statement-of-faith', label: 'Statement of Faith' },
  { id: 'journeys', label: 'Missionary Journeys' },
];

function NextTabButton({ tabId, onSelect }) {
  const tab = tabs.find((t) => t.id === tabId);
  return (
    <div className="max-w-3xl mx-auto mt-12 flex justify-end">
      <button
        type="button"
        onClick={() => onSelect(tabId)}
        className="inline-flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-800 transition-colors"
      >
        Continue: {tab.label}
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}

export default function FounderPage() {
  const [activeTab, setActiveTab] = useState('calling');
  const tabBarRef = useRef(null);

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.slice(1);
      if (!tabs.some((t) => t.id === hash)) return;
      setActiveTab(hash);
      const section = tabBarRef.current?.parentElement;
      if (section) window.scrollTo({ top: section.offsetTop - 56 });
    };
    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  const selectTab = useCallback((id) => {
    setActiveTab(id);
    window.history.replaceState(null, '', `#${id}`);
    const bar = tabBarRef.current;
    if (bar) {
      // Bring the start of the new tab into view when the reader is further down the page.
      const offset = 56;
      const top = bar.parentElement.offsetTop - offset;
      if (window.scrollY > top) window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

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

      {/* Section tabs */}
      <div>
        <nav
          ref={tabBarRef}
          aria-label="Founder page sections"
          className="sticky top-14 z-40 bg-white/95 backdrop-blur border-b border-gray-200"
        >
          <div className="container mx-auto px-4">
            <div role="tablist" className="flex justify-start md:justify-center gap-1 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-selected={activeTab === tab.id}
                  aria-controls={`panel-${tab.id}`}
                  onClick={() => selectTab(tab.id)}
                  className={`whitespace-nowrap px-4 py-4 text-sm md:text-base font-semibold border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </nav>

      {/* The Calling */}
      {activeTab === 'calling' && (
      <section id="panel-calling" role="tabpanel" aria-labelledby="tab-calling" className="section bg-white">
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
          <NextTabButton tabId="statement-of-faith" onSelect={selectTab} />
        </div>
      </section>
      )}

      {/* Statement of Faith — the 14 Visions */}
      {activeTab === 'statement-of-faith' && (
      <section id="panel-statement-of-faith" role="tabpanel" aria-labelledby="tab-statement-of-faith" className="section bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="section-title">
            <div className="w-fit mx-auto px-3 py-1 mb-3 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full">
              Our Statement of Faith
            </div>
            <h2>The 14 Visions</h2>
            <p className="max-w-2xl mx-auto text-gray-600 mt-4">
              Across two nights in September 1952, Arch Bishop Loveless Manhango saw fourteen
              visions. Together they form the Statement of Faith of Bethesda Apostolic Church.
              His account of each is below — open any vision to read it in full.
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-8">
            {visions.map((vision) => (
              <ExpandableCard
                key={vision.number}
                number={vision.number}
                title={vision.title}
                summary={vision.summary}
                className="bg-white"
              >
                <Paragraphs items={vision.paragraphs} />
                {vision.songs && vision.songs.map((song, i) => (
                  <SongBlock key={i} song={song} index={i} />
                ))}
              </ExpandableCard>
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
          <NextTabButton tabId="journeys" onSelect={selectTab} />
        </div>
      </section>
      )}

      {/* Missionary Journeys */}
      {activeTab === 'journeys' && (
      <section id="panel-journeys" role="tabpanel" aria-labelledby="tab-journeys" className="section bg-white">
        <div className="container mx-auto px-4">
          <div className="section-title">
            <h2>Missionary Journeys</h2>
            <p className="max-w-2xl mx-auto text-gray-600 mt-4">
              Three of the most difficult journeys Arch Bishop Loveless Manhango made to plant
              the church across Zimbabwe, in his own words.
            </p>
          </div>

          <div className="max-w-3xl mx-auto mb-12">
            <blockquote className="border-l-4 border-blue-600 bg-blue-50 rounded-r-lg px-6 py-4 mb-8">
              <p className="text-gray-700 italic leading-relaxed">
                "And He said to them, &lsquo;Go into the entire world and preach the gospel to
                every creature. He who believes and is baptized will be saved; but he who does
                not believe will be condemned.&rsquo;"
              </p>
              <span className="block mt-2 text-blue-600 font-semibold text-sm">Mark 16:15-16</span>
            </blockquote>
            <p className="text-gray-600 leading-relaxed mb-4">
              "It was not easy for the church to be established in Zimbabwe with branches all
              over the country. I had to commit myself to walking long distances on foot because
              if you want to get people saved, you have to go where they are and not for them to
              visit you. Wherever I went, people gave themselves to the Lord and were baptized.
              They in turn spread the Word and more people joined the Church when they came
              seeking for deliverance. Sometimes the Holy Spirit sent me to people who were sick
              or needed deliverance. At other times, I was invited by people some who were near
              and others far away. I accepted their invitations because I was eager to spread the
              Word of God and to see people saved.
            </p>
            <p className="text-gray-600 leading-relaxed">
              My major challenge was finding enough money for travelling since the Church was
              still small and not yet well established. Most people were rural peasants who could
              not afford to support me. I was forced to sell some of my agricultural produce to
              raise bus fare. Some brethren such as the late Shakespeare Samkange helped me with
              financial support as the Lord blessed them. Some journeys were unbearable because of
              lack of enough funds and so I would travel on foot for very long distances sometimes
              in thick dark forests which were frightening. I went on missionary journeys all over
              Zimbabwe. I will give account of the three most difficult trips that I made."
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-8">
            {journeys.map((journey) => (
              <ExpandableCard
                key={journey.number}
                number={journey.number}
                eyebrow={journey.date}
                title={journey.title}
                meta={journey.route}
                summary={journey.summary}
                className="bg-gray-50"
              >
                <Paragraphs items={journey.paragraphs} />
                {journey.songs && journey.songs.map((song, i) => (
                  <SongBlock key={i} song={song} index={i} />
                ))}
                {journey.closingParagraphs && <Paragraphs items={journey.closingParagraphs} />}
              </ExpandableCard>
            ))}
          </div>

          <div className="max-w-3xl mx-auto mt-12 text-center">
            <p className="text-gray-700 text-lg italic leading-relaxed">
              "It was journeys like these that strengthened the church. I hope God will keep the
              same spirit of determination within Bethesda Apostolic Church."
            </p>
          </div>
        </div>
      </section>
      )}
      </div>
    </div>
  );
}
