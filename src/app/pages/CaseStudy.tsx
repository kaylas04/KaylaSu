import React, { useEffect } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { affinityData } from "../components/AffinityMap";
import { InsightUnit } from "../components/InsightUnit";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import heroImage from "@/assets/3d75bb2ac81237d4ca5534df4bf3f553c901e595.png";

export function CaseStudy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white text-[#0D0D0D] w-full min-h-screen selection:bg-[#C8000A] selection:text-white relative">
      <Navbar />

      {/* Full-width Hero Banner */}
      <section className="relative w-full pt-[72px] md:pt-[100px] flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          <img
            src={heroImage}
            alt="SiLican Workflow Interface"
            className="w-full h-auto block"
          />
        </motion.div>
      </section>

      {/* 1. Overview */}
      <section className="relative pt-24 md:pt-32 pb-20 px-6 sm:px-12 md:px-24 max-w-[1400px] mx-auto flex flex-col justify-center">
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
              duration: 1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <h1 className="font-serif text-6xl sm:text-7xl md:text-[8rem] leading-[0.9] tracking-tighter text-[#0D0D0D] mb-6">
              SiLican <br />
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mt-16 md:mt-24">
            {/* Metadata Left Column */}
            <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-8 text-sm font-sans text-[#666666]">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h4 className="text-[10px] uppercase tracking-[0.2em] mb-2 text-[#0D0D0D]/50">
                  Project Type
                </h4>
                <p className="text-[#0D0D0D]">
                  B2B Website / Brand & UX Design
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <h4 className="text-[10px] uppercase tracking-[0.2em] mb-2 text-[#0D0D0D]/50">
                  Timeline
                </h4>
                <p className="text-[#0D0D0D]">
                  Jan 2024 – Aug 2025
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <h4 className="text-[10px] uppercase tracking-[0.2em] mb-2 text-[#0D0D0D]/50">
                  Team
                </h4>
                <p className="text-[#0D0D0D]">
                  Kayla SuDr. Li (COO)
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <h4 className="text-[10px] uppercase tracking-[0.2em] mb-2 text-[#0D0D0D]/50">
                  Role
                </h4>
                <p className="text-[#0D0D0D]">UX Designer</p>
              </motion.div>
            </div>

            {/* Overview Right Column */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 1 }}
              className="lg:col-span-8 lg:col-start-6 flex flex-col justify-start"
            >
              <p className="font-display italic text-2xl md:text-3xl lg:text-4xl text-[#0D0D0D] leading-tight mb-8">
                Transforming complex deep-tech information into
                a clear, credible B2B website experience.
              </p>
              <div className="font-sans text-[#666666] leading-relaxed max-w-2xl text-base md:text-lg flex flex-col gap-6 font-light">
                <p>
                  SiLican is a deep-tech materials company
                  developing recycled silicon and silicon
                  carbide solutions for battery and industrial
                  partners. I redesigned its brand identity and
                  website to make complex offerings clearer,
                  more credible, and easier for B2B audiences to
                  evaluate.
                </p>
                <p>
                  As&nbsp;&nbsp;designer, I led the website
                  experience end to end—creating the visual
                  direction, restructuring content, designing
                  20+ hi-fi screens, and preparing assets for
                  developer handoff.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Problem */}
      <section className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-24 py-32">
        <div className="flex flex-col gap-16 md:gap-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
            <div className="md:col-span-4">
              <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-[#0D0D0D]">
                The{" "}
                <span className="font-display italic text-[#C8000A]">
                  Problem
                </span>
              </h2>
            </div>
            <div className="md:col-span-8">
              <h3 className="font-sans text-2xl md:text-3xl font-medium text-[#0D0D0D] mb-8 leading-snug">
                A fragmented website experience made it harder
                for SiLican to communicate technical value and
                convert interest into partnership inquiries.
              </h3>
              <p className="font-sans text-[#666666] leading-relaxed text-base md:text-lg font-light max-w-2xl">
                SiLican needed its website to do more than
                present information—it had to explain complex
                technologies, reinforce credibility, and support
                B2B outreach. However, the original experience
                was text-heavy, visually inconsistent, and
                difficult to navigate. Visitors struggled to
                understand core offerings, trust the company's
                story, and identify clear next steps for
                collaboration.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-32 mt-12">
            {[
              {
                title: "Unclear Product Understanding",
                callout:
                  "The interface showed multiple products, but not in a way that helped visitors compare them, understand their applications, or identify the right fit. The flow exposed the offerings without truly supporting product understanding.",
                video: "/videos/product.mov",
              },
              {
                title: "Weak About Storytelling",
                callout:
                  "The company story lacked structure and emphasis, making credibility and growth milestones easy to miss.",
                video: "/videos/company.mov",
              },
              {
                title: "Passive Contact Flow",
                callout:
                  "Partnership entry points were unclear and generic, giving visitors little guidance on what to do next.",
                video: "/videos/contact.mov",
              },
            ].map((item, idx) => {
              const isEven = idx % 2 !== 0;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className={"flex flex-col lg:flex-row items-center gap-12 lg:gap-16 " + (isEven ? "lg:flex-row-reverse" : "")}
                >
                  {/* Text Side */}
                  <div className="w-full lg:w-2/5 flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-px bg-[#0D0D0D]/20" />
                      <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#C8000A]">
                        Problem 0{idx + 1}
                      </span>
                    </div>
                    <h4 className="font-serif text-[#0D0D0D] leading-tight text-[28px]">
                      {item.title}
                    </h4>
                    <p className="font-sans text-[#666666] leading-relaxed text-base md:text-lg font-light">
                      {item.callout}
                    </p>
                  </div>

                  {/* Video Side */}
                  <div className="w-full lg:w-3/5">
                    <div className="relative rounded-xl overflow-hidden border border-black/10 bg-white shadow-sm transition-all duration-700 hover:shadow-xl hover:border-black/15">
                      <video
                        src={item.video}
                        className="w-full h-auto block"
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                      <div className="absolute inset-0 border border-black/5 rounded-xl pointer-events-none" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HMW Section */}
      <section className="bg-white py-32 border-y border-black/5 relative overflow-hidden">
        <div className="px-6 sm:px-12 md:px-24 max-w-[1000px] mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 1.2,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#C8000A] mb-8 block">
              Initial design question
            </span>
            <h2 className="font-serif leading-tight text-[#0D0D0D] text-[24px]">
              How might we{" "}
              <span className="font-display italic text-[#C8000A]">
                streamline
              </span>{" "}
              B2B communication and clarify technical product
              information so engineers and procurement users can
              evaluate SiLican's offerings with{" "}
              <span className="font-display italic text-[#C8000A]">
                confidence?
              </span>
            </h2>
          </motion.div>
        </div>
        {/* Subtle decorative line */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-px bg-gradient-to-r from-transparent via-black/5 to-transparent rotate-[-2deg]" />
      </section>

      {/* 3. Insights */}
      <section className="bg-[#F5F5F5] py-32 border-y border-black/5">
        <div className="px-6 sm:px-12 md:px-24 max-w-[1400px] mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-20">
            <div className="lg:w-1/3">
              <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-[#0D0D0D]">
                Key <br />
                <span className="font-display italic text-[#C8000A]">
                  Insights
                </span>
              </h2>
            </div>
            <div className="lg:w-1/2 pt-4 border-t border-black/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-[#C8000A]" />
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#C8000A]">
                  Research Synthesis
                </span>
              </div>
              <p className="font-sans text-xs md:text-sm text-[#666666] leading-relaxed font-light">
                Qualitative synthesis from 5 usability
                interviews and 39 observations, mapped across 6
                key themes of information clarity and business
                utility. This process revealed critical barriers
                in how technical information is consumed.
              </p>
            </div>
          </div>

          <div className="w-full mt-12">
            <InsightUnit
              affinityData={affinityData}
              metrics={[
                { value: "39", label: "Observations" },
                { value: "6", label: "Themes" },
                { value: "5", label: "Participants" },
              ]}
              insights={[
                {
                  id: "insight-01",
                  label: "KEY INSIGHT 01",
                  title:
                    "The Credibility Gap in Technical Evaluation",
                  summary: [
                    "Research revealed that while SiLican's materials are cutting-edge, the website's visual perception and lack of technical proof points created significant friction.",
                    'Engineers struggled to distinguish product variants without technical datasheets, while purchasers identified the absence of MOQ and lead-time data as a "trust barrier" that prevented them from initiating serious partnership inquiries.',
                  ],
                  quote:
                    "I wasn't sure what this company does at first glance—it looked super technical but felt like a student project.",
                },
                {
                  id: "insight-02",
                  label: "Key Insight 02",
                  title:
                    "Technical Complexity Without Structure Reduced Product Understanding",
                  summary: [
                    "Research showed that visitors were not rejecting SiLican's technology — they were struggling to decode it. Dense product copy, weak hierarchy, and limited comparison tools made it hard for users to distinguish product variants, understand applications, or quickly grasp what the company actually offers.",
                  ],
                  quote:
                    "Some product pages are really short. I still don't know what makes them special.",
                },
                {
                  id: "insight-03",
                  label: "Key Insight 03",
                  title:
                    "Partnership Interest Was Present, but the Website Did Little to Support Action",
                  summary: [
                    "Potential partners were willing to explore collaboration, but the site did not clearly guide them toward the next step. Generic contact forms, unclear response expectations, and the absence of quote- or sales-oriented pathways made the experience feel passive rather than partnership-driven.",
                  ],
                  quote:
                    "I wanted to ask for a sample but couldn't figure out how.",
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* 4. Design Strategy */}

      {/* 5. Solution */}
      {/* Full-width image at natural ratio, text absolutely overlaid on left */}
      <section className="relative w-full">
        {/* Image at full natural width — no cropping */}
        <img
          src="/images/frame_41.png"
          alt="SiLican redesign mockup"
          className="w-full h-auto block"
        />

        {/* Gradient overlay: left side only, so nano texture stays visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/30" />

        {/* Text — absolute, centered vertically over left nano zone */}
        <div className="absolute inset-0 flex items-center">
          <div className="px-8 sm:px-16 md:px-24 w-full md:w-[50%]">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-6"
            >
              <h2 className="font-serif text-[48px] leading-[1.0] tracking-tight text-[#0D0D0D]">
                The{" "}
                <span className="font-display italic text-[#C8000A]">
                  Solution
                </span>
              </h2>

              <p className="font-sans text-[#666666] text-base md:text-lg leading-relaxed font-light max-w-[400px]">
                A redesigned brand and website that makes SiLican's technology
                legible, its credibility tangible, and its next steps clear
                — built for the engineers and procurement leads who matter most.
              </p>

              <div className="w-12 h-px bg-[#0D0D0D]/20 mt-2" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5b. Solution Showcase — Reversed-Z Asymmetric Layout */}
      <section className="bg-white w-full">

        {/* ── Feature Moment 01 Header ── */}
        <div className="px-8 sm:px-16 md:px-24 pt-28 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#C8000A]">
                Feature Moment 01
              </span>
              <div className="flex-1 h-px bg-[#0D0D0D]/8" />
            </div>
            <h3 className="font-serif text-[30px] text-[#0D0D0D] tracking-tight leading-tight mb-4">
              Clarifying Product Understanding
            </h3>
            <p className="font-sans text-[#666666] font-light text-base md:text-lg leading-relaxed max-w-2xl">
              The original site exposed products without helping visitors compare, evaluate, or understand them.
              Each screen below represents a distinct design move toward clarity.
            </p>
          </motion.div>
        </div>

        {/* ── f_home — text LEFT · video RIGHT ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row items-center gap-0 px-8 sm:px-16 md:px-24 lg:px-0 lg:pr-0 pb-24"
        >
          {/* Text — left narrow column */}
          <div className="w-full lg:w-[38%] lg:pl-24 lg:pr-16 pb-10 lg:pb-0 flex flex-col gap-5">
            <h4 className="font-serif text-[#0D0D0D] text-[1.5rem] md:text-[1.75rem] leading-snug tracking-tight">
              A clearer first impression through guided interaction
            </h4>
            <p className="font-sans text-[#666666] font-light text-sm md:text-base leading-relaxed">
              The homepage used clearer hover interactions and stronger value framing to help visitors quickly
              understand what SiLican offers and where to explore next.
            </p>
          </div>
          {/* Video — right dominant column */}
          <div className="w-full lg:w-[62%]">
            <div className="relative overflow-hidden rounded-xl">
              {/* edge fade — right side dissolves into white */}
              <div className="absolute inset-y-0 right-0 w-[18%] bg-gradient-to-l from-white via-white/60 to-transparent pointer-events-none z-10" />
              <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-white/30 to-transparent pointer-events-none z-10" />
              <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white/30 to-transparent pointer-events-none z-10" />
              <video src="/videos/f_home.mov" className="w-full h-auto block" autoPlay loop muted playsInline />
            </div>
          </div>
        </motion.div>

        {/* ── f_product — video LEFT · text RIGHT ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row-reverse items-center gap-0 px-8 sm:px-16 md:px-24 lg:px-0 pb-24"
        >
          {/* Text — right narrow column */}
          <div className="w-full lg:w-[38%] lg:pr-24 lg:pl-16 pb-10 lg:pb-0 flex flex-col gap-5">
            <h4 className="font-serif text-[#0D0D0D] text-[1.5rem] md:text-[1.75rem] leading-snug tracking-tight">
              A more legible product overview
            </h4>
            <p className="font-sans text-[#666666] font-light text-sm md:text-base leading-relaxed">
              Instead of presenting materials as isolated items, the product experience introduced stronger
              comparison cues and clearer visual grouping to support faster evaluation.
            </p>
          </div>
          {/* Video — left dominant column */}
          <div className="w-full lg:w-[62%]">
            <div className="relative overflow-hidden rounded-xl">
              {/* edge fade — left side dissolves into white */}
              <div className="absolute inset-y-0 left-0 w-[18%] bg-gradient-to-r from-white via-white/60 to-transparent pointer-events-none z-10" />
              <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-white/30 to-transparent pointer-events-none z-10" />
              <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white/30 to-transparent pointer-events-none z-10" />
              <video src="/videos/f_product.mov" className="w-full h-auto block" autoPlay loop muted playsInline />
            </div>
          </div>
        </motion.div>

        {/* ── f_core — text LEFT · video RIGHT ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row items-center gap-0 px-8 sm:px-16 md:px-24 lg:px-0 pb-24"
        >
          <div className="w-full lg:w-[38%] lg:pl-24 lg:pr-16 pb-10 lg:pb-0 flex flex-col gap-5">
            <h4 className="font-serif text-[#0D0D0D] text-[1.5rem] md:text-[1.75rem] leading-snug tracking-tight">
              Making technical offerings easier to decode
            </h4>
            <p className="font-sans text-[#666666] font-light text-sm md:text-base leading-relaxed">
              Dense technical information was reorganized into more structured, modular content blocks so users
              could understand differences between offerings at a glance.
            </p>
          </div>
          <div className="w-full lg:w-[62%]">
            <div className="relative overflow-hidden rounded-xl">
              {/* edge fade — right side dissolves into white */}
              <div className="absolute inset-y-0 right-0 w-[18%] bg-gradient-to-l from-white via-white/60 to-transparent pointer-events-none z-10" />
              <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-white/30 to-transparent pointer-events-none z-10" />
              <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white/30 to-transparent pointer-events-none z-10" />
              <video src="/videos/f_core.mov" className="w-full h-auto block" autoPlay loop muted playsInline />
            </div>
          </div>
        </motion.div>

        {/* ── f_eco — video LEFT · text RIGHT ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row-reverse items-center gap-0 px-8 sm:px-16 md:px-24 lg:px-0 pb-32"
        >
          <div className="w-full lg:w-[38%] lg:pr-24 lg:pl-16 pb-10 lg:pb-0 flex flex-col gap-5">
            <h4 className="font-serif text-[#0D0D0D] text-[1.5rem] md:text-[1.75rem] leading-snug tracking-tight">
              Connecting materials to real-world relevance
            </h4>
            <p className="font-sans text-[#666666] font-light text-sm md:text-base leading-relaxed">
              Product information was reframed through applications and use cases, helping visitors understand
              not only what SiLican makes, but where each material fits in practice.
            </p>
          </div>
          <div className="w-full lg:w-[62%]">
            <div className="relative overflow-hidden rounded-xl">
              {/* edge fade — left side dissolves into white */}
              <div className="absolute inset-y-0 left-0 w-[18%] bg-gradient-to-r from-white via-white/60 to-transparent pointer-events-none z-10" />
              <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-white/30 to-transparent pointer-events-none z-10" />
              <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white/30 to-transparent pointer-events-none z-10" />
              <video src="/videos/f_eco.mov" className="w-full h-auto block" autoPlay loop muted playsInline />
            </div>
          </div>
        </motion.div>

        {/* ── Feature Moment 02 Header ── */}
        <div className="px-8 sm:px-16 md:px-24 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#C8000A]">
                Feature Moment 02
              </span>
              <div className="flex-1 h-px bg-[#0D0D0D]/8" />
            </div>
            <h3 className="font-serif text-[30px] text-[#0D0D0D] tracking-tight leading-tight mb-4">
              Reinforcing Credibility Through Story and Proof
            </h3>
            <p className="font-sans text-[#666666] font-light text-base md:text-lg leading-relaxed max-w-2xl">
              To address trust barriers, I redesigned the company story around visible progress, stronger
              narrative structure, and clearer signals of maturity.
            </p>
          </motion.div>
        </div>

        {/* ── f_milestone — text LEFT · video RIGHT (wider) ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row items-center gap-0 px-8 sm:px-16 md:px-24 lg:px-0 pb-32"
        >
          <div className="w-full lg:w-[38%] lg:pl-24 lg:pr-16 pb-10 lg:pb-0 flex flex-col gap-5">
            <h4 className="font-serif text-[#0D0D0D] text-[1.5rem] md:text-[1.75rem] leading-snug tracking-tight">
              A timeline that made company growth visible
            </h4>
            <p className="font-sans text-[#666666] font-light text-sm md:text-base leading-relaxed">
              The milestone experience transformed a dense About section into a more engaging trust layer —
              highlighting progress, achievements, and company evolution in a format that felt easier to scan and remember.
            </p>
          </div>
          <div className="w-full lg:w-[62%]">
            <div className="relative overflow-hidden rounded-xl">
              {/* edge fade — right side dissolves into white */}
              <div className="absolute inset-y-0 right-0 w-[18%] bg-gradient-to-l from-white via-white/60 to-transparent pointer-events-none z-10" />
              <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-white/30 to-transparent pointer-events-none z-10" />
              <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white/30 to-transparent pointer-events-none z-10" />
              <video src="/videos/f_milestone.mov" className="w-full h-auto block" autoPlay loop muted playsInline />
            </div>
          </div>
        </motion.div>

        {/* ── Feature Moment 03 Header ── */}
        <div className="px-8 sm:px-16 md:px-24 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#C8000A]">
                Feature Moment 03
              </span>
              <div className="flex-1 h-px bg-[#0D0D0D]/8" />
            </div>
            <h3 className="font-serif text-[30px] text-[#0D0D0D] tracking-tight leading-tight mb-4">
              Designing for Partnership Action
            </h3>
            <p className="font-sans text-[#666666] font-light text-base md:text-lg leading-relaxed max-w-2xl">
              To support real collaboration intent, I made the contact experience more specific, guided,
              and aligned with how B2B visitors take action.
            </p>
          </motion.div>
        </div>

        {/* ── f_contact — video LEFT · text RIGHT ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row-reverse items-center gap-0 px-8 sm:px-16 md:px-24 lg:px-0 pb-32"
        >
          <div className="w-full lg:w-[38%] lg:pr-24 lg:pl-16 pb-10 lg:pb-0 flex flex-col gap-5">
            <h4 className="font-serif text-[#0D0D0D] text-[1.5rem] md:text-[1.75rem] leading-snug tracking-tight">
              Turning a passive contact page into a clearer next step
            </h4>
            <p className="font-sans text-[#666666] font-light text-sm md:text-base leading-relaxed">
              The new inquiry flow used more intentional prompts, stronger calls to action, and clearer
              business framing to make outreach feel less generic and more partnership-oriented.
            </p>
          </div>
          <div className="w-full lg:w-[62%]">
            <div className="relative overflow-hidden rounded-xl">
              {/* edge fade — left side dissolves into white */}
              <div className="absolute inset-y-0 left-0 w-[18%] bg-gradient-to-r from-white via-white/60 to-transparent pointer-events-none z-10" />
              <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-white/30 to-transparent pointer-events-none z-10" />
              <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white/30 to-transparent pointer-events-none z-10" />
              <video src="/videos/f_contact.mov" className="w-full h-auto block" autoPlay loop muted playsInline />
            </div>
          </div>
        </motion.div>

      </section>

      {/* 6. Pre-Launch Impact + Next Steps */}
      <section className="w-full bg-white px-8 sm:px-16 md:px-24 py-32">

        {/* ── Pre-Launch Impact ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[1100px] mx-auto mb-32"
        >
          <h2 className="font-serif text-[48px] leading-tight tracking-tight text-[#0D0D0D] mb-16">
            Pre-Launch Impact
          </h2>

          {/* Hero metrics row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#0D0D0D]/8 border border-black/8 rounded-2xl overflow-hidden mb-14">
            {[
              { stat: "24 / 24", label: "users found the redesigned product explanation easier to understand than the original" },
              { stat: "24 / 24", label: "users said the milestone timeline increased their confidence in SiLican's credibility" },
              { stat: "< 10s", label: "all usability testers completed contact-related tasks within ten seconds" },
            ].map(({ stat, label }) => (
              <div key={stat + label} className="bg-white px-8 py-10 flex flex-col gap-4">
                <span className="font-serif text-[clamp(2rem,4vw,3.25rem)] leading-none tracking-tight text-[#0D0D0D]">
                  {stat}
                </span>
                <p className="font-sans text-[#666666] text-sm font-light leading-relaxed">
                  {label}
                </p>
              </div>
            ))}
          </div>

          {/* Supporting items — 01–03 numbered, matching Next Steps layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-10 max-w-[1100px]">
            {[
              { n: "01", text: "Used to support SiLican's external-facing communication, helping the company present a more credible and structured image in industry contexts." },
              { n: "02", text: "Final design assets received positive stakeholder feedback and were approved for development handoff." },
              { n: "03", text: "Improved information architecture and clearer calls to action are expected to better support future partner inquiries after launch." },
            ].map(({ n, text }) => (
              <div key={n} className="flex gap-6 items-start">
                <span className="font-sans text-[11px] tracking-[0.25em] text-[#666666]/35 pt-1 shrink-0 select-none">
                  {n}
                </span>
                <p className="font-sans text-[#666666] font-light text-base leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* divider */}
        <div className="max-w-[1100px] mx-auto h-px bg-[#0D0D0D]/8 mb-32" />

        {/* ── Next Steps ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[1100px] mx-auto"
        >
          <h2 className="font-serif text-[48px] leading-tight tracking-tight text-[#0D0D0D] mb-16">
            Next Steps
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-10">
            {[
              {
                n: "01",
                text: "Validate the redesigned content and structure with external partners and other industry-facing stakeholders.",
              },
              {
                n: "02",
                text: "Refine the partner inquiry experience to better support different types of outreach, including technical, commercial, and academic interest.",
              },
              {
                n: "03",
                text: "Continue adjusting product-related content to reflect SiLican's evolving internal product direction before launch.",
              },
              {
                n: "04",
                text: "Prepare the site for scalable content growth, including future additions such as product specs, news updates, and whitepapers.",
              },
            ].map(({ n, text }) => (
              <div key={n} className="flex gap-6 items-start">
                <span className="font-sans text-[11px] tracking-[0.25em] text-[#666666]/35 pt-1 shrink-0 select-none">
                  {n}
                </span>
                <p className="font-sans text-[#666666] font-light text-base leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </section>

      {/* Next Project Footer */}
      <section
        className="relative py-28 overflow-hidden"
        style={{ borderTop: "1px solid rgba(0,0,0,0.06)", backgroundColor: "#F5F5F5" }}
      >
        <div className="relative z-10 px-6 sm:px-12 md:px-24 max-w-[1200px] mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <div className="flex flex-col gap-4">
            <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#666666]">
              Next case study
            </span>
            <h2
              className="font-serif tracking-tight leading-[0.9] text-[#0D0D0D]"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              Quotr
            </h2>
            <p className="font-display italic text-lg max-w-sm text-[#C8000A]">
              AI-powered estimation and takeoff workflow for residential construction.
            </p>
          </div>

          <Link
            to="/project/quotr"
            className="group flex items-center gap-4 transition-all duration-500"
          >
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#0D0D0D] group-hover:opacity-70 transition-opacity">
              View case study
            </span>
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 bg-[#0D0D0D] text-white"
            >
              <ArrowRight size={16} strokeWidth={1.5} />
            </div>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}