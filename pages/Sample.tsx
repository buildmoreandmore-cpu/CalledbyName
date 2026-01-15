
import React, { useState } from 'react';
import { GenderOption, BibleVersion } from '../types';
import { BIBLE_VERSIONS } from '../constants';
import { personalizeText } from '../utils/personalization';

// Sample verses from Matthew 5 (Sermon on the Mount) - showing first 20 verses for the preview
const MATTHEW_5_SAMPLE = {
  web: [
    { number: 1, text: "Seeing the multitudes, he went up onto the mountain. When he had sat down, his disciples came to him." },
    { number: 2, text: "He opened his mouth and taught them, saying," },
    { number: 3, text: "\"Blessed are the poor in spirit, {{NAME}}, for theirs is the Kingdom of Heaven.\"" },
    { number: 4, text: "\"Blessed are those who mourn, {{MY_CHILD}}, for they shall be comforted.\"" },
    { number: 5, text: "\"Blessed are the gentle, for they shall inherit the earth.\"" },
    { number: 6, text: "\"Blessed are those who hunger and thirst for righteousness, {{NAME}}, for they shall be filled.\"" },
    { number: 7, text: "\"Blessed are the merciful, {{MY_CHILD}}, for they shall obtain mercy.\"" },
    { number: 8, text: "\"Blessed are the pure in heart, for they shall see God.\"" },
    { number: 9, text: "\"Blessed are the peacemakers, {{NAME}}, for they shall be called children of God.\"" },
    { number: 10, text: "\"Blessed are those who have been persecuted for righteousness' sake, for theirs is the Kingdom of Heaven.\"" },
    { number: 11, text: "\"Blessed are you, {{NAME}}, when people reproach you, persecute you, and say all kinds of evil against you falsely, for my sake.\"" },
    { number: 12, text: "\"Rejoice, {{MY_CHILD}}, and be exceedingly glad, for great is your reward in heaven. For that is how they persecuted the prophets who were before you.\"" },
    { number: 13, text: "\"{{NAME}}, you are the salt of the earth, but if the salt has lost its flavor, with what will it be salted? It is then good for nothing, but to be cast out and trodden under the feet of men.\"" },
    { number: 14, text: "\"{{NAME}}, you are the light of the world. A city located on a hill can't be hidden.\"" },
    { number: 15, text: "\"Neither do you light a lamp and put it under a measuring basket, but on a stand; and it shines to all who are in the house.\"" },
    { number: 16, text: "\"Even so, {{MY_CHILD}}, let your light shine before men, that they may see your good works and glorify your Father who is in heaven.\"" },
  ],
  kjv: [
    { number: 1, text: "And seeing the multitudes, he went up into a mountain: and when he was set, his disciples came unto him:" },
    { number: 2, text: "And he opened his mouth, and taught them, saying," },
    { number: 3, text: "\"Blessed are the poor in spirit, {{NAME}}: for theirs is the kingdom of heaven.\"" },
    { number: 4, text: "\"Blessed are they that mourn, {{MY_CHILD}}: for they shall be comforted.\"" },
    { number: 5, text: "\"Blessed are the meek: for they shall inherit the earth.\"" },
    { number: 6, text: "\"Blessed are they which do hunger and thirst after righteousness, {{NAME}}: for they shall be filled.\"" },
    { number: 7, text: "\"Blessed are the merciful, {{MY_CHILD}}: for they shall obtain mercy.\"" },
    { number: 8, text: "\"Blessed are the pure in heart: for they shall see God.\"" },
    { number: 9, text: "\"Blessed are the peacemakers, {{NAME}}: for they shall be called the children of God.\"" },
    { number: 10, text: "\"Blessed are they which are persecuted for righteousness' sake: for theirs is the kingdom of heaven.\"" },
    { number: 11, text: "\"Blessed art thou, {{NAME}}, when men shall revile you, and persecute you, and shall say all manner of evil against you falsely, for my sake.\"" },
    { number: 12, text: "\"Rejoice, {{MY_CHILD}}, and be exceeding glad: for great is your reward in heaven: for so persecuted they the prophets which were before you.\"" },
    { number: 13, text: "\"{{NAME}}, ye are the salt of the earth: but if the salt have lost his savour, wherewith shall it be salted? it is thenceforth good for nothing, but to be cast out, and to be trodden under foot of men.\"" },
    { number: 14, text: "\"{{NAME}}, ye are the light of the world. A city that is set on an hill cannot be hid.\"" },
    { number: 15, text: "\"Neither do men light a candle, and put it under a bushel, but on a candlestick; and it giveth light unto all that are in the house.\"" },
    { number: 16, text: "\"Let your light so shine before men, {{MY_CHILD}}, that they may see your good works, and glorify your Father which is in heaven.\"" },
  ]
};

const Sample: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState<GenderOption>('female');
  const [bibleVersion, setBibleVersion] = useState<BibleVersion>('web');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const sampleVerse = bibleVersion === 'kjv'
    ? "\"{{NAME}}, ye are the light of the world. Let your light so shine before men, {{SON_DAUGHTER}}, that they may see your good works.\""
    : "\"{{NAME}}, you are the light of the world. Let your light shine before men, {{SON_DAUGHTER}}, that they may see your good works.\"";

  if (submitted) {
    const verses = MATTHEW_5_SAMPLE[bibleVersion];

    return (
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 pb-8 border-b border-navy/10">
          <span className="bg-gold/10 text-gold px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Free Sample Preview</span>
          <h1 className="font-serif text-4xl md:text-5xl text-navy">The Sermon on the Mount</h1>
          <p className="text-navy/60">Matthew Chapter 5 — Personalized for <span className="font-bold text-navy">{name}</span></p>
          <p className="text-sm text-navy/40">{BIBLE_VERSIONS[bibleVersion].name}</p>
        </div>

        {/* Scripture Content */}
        <div className="bg-white rounded-3xl shadow-xl border border-navy/5 p-8 md:p-12">
          <div className="max-w-2xl mx-auto space-y-6">
            {verses.map((verse) => (
              <p key={verse.number} className="font-scripture text-lg md:text-xl text-navy/80 leading-relaxed">
                <span className="text-gold font-bold mr-2">{verse.number}</span>
                {personalizeText(verse.text, name, gender)}
              </p>
            ))}

            {/* Continuation notice */}
            <div className="pt-8 border-t border-navy/10 text-center space-y-4">
              <p className="text-navy/40 italic">... and 32 more verses continue in the full Gospels</p>
              <p className="text-sm text-navy/60">
                The complete personalized edition includes all four Gospels: Matthew, Mark, Luke, and John —
                with your name woven throughout every chapter.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-6 pt-8">
          <p className="text-navy/70 text-lg">Ready to experience the complete personalized Gospels?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/#/create"
              className="bg-gold text-white px-10 py-5 rounded-full font-bold text-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all inline-block"
            >
              Personalize the Full Gospels
            </a>
            <button
              onClick={() => setSubmitted(false)}
              className="text-navy/50 hover:text-navy underline px-6 py-3"
            >
              Try another name
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 lg:py-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
      <div className="space-y-8">
        <span className="bg-gold/10 text-gold px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Free Sample Preview</span>
        <h1 className="font-serif text-5xl text-navy leading-tight">Experience the <span className="text-gold italic">Intimacy</span> of Personalized Scripture</h1>
        <p className="text-lg text-navy/70 leading-relaxed">
          Preview the Sermon on the Mount (Matthew 5) with your name woven throughout — experience how Scripture speaks directly to you.
        </p>
        <ul className="space-y-4">
          {[
            'The Beatitudes personalized for you',
            'See your name in Jesus\' teachings',
            'Choose WEB or KJV translation',
            'Read online instantly'
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
                placeholder="Stay updated on new features"
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

           <button
             type="submit"
             className="w-full bg-gold text-white py-5 rounded-full text-xl font-bold shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 flex items-center justify-center"
           >
             <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
             </svg>
             View Free Sample
           </button>
           <p className="text-center text-xs text-navy/30">
             By submitting, you agree to receive spiritual encouragement and occasional offers.
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
