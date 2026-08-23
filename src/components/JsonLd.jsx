export default function JsonLd({ data }) {
  const payload = Array.isArray(data) ? data : [data];

  return (
    <>
      {payload.filter(Boolean).map((entry, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
        />
      ))}
    </>
  );
}
