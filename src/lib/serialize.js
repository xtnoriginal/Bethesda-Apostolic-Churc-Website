export function serializeLesson(lesson) {
  return {
    dbId: lesson.id,
    id: lesson.lessonKey,
    title: lesson.title,
    type: lesson.type,
    duration: lesson.duration,
    order: lesson.order,
    body: lesson.body ? JSON.parse(lesson.body) : null,
    audioUrl: lesson.audioUrl || undefined,
    videoUrl: lesson.videoUrl || undefined,
    isDraft: lesson.isDraft,
    isComingSoon: lesson.isComingSoon,
    linkHref: lesson.linkHref || undefined,
    linkLabel: lesson.linkLabel || undefined,
  };
}

export function serializeCourse(course) {
  return {
    dbId: course.id,
    slug: course.slug,
    title: course.title,
    category: course.category,
    description: course.description,
    image: course.image,
    lessons: (course.lessons || [])
      .slice()
      .sort((a, b) => a.order - b.order)
      .map(serializeLesson),
  };
}

export function serializeArchiveItem(item) {
  return {
    dbId: item.id,
    slug: item.slug,
    title: item.title,
    type: item.type,
    date: item.date instanceof Date ? item.date.toISOString().slice(0, 10) : item.date,
    image: item.image,
    description: item.description,
    body: item.body ? JSON.parse(item.body) : null,
    videoUrl: item.videoUrl || null,
    isDraft: item.isDraft,
    isDownloadPending: item.isDownloadPending,
  };
}

export function serializeSermon(sermon) {
  return {
    id: sermon.id,
    title: sermon.title,
    preacher: sermon.preacher,
    date: sermon.date instanceof Date ? sermon.date.toISOString().slice(0, 10) : sermon.date,
    duration: sermon.duration || '',
    description: sermon.description,
    youtubeUrl: sermon.youtubeUrl,
    image: sermon.image || '',
  };
}
