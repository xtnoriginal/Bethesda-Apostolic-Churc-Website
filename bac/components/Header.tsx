import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4 flex items-center"> 
      <div className="flex items-center space-x-4"> 
        <Image
          src="/logo.png" 
          alt="Bethesda Apostolic Church Logo"
          width={60} 
          height={60} 
        />
        <h1 className="text-xl font-bold tracking-wide sm:text-2xl">Bethesda Apostolic Church</h1> 
      </div>

      <nav className="ml-auto"> 
        <ul className="flex space-x-4 text-lg font-medium"> 
          <li><Link href="/" className="hover:text-blue-400 transition-colors duration-200">Home</Link></li>
          <li><Link href="/about" className="hover:text-blue-400 transition-colors duration-200">About Us</Link></li>
          <li><Link href="/sermons" className="hover:text-blue-400 transition-colors duration-200">Sermons</Link></li>
          <li><Link href="/events" className="hover:text-blue-400 transition-colors duration-200">Events</Link></li>
          <li><Link href="/contact" className="hover:text-blue-400 transition-colors duration-200">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}