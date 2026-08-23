// Signed-in area. robots.txt disallows crawling, but a page reached through a
// stray link still needs the noindex tag to stay out of search results.
export const metadata = {
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return children;
}
