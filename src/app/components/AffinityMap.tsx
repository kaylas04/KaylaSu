import React from 'react';
import { motion } from 'motion/react';

interface AffinityCategory {
  title: string;
  count: number;
  notes: {
    text: string;
    isQuote?: boolean;
    isHighlight?: boolean;
    tag?: string;
  }[];
}

export const affinityData: AffinityCategory[] = [
  {
    title: "Clarity of Information",
    count: 4,
    notes: [
      { text: "I wasn't sure what this company does at first glance — it looked super technical.", isQuote: true, isHighlight: true, tag: "first impression" },
      { text: "Had to search externally to understand what they were selling.", tag: "comprehension" },
      { text: "Homepage needs a single clear sentence that explains the business.", tag: "value prop" },
      { text: "Initially mistook the site for an electronics company, not a materials supplier.", tag: "positioning" }
    ]
  },
  {
    title: "Product Understanding",
    count: 5,
    notes: [
      { text: "A comparison chart would help — e.g. which silicon variant is for batteries vs. other uses.", isHighlight: true, tag: "differentiation" },
      { text: "Nano-Si vs. Micro-Si distinctions are unclear; products all look the same.", tag: "naming" },
      { text: "Product pages are too short — still unclear what makes each product special.", tag: "depth" },
      { text: "No downloadable datasheet or technical PDF to share with engineering teams.", tag: "collateral" },
      { text: "Listing target industries per product would immediately add clarity.", tag: "use cases" }
    ]
  },
  {
    title: "Trust & Technical Proof",
    count: 7,
    notes: [
      { text: "The site feels a bit like a student project — not very professional.", isQuote: true, isHighlight: true, tag: "credibility" },
      { text: "No clients or case studies mentioned, making it hard to trust.", tag: "social proof" },
      { text: "Would like to see certifications, test results, or ISO links.", tag: "certification" },
      { text: "Published research or third-party validation would increase credibility.", tag: "validation" },
      { text: "No team or founder info — unclear who's behind the company.", tag: "transparency" }
    ]
  },
  {
    title: "Business Utility",
    count: 6,
    notes: [
      { text: "As a purchaser, I care most about order size, lead time, supply capacity — none of that is mentioned.", isQuote: true, isHighlight: true, tag: "procurement" },
      { text: "Unclear whether orders are limited to Taiwan or available globally.", tag: "geography" },
      { text: "No MOQ or logistics info — essential for B2B buyers.", tag: "logistics" },
      { text: "A simple 'suitable for industrial-scale use' line would help a lot.", tag: "scale signal" },
      { text: "Delivery timelines matter greatly for manufacturers but aren't shown.", tag: "lead time" }
    ]
  },
  {
    title: "Visual Design",
    count: 4,
    notes: [
      { text: "Looks outdated — feels like a website from the early 2010s.", isHighlight: true, tag: "perception" },
      { text: "Font is too thin, especially hard to read on mobile.", tag: "legibility" },
      { text: "Product list was difficult to locate.", tag: "navigation" },
      { text: "A more polished UI with clearer hierarchy would make it feel premium.", tag: "polish" }
    ]
  },
  {
    title: "Contact Flow",
    count: 8,
    notes: [
      { text: "Wanted to request a sample but couldn't figure out how.", isHighlight: true, tag: "samples" },
      { text: "Contact form feels generic — more like a support inbox than a sales channel.", tag: "intent mismatch" },
      { text: "Needs a visible 'Get a Quote' button or direct sales path.", tag: "CTA" },
      { text: "Submitted the form but received no confirmation.", tag: "feedback" },
      { text: "Form doesn't disclose the recipient or whether data is secure.", tag: "trust" }
    ]
  }
];

export function AffinityMap() {
  return (
    <div className="w-full overflow-hidden py-12">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#0A192F]/10 pb-8">
          <div>
            <h4 className="font-serif text-2xl text-[#1E293B] mb-2">Synthesis Board</h4>
            <p className="font-sans text-xs text-[#506680] tracking-widest uppercase">Affinity Mapping Analysis</p>
          </div>
          <div className="flex gap-8">
            <div className="text-center">
              <span className="block font-serif text-3xl text-[#1E293B]">39</span>
              <span className="block font-sans text-[10px] text-[#506680] uppercase tracking-wider">Observations</span>
            </div>
            <div className="text-center">
              <span className="block font-serif text-3xl text-[#1E293B]">6</span>
              <span className="block font-sans text-[10px] text-[#506680] uppercase tracking-wider">Themes</span>
            </div>
            <div className="text-center">
              <span className="block font-serif text-3xl text-[#1E293B]">5</span>
              <span className="block font-sans text-[10px] text-[#506680] uppercase tracking-wider">Participants</span>
            </div>
          </div>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {affinityData.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="flex flex-col gap-3 min-w-[260px] max-w-[280px] snap-start flex-shrink-0"
            >
              <div className="flex items-center justify-between border-b border-[#0A192F]/10 pb-2">
                <h5 className="font-sans font-semibold text-[9px] uppercase tracking-[0.1em] text-[#1E293B] leading-tight">
                  {category.title}
                </h5>
                <span className="text-[9px] font-sans text-[#506680] bg-[#0A192F]/5 px-1.5 py-0.5 rounded-full">
                  {category.count}
                </span>
              </div>
              
              <div className="flex flex-col gap-2">
                {category.notes.map((note, nIdx) => (
                  <div 
                    key={nIdx}
                    className={`p-3 rounded-md border ${
                      note.isHighlight 
                        ? 'bg-white border-[#0A192F]/15 shadow-sm' 
                        : 'bg-white/40 border-white/40'
                    } transition-all duration-300 hover:border-[#0A192F]/20`}
                  >
                    <p className={`font-sans text-[10px] leading-relaxed ${
                      note.isHighlight ? 'text-[#1E293B]' : 'text-[#506680]'
                    } ${note.isQuote ? 'italic' : ''}`}>
                      {note.isQuote ? `“${note.text}”` : note.text}
                    </p>
                    {note.tag && (
                      <span className="inline-block mt-2 font-sans text-[8px] uppercase tracking-wider text-[#506680]/60 bg-[#0A192F]/5 px-1 py-0.5 rounded">
                        {note.tag}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
