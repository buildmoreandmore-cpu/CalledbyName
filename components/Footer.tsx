
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-navy text-white py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <h3 className="font-serif text-3xl text-gold mb-6">Called by Name</h3>
          <p className="max-w-md text-white/80 leading-relaxed mb-8 text-lg">
            We believe Scripture is a living word. Our mission is to help you experience the Gospels as an intimate conversation with your Creator.
          </p>
          <div className="flex space-x-4">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold transition-all cursor-pointer group">
              <span className="text-xs font-bold group-hover:scale-110 transition-transform">IG</span>
            </div>
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold transition-all cursor-pointer group">
              <span className="text-xs font-bold group-hover:scale-110 transition-transform">FB</span>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-bold mb-6 text-gold uppercase tracking-widest text-sm">Shop</h4>
          <ul className="space-y-4 text-white/70 text-base">
            <li><Link to="/create" className="hover:text-white transition-colors">Create Personalized Book</Link></li>
            <li><Link to="/sample" className="hover:text-white transition-colors">Free Sample Chapter</Link></li>
            <li><Link to="/create" className="hover:text-white transition-colors">Gift This Book</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold mb-6 text-gold uppercase tracking-widest text-sm">Support</h4>
          <ul className="space-y-4 text-white/70 text-base">
            <li><Link to="/faq" className="hover:text-white transition-colors">Frequently Asked Questions</Link></li>
            <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping & Delivery</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-white/40">
        <p>&copy; {new Date().getFullYear()} Called by Name. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
