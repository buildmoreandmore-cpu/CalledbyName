
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 bg-cream/80 backdrop-blur-md border-b border-navy/5 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3">
          <img src="/logo.png" alt="Called by Name" className="h-10 w-auto" />
          <span className="text-navy font-serif text-xl font-bold tracking-tight">Called by Name</span>
        </Link>
        <div className="hidden md:flex space-x-8 items-center text-sm font-medium text-navy/70">
          <Link to="/about" className="hover:text-navy transition-colors">Our Story</Link>
          <Link to="/sample" className="hover:text-navy transition-colors">Free Sample</Link>
          <Link to="/faq" className="hover:text-navy transition-colors">FAQ</Link>
          <Link 
            to="/create" 
            className="bg-gold text-white px-5 py-2 rounded-full hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Create Your Book
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
