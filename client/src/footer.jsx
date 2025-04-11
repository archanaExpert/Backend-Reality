import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-xl font-bold mb-4">Augmented Reality</h4>
            <p className="text-sm">Bringing you videos, audio, PDFs, and WebGL experiences — all in one place.</p>
          </div>

          <div>
            <h5 className="font-semibold mb-3">Navigation</h5>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-cyan-400">Home</Link></li>
              <li><Link to="/video" className="hover:text-cyan-400">Video</Link></li>
              <li><Link to="/audio" className="hover:text-cyan-400">Audio</Link></li>
              <li><Link to="/pdf" className="hover:text-cyan-400">PDF</Link></li>
              <li><Link to="/webgl" className="hover:text-cyan-400">WebGL</Link></li>
              
            </ul>
          </div>

          <div>
            <h5 className="font-semibold mb-3">Resources</h5>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-cyan-400">Blog</a></li>
              <li><a href="#" className="hover:text-cyan-400">Docs</a></li>
              <li><a href="#" className="hover:text-cyan-400">Support</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold mb-3">Follow Us</h5>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-cyan-400">Twitter</a></li>
              <li><a href="#" className="hover:text-cyan-400">GitHub</a></li>
              <li><a href="#" className="hover:text-cyan-400">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-4 text-sm text-center text-gray-400">
          &copy; {new Date().getFullYear()} MyApp. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

  