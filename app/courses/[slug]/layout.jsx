import { getCourseBySlug } from '@/data/courses';
import JsonLd from '@/components/JsonLd';
import { breadcrumbs, courseJsonLd } from '@/lib/jsonld';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) return { title: 'Course' };

  return pageMetadata({
    title: course.title,
    description: course.description,
    path: `/courses/${course.slug}`,
    image: course.image,
  });
}

export default async function CourseLayout({ children, params }) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  return (
    <>
      {course && (
        <JsonLd
          data={[
            courseJsonLd(course),
            breadcrumbs([
              { name: 'Home', path: '/' },
              { name: 'Courses', path: '/courses' },
              { name: course.title, path: `/courses/${course.slug}` },
            ]),
          ]}
        />
      )}
      {children}
    </>
  );
}
