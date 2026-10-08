'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { CalendarDays, Check, Landmark, Target, Users } from 'lucide-react';

// Renders a church wing's page from its `content` object in src/data
// (see src/data/bcu.js for the shape). Sections with no data are skipped,
// so other wings can be filled in gradually.

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

function Section({ title, icon: Icon, children, className = '' }) {
  return (
    <motion.section {...reveal} className={`mb-16 ${className}`}>
      <h2 className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        {Icon && <Icon className="w-7 h-7 text-blue-600 shrink-0" aria-hidden="true" />}
        {title}
      </h2>
      {children}
    </motion.section>
  );
}

function Timeline({ items }) {
  return (
    <ol className="relative border-l-2 border-blue-100 ml-2 space-y-6">
      {items.map((item, i) => (
        <li key={i} className="pl-6 relative">
          <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-blue-600 ring-4 ring-white" />
          <div className="text-sm font-semibold text-blue-700 mb-1">{item.date}</div>
          <p className="text-gray-700 leading-relaxed">{item.text}</p>
        </li>
      ))}
    </ol>
  );
}

function CheckList({ items }) {
  return (
    <ul className="grid sm:grid-cols-2 gap-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 bg-white rounded-lg p-4 shadow-sm">
          <Check className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" aria-hidden="true" />
          <span className="text-gray-700">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function MinistryContent({ ministry }) {
  const c = ministry.content;

  return (
    <div>
      {/* Intro + motto + values */}
      <motion.section {...reveal} className="grid lg:grid-cols-3 gap-8 mb-16">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            About {ministry.fullName || ministry.name}
          </h2>
          {c.about?.map((p, i) => (
            <p key={i} className="text-gray-700 leading-relaxed mb-4 last:mb-0">
              {p}
            </p>
          ))}
        </div>
        <div className="bg-blue-600 text-white rounded-xl shadow-lg p-6 md:p-8 flex flex-col">
          {c.motto && (
            <div className="mb-6">
              <div className="text-sm uppercase tracking-wide text-blue-100 mb-1">Motto</div>
              <div className="text-3xl font-bold">&ldquo;{c.motto.text}&rdquo;</div>
              {c.motto.translation && <div className="text-blue-100 mt-1">{c.motto.translation}</div>}
            </div>
          )}
          {c.values?.length > 0 && (
            <div>
              <div className="text-sm uppercase tracking-wide text-blue-100 mb-3">Cherished Values</div>
              <ul className="space-y-2">
                {c.values.map((v) => (
                  <li key={v} className="flex items-center gap-2 font-medium">
                    <Check className="w-5 h-5 shrink-0" aria-hidden="true" /> {v}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </motion.section>

      {c.calendar?.length > 0 && (
        <Section title="Annual Calendar" icon={CalendarDays}>
          <div className="grid md:grid-cols-3 gap-4">
            {c.calendar.map((e) => (
              <div key={e.title} className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-blue-600">
                <div className="text-sm font-semibold text-blue-700 mb-1">{e.when}</div>
                <h3 className="text-lg font-bold mb-2">{e.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{e.text}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {c.aims?.length > 0 && (
        <Section title="Aims and Objectives" icon={Target}>
          <CheckList items={c.aims} />
        </Section>
      )}

      {c.activities?.length > 0 && (
        <Section title="Activities">
          <CheckList items={c.activities} />
        </Section>
      )}

      {(c.founding?.length > 0 || c.developments?.length > 0) && (
        <div className="grid lg:grid-cols-2 gap-x-12">
          {c.founding?.length > 0 && (
            <Section title="Founding Years">
              <Timeline items={c.founding} />
            </Section>
          )}
          {c.developments?.length > 0 && (
            <Section title="Resolutions and Developments">
              <Timeline items={c.developments} />
            </Section>
          )}
        </div>
      )}

      {c.monuments?.length > 0 && (
        <Section title="Monuments Project" icon={Landmark}>
          {c.monumentsIntro && <p className="text-gray-700 leading-relaxed mb-6 max-w-3xl">{c.monumentsIntro}</p>}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {c.monuments.map((m) => (
              <div key={`${m.year}-${m.place}`} className="bg-white rounded-xl shadow-sm p-6 flex flex-col">
                <div className="text-sm font-semibold text-blue-700 mb-1">{m.year}</div>
                <h3 className="text-lg font-bold mb-2">{m.place}</h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-grow">{m.text}</p>
                {m.sponsor && <p className="text-xs text-gray-500 mt-3">Sponsored by {m.sponsor}</p>}
              </div>
            ))}
          </div>
        </Section>
      )}

      {c.structure?.length > 0 && (
        <Section title={`How ${ministry.name} Is Organised`} icon={Users}>
          <div className="grid md:grid-cols-2 gap-6">
            {c.structure.map((s) => (
              <div key={s.title} className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                {s.text.map((p, i) => (
                  <p key={i} className="text-gray-700 leading-relaxed mb-3 last:mb-0">
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </Section>
      )}

      {c.lookingForward && (
        <Section title="Looking Forward">
          <p className="text-gray-700 leading-relaxed bg-white rounded-xl shadow-sm p-6 md:p-8">{c.lookingForward}</p>
        </Section>
      )}

      {c.gallery?.length > 0 && (
        <Section title="Gallery">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {c.gallery.map((img, i) => (
              <motion.div
                key={img.src}
                className="relative h-48 sm:h-64 rounded-lg overflow-hidden shadow-md group"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
        </Section>
      )}

      {c.source && <p className="text-xs text-gray-500 italic">{c.source}</p>}
    </div>
  );
}
