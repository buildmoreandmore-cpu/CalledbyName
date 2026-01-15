
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Create from './pages/Create';
import Sample from './pages/Sample';
import Confirmation from './pages/Confirmation';
import About from './pages/About';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-cream selection:bg-gold/30">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/sample" element={<Sample />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<div className="max-w-4xl mx-auto px-6 py-24"><h1 className="font-serif text-5xl mb-8">Frequently Asked Questions</h1><div className="space-y-6"><div className="p-6 bg-white rounded-xl shadow-sm"><h3 className="font-bold mb-2">Is this a new Bible translation?</h3><p className="text-navy/60">No, we use the World English Bible (WEB), which is a modern English translation in the public domain. We only add personalization placeholders; we do not alter the theological meaning of the text.</p></div><div className="p-6 bg-white rounded-xl shadow-sm"><h3 className="font-bold mb-2">Can I use more than one name?</h3><p className="text-navy/60">Currently, our system is optimized for a single individual's first name to maintain the intimacy of the "I and You" experience.</p></div></div></div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
