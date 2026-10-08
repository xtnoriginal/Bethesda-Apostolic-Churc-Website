const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const { courses } = await import('../src/data/courses.js');
  const { archiveItems } = await import('../src/data/archives.js');
  const { sermons } = await import('../src/data/sermons.js');

  for (const course of courses) {
    const createdCourse = await prisma.course.upsert({
      where: { slug: course.slug },
      update: {
        title: course.title,
        category: course.category,
        description: course.description,
        image: course.image,
      },
      create: {
        slug: course.slug,
        title: course.title,
        category: course.category,
        description: course.description,
        image: course.image,
      },
    });

    for (let i = 0; i < course.lessons.length; i++) {
      const lesson = course.lessons[i];
      const data = {
        title: lesson.title,
        type: lesson.type,
        duration: lesson.duration,
        order: i,
        body: lesson.body ? JSON.stringify(lesson.body) : null,
        audioUrl: lesson.audioUrl || null,
        isDraft: !!lesson.isDraft,
        isComingSoon: !!lesson.isComingSoon,
        linkHref: lesson.linkHref || null,
        linkLabel: lesson.linkLabel || null,
      };

      await prisma.lesson.upsert({
        where: {
          courseId_lessonKey: { courseId: createdCourse.id, lessonKey: lesson.id },
        },
        update: data,
        create: { ...data, lessonKey: lesson.id, courseId: createdCourse.id },
      });
    }
  }

  for (const item of archiveItems) {
    await prisma.archiveItem.upsert({
      where: { slug: item.slug },
      update: {
        title: item.title,
        type: item.type,
        date: new Date(item.date),
        image: item.image,
        description: item.description,
        body: item.body ? JSON.stringify(item.body) : null,
        isDraft: !!item.isDraft,
        isDownloadPending: !!item.isDownloadPending,
      },
      create: {
        slug: item.slug,
        title: item.title,
        type: item.type,
        date: new Date(item.date),
        image: item.image,
        description: item.description,
        body: item.body ? JSON.stringify(item.body) : null,
        isDraft: !!item.isDraft,
        isDownloadPending: !!item.isDownloadPending,
      },
    });
  }

  // Sermons have no natural unique key, so only seed into an empty table;
  // re-running the seed must not duplicate or overwrite admin edits.
  if ((await prisma.sermon.count()) === 0) {
    for (const sermon of sermons) {
      await prisma.sermon.create({ data: { ...sermon, date: new Date(sermon.date) } });
    }
  }

  console.log(
    `Seeded ${courses.length} courses, ${archiveItems.length} archive items and ${sermons.length} sermons.`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
