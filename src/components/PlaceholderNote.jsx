import { TriangleAlert } from 'lucide-react';

export default function PlaceholderNote({ text = 'Placeholder — replace with the real account.', className = '' }) {
  return (
    <div
      className={`inline-flex items-center gap-2 bg-amber-50 border border-amber-300 text-amber-800 rounded-lg px-4 py-2 text-sm ${className}`}
    >
      <TriangleAlert className="flex-shrink-0" />
      <span>{text}</span>
    </div>
  );
}
