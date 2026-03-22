import React from 'react';
import { motion } from 'motion/react';

export interface AffinityCategory {
  title: string;
  count: number;
  notes: {
    text: string;
    isQuote?: boolean;
    isHighlight?: boolean;
    tag?: string;
  }[];
}

export interface InsightData {
  id: string;
  label: string;
  title: string;
  summary: string[];
  quote: string;
}

interface InsightUnitProps {
  sectionTitle?: string;
  sectionSubtitle?: string;
  metrics?: {
    label: string;
    value: string | number;
  }[];
  affinityData: AffinityCategory[];
  insights: InsightData[];
}

export function InsightUnit({
  sectionTitle = "Synthesis Board",
  sectionSubtitle = "Affinity Mapping Analysis",
  metrics = [],
  affinityData,
  insights
}: InsightUnitProps) {
  return (
    <div className="w-full py-12 flex flex-col gap-16">
      {/* 1. Affinity Map Top Section */}
      <div className="flex flex-col gap-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#0A192F]/10 pb-8">
          <div>
            <h4 className="font-serif text-2xl text-[#1E293B] mb-2">{sectionTitle}</h4>
            <p className="font-sans text-xs text-[#506680] tracking-widest uppercase">{sectionSubtitle}</p>
          </div>
          {metrics.length > 0 && (
            <div className="flex gap-8">
              {metrics.map((m, idx) => (
                <div key={idx} className="text-center">
                  <span className="block font-serif text-3xl text-[#1E293B]">{m.value}</span>
                  <span className="block font-sans text-[10px] text-[#506680] uppercase tracking-wider">{m.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Horizontal Affinity Map (6 themes in one row) */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {affinityData.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="flex flex-col gap-3 min-w-[260px] max-w-[280px] w-full shrink-0 snap-start"
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

      {/* 2. Key Insights Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {insights.map((insight, idx) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.8 }}
            className="flex flex-col h-full bg-white/40 backdrop-blur-sm p-8 md:p-10 rounded-2xl border border-white/60 shadow-sm transition-all hover:bg-white/60 hover:shadow-md"
          >
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#506680]/60 mb-6 block">
              {insight.label}
            </span>
            <h3 className="font-serif text-[#1E293B] leading-tight mb-6 text-[24px]">
              {insight.title}
            </h3>
            
            <div className="flex flex-col flex-grow font-sans text-[#506680] leading-relaxed text-sm md:text-base font-light space-y-4">
              {insight.summary.map((para, pIdx) => (
                <p key={pIdx}>{para}</p>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-[#0A192F]/10">
              <p className="italic text-[#1E293B]/80 font-serif text-sm md:text-base leading-relaxed">
                "{insight.quote}"
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
