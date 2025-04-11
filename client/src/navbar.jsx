import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white px-4 py-3 shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Brand Name */}
        <Link to="/" className="text-xl font-bold">Augmented Reality</Link>
        
        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
              viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6">
          <li><Link to="/" className="hover:text-cyan-400">Home</Link></li>
          <li><Link to="/video" className="hover:text-cyan-400">Video</Link></li>
          <li><Link to="/audio" className="hover:text-cyan-400">Audio</Link></li>
          <li><Link to="/pdf" className="hover:text-cyan-400">PDF</Link></li>
          <li><Link to="/webgl" className="hover:text-cyan-400">WebGL</Link></li>
          
          {/* Login and Signup buttons (Desktop view) */}
          <li><Link to="/login" className="text-sm bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Login</Link></li>
          <li><Link to="/signup" className="text-sm bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">Sign Up</Link></li>
        </ul>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden mt-2 space-y-2 px-2">
          <li><Link to="/" className="block hover:text-cyan-400">Home</Link></li>
          <li><Link to="/video" className="block hover:text-cyan-400">Video</Link></li>
          <li><Link to="/audio" className="block hover:text-cyan-400">Audio</Link></li>
          <li><Link to="/pdf" className="block hover:text-cyan-400">PDF</Link></li>
          <li><Link to="/webgl" className="block hover:text-cyan-400">WebGL</Link></li>

          {/* Mobile Login and Signup buttons */}
          <li><Link to="/login" className="block text-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Login</Link></li>
          <li><Link to="/signup" className="block text-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">Sign Up</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
