
import React, { useState } from 'react';
import { GenderOption, BibleVersion } from '../types';
import { BIBLE_VERSIONS } from '../constants';
import { personalizeText } from '../utils/personalization';

const Sample: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState<GenderOption>('female');
  const [bibleVersion, setBibleVersion] = useState<BibleVersion>('web');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-sample', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, gender, bibleVersion })
      });

      if (!response.ok) {
        throw new Error('Failed to generate sample');
      }

      const { pdfBase64, filename } = await response.json();

      // Trigger PDF download
      const link = document.createElement('a');
      link.href = `data:application/pdf;base64,${pdfBase64}`;
      link.download = filename || `Matthew-5-${name}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setSubmitted(true);
    } catch (err) {
      setError('Failed to generate your sample. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const sampleVerse = bibleVersion === 'kjv'
    ? "\"{{NAME}}, ye are the light of the world. Let your light so shine before men, {{SON_DAUGHTER}}, that they may see your good works.\""
    : "\"{{NAME}}, you are the light of the world. Let your light shine before men, {{SON_DAUGHTER}}, that they may see your good works.\"";

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-6 py-24 text-center space-y-8 animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-gold rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
           <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
           </svg>
        </div>
        <h1 className="font-serif text-4xl text-navy">Your Sample is Ready!</h1>
        <p className="text-navy/70 leading-relaxed text-lg">
          Your personalized PDF of Matthew Chapter 5 has been downloaded. Check your downloads folder!
        </p>
        <div className="p-12 bg-white rounded-3xl shadow-lg border border-gold/20 italic font-scripture text-2xl text-navy/80">
          {personalizeText(sampleVerse, name, gender)}
        </div>
        <p className="text-sm text-navy/40">
          Translation: {BIBLE_VERSIONS[bibleVersion].name}
        </p>
        <div className="pt-8 space-y-4">
          <a href="/#/create" className="bg-navy text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-navy/90 transition-all inline-block">
             Personalize the Full Gospels
          </a>
          <button
            onClick={() => setSubmitted(false)}
            className="block mx-auto text-navy/50 hover:text-navy underline text-sm"
          >
            Download again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 lg:py-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
      <div className="space-y-8">
        <span className="bg-gold/10 text-gold px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Free Complete Sample</span>
        <h1 className="font-serif text-5xl text-navy leading-tight">Experience the <span className="text-gold italic">Intimacy</span> of Personalized Scripture</h1>
        <p className="text-lg text-navy/70 leading-relaxed">
          Download a complete personalized PDF of the Sermon on the Mount (Matthew 5) — all 48 verses with your name woven throughout. Instant download!
        </p>
        <ul className="space-y-4">
          {[
            'Complete Matthew Chapter 5 (48 verses)',
            'Fully personalized with your name',
            'Choose your preferred translation',
            'Print-ready high-quality PDF'
          ].map((item) => (
            <li key={item} className="flex items-center space-x-3 text-navy/80">
               <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                 <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
               </svg>
               <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-10 rounded-3xl shadow-2xl border border-navy/5">
        <form onSubmit={handleSubmit} className="space-y-6">
           <div className="space-y-3">
              <label className="block text-sm font-semibold uppercase tracking-wider text-navy/60">First Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="What is your name?"
                className="w-full text-xl font-serif bg-transparent border-b-2 border-navy/10 focus:border-gold outline-none py-2 transition-all"
              />
           </div>

           <div className="space-y-3">
              <label className="block text-sm font-semibold uppercase tracking-wider text-navy/60">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Where should we send updates?"
                className="w-full text-xl font-serif bg-transparent border-b-2 border-navy/10 focus:border-gold outline-none py-2 transition-all"
              />
           </div>

           <div className="space-y-3">
              <label className="block text-sm font-semibold uppercase tracking-wider text-navy/60">Form of Address</label>
              <div className="grid grid-cols-3 gap-2">
                {(['male', 'female', 'neutral'] as GenderOption[]).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGender(g)}
                    className={`py-2 px-3 rounded-lg border-2 transition-all font-medium text-sm capitalize ${
                      gender === g
                        ? 'border-gold bg-gold/5 text-navy'
                        : 'border-navy/5 hover:border-navy/20 text-navy/50'
                    }`}
                  >
                    {g === 'neutral' ? 'Beloved' : g}
                  </button>
                ))}
              </div>
           </div>

           <div className="space-y-3">
              <label className="block text-sm font-semibold uppercase tracking-wider text-navy/60">Bible Translation</label>
              <div className="grid grid-cols-2 gap-3">
                {(['web', 'kjv'] as BibleVersion[]).map((version) => (
                  <button
                    key={version}
                    type="button"
                    onClick={() => setBibleVersion(version)}
                    className={`p-3 rounded-lg border-2 transition-all text-left ${
                      bibleVersion === version
                        ? 'border-gold bg-gold/5'
                        : 'border-navy/5 hover:border-navy/20'
                    }`}
                  >
                    <p className="font-bold text-navy text-sm">{BIBLE_VERSIONS[version].shortName}</p>
                    <p className="text-[10px] text-navy/50">{BIBLE_VERSIONS[version].style}</p>
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-navy/40">Both translations are public domain — no copyright restrictions.</p>
           </div>

           {error && (
             <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
               {error}
             </div>
           )}

           <button
             type="submit"
             disabled={isLoading}
             className="w-full bg-gold text-white py-5 rounded-full text-xl font-bold shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
           >
             {isLoading ? (
               <span className="flex items-center">
                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                 </svg>
                 Generating Your PDF...
               </span>
             ) : (
               <>
                 <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                 </svg>
                 Download Free Sample
               </>
             )}
           </button>
           <p className="text-center text-xs text-navy/30">
             By submitting, you agree to receive spiritual encouragement and occasional offers. No spam, ever.
           </p>
        </form>
      </div>

      {/* Live Preview */}
      {name && (
        <div className="md:col-span-2 mt-8">
          <div className="bg-white/50 p-8 rounded-2xl border border-gold/10 text-center">
            <p className="text-xs uppercase font-bold text-gold mb-4">Live Preview</p>
            <p className="text-xl md:text-2xl font-scripture italic text-navy/80 leading-relaxed">
              {personalizeText(sampleVerse, name, gender)}
            </p>
            <p className="text-xs text-navy/40 mt-4">{BIBLE_VERSIONS[bibleVersion].name}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sample;
