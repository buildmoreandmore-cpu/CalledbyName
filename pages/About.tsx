
import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="space-y-24 pb-24">
      <section className="relative h-[60vh] flex items-center px-6 overflow-hidden bg-navy text-white">
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-navy via-navy/80 to-navy/60"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <span className="text-gold uppercase tracking-widest font-bold text-xs">Our Foundation</span>
          <h1 className="font-serif text-5xl md:text-7xl leading-tight">Born from a <br/><span className="italic text-gold">Living Whisper</span></h1>
          <p className="text-xl text-white/70 font-light max-w-2xl mx-auto">Because the Word was never meant to be heard from a distance.</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <h2 className="font-serif text-4xl text-navy">The "Aha" Moment</h2>
          <p className="text-navy/70 leading-relaxed text-lg">
            Called by Name started in a small study hall where our founder, reading the Gospel of John, realized that every time Jesus spoke, he was speaking to <i>someone</i>. 
          </p>
          <p className="text-navy/70 leading-relaxed text-lg font-light">
            But when we read Bibles today, we often read them as observers. We watch Jesus speak to Peter, Mary, or Thomas. We wanted to close that distance. We wanted to build a bridge between the ancient scrolls and the modern heart.
          </p>
        </div>
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white bg-navy/5 flex items-center justify-center h-64">
          <div className="text-center space-y-4 p-8">
            <div className="w-16 h-16 bg-gold/20 rounded-full mx-auto flex items-center justify-center">
              <span className="text-gold font-serif text-3xl">C</span>
            </div>
            <p className="text-navy/60 italic font-scripture text-lg">"Called by your name..."</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 px-6 border-y border-navy/5">
        <div className="max-w-4xl mx-auto space-y-12 text-center">
          <h2 className="font-serif text-4xl text-navy underline decoration-gold/30 underline-offset-8">Our Sacred Promise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left pt-8">
            <div className="space-y-4 p-8 bg-cream/30 rounded-3xl">
              <h3 className="font-bold text-navy flex items-center">
                <span className="w-8 h-8 rounded-full bg-gold text-white flex items-center justify-center mr-3 text-xs">01</span>
                Theology First
              </h3>
              <p className="text-navy/60 leading-relaxed">
                We never change the meaning of a verse. We only add the "Intimate Address" system to emphasize that God knows your name.
              </p>
            </div>
            <div className="space-y-4 p-8 bg-cream/30 rounded-3xl">
              <h3 className="font-bold text-navy flex items-center">
                <span className="w-8 h-8 rounded-full bg-gold text-white flex items-center justify-center mr-3 text-xs">02</span>
                Excellence in Craft
              </h3>
              <p className="text-navy/60 leading-relaxed">
                A sacred book deserves sacred materials. We use archival-grade paper and artisan binding for every physical order.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 text-center space-y-12">
        <div className="space-y-4">
          <h2 className="font-serif text-4xl text-navy italic">"I have called you by name; you are mine."</h2>
          <p className="text-navy/40 uppercase tracking-widest text-sm">— Isaiah 43:1</p>
        </div>
        <div className="pt-8">
          <Link to="/create" className="bg-gold text-white px-12 py-5 rounded-full font-bold text-xl shadow-2xl hover:scale-105 transition-all">
            Join the Conversation
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
