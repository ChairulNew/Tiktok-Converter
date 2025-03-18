import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              TikTok Converter
            </Link>
          </div>
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="hover:text-blue-300">
              Home
            </Link>
            <Link to="/tentang" className="hover:text-blue-300">
              About me
            </Link>
            <Link to="/kontak" className="hover:text-blue-300">
              Contact me
            </Link>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
            >
              {isOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <Link to="/" className="block py-2 px-4 hover:bg-blue-500">
            Home
          </Link>
          <Link to="/tentang" className="block py-2 px-4 hover:bg-blue-500">
            About me
          </Link>
          <Link to="/kontak" className="block py-2 px-4 hover:bg-blue-500">
            Contact me
          </Link>
        </div>
      )}
    </nav>
  );
}
