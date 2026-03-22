import React, { useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export function QuotrCaseStudy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const meta = [
    {
      label: "Project Type",
      value: "AI Product\nB2B Workflow\nEstimation UX",
    },
    { label: "Timeline", value: "June 2025 – Present" },
    {
      label: "Team",
      value:
        "Founder-led team\nBackend Engineers\nFrontend Engineers\nUI/UX Designer",
    },
    { label: "Role", value: "UX Designer" },
  ];

  return (
    <div
      className="w-full min-h-screen relative"
      style={{
        backgroundColor: "#F4F6F5",
        color: "#1E2D2A",
      }}
    >
      {/* selection colour */}
      <style>{`::selection { background: #4E7A70; color: #fff; }`}</style>

      <Navbar />

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative w-full pt-[72px] md:pt-[100px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          <img
            src="/images/quotr_mockup.png"
            alt="Quotr Estimation Workspace"
            className="w-full h-auto block"
          />
        </motion.div>
      </section>

      {/* ── Overview ───────────────────────────────────────────── */}
      <section className="relative pt-24 md:pt-32 pb-24 px-6 sm:px-12 md:px-24 max-w-[1400px] mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1
            className="font-serif leading-[0.9] tracking-tighter mb-6"
            style={{
              fontSize: "clamp(4rem, 10vw, 8rem)",
              color: "#1E2D2A",
            }}
          >
            Quotr
          </h1>
        </motion.div>

        {/* Thin accent rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="h-px origin-left mt-8"
          style={{ backgroundColor: "rgba(78,122,112,0.25)" }}
        />

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mt-16 md:mt-24">
          {/* ── Left — metadata ── */}
          <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-8 text-sm font-sans">
            {meta.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <h4
                  className="text-[10px] uppercase tracking-[0.2em] mb-2"
                  style={{ color: "#4E7A70" }}
                >
                  {item.label}
                </h4>
                <p
                  className="whitespace-pre-line leading-relaxed"
                  style={{ color: "#1E2D2A" }}
                >
                  {item.value}
                </p>
              </motion.div>
            ))}
          </div>

          {/* ── Right — overview text ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1 }}
            className="lg:col-span-8 lg:col-start-6 flex flex-col justify-start"
          >
            {/* Italic headline */}
            <p
              className="font-display italic leading-tight mb-8"
              style={{
                fontSize: "clamp(1.35rem, 2.8vw, 2.25rem)",
                color: "#1E2D2A",
              }}
            >
              Transforming a fragmented, spreadsheet-heavy estimation process
              into a clearer workflow for reviewing plans, scanning data,
              comparing revisions, and understanding cost impact.
            </p>

            {/* Body */}
            <div
              className="font-sans leading-relaxed max-w-2xl text-base md:text-lg flex flex-col gap-6 font-light"
              style={{ color: "#4D6660" }}
            >
              <p>
                Quotr is an AI-powered estimation and takeoff workflow product
                for residential construction. It helps contractors and builders
                move from drawings to clearer cost decisions through structured
                room data, AI-assisted tools, and revision comparison.
              </p>
              <p>
                I worked within a fast-moving, founder-led environment to turn
                evolving customer needs into clearer workflows, screen
                structures, and interaction decisions. This case study focuses on
                the Project workspace, split-view estimation experience, compare
                flow, and AI tool usability.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Problems ───────────────────────────────────────────── */}
      <section className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-24 py-32">
        <div className="flex flex-col gap-16 md:gap-24">

          {/* Section header */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
            <div className="md:col-span-4">
              <h2
                className="font-serif text-4xl md:text-5xl tracking-tight"
                style={{ color: "#1E2D2A" }}
              >
                What{" "}
                <span
                  className="font-display italic"
                  style={{ color: "#4E7A70" }}
                >
                  wasn't
                </span>
                <br />working
              </h2>
            </div>
            <div className="md:col-span-8">
              <p
                className="font-sans leading-relaxed text-base md:text-lg font-light max-w-2xl"
                style={{ color: "#4D6660" }}
              >
                Before defining any solution, I mapped the core friction points
                in how contractors actually moved through estimation work.
                Three recurring patterns shaped everything that followed.
              </p>
            </div>
          </div>

          {/* Thin rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="h-px origin-left"
            style={{ backgroundColor: "rgba(78,122,112,0.2)" }}
          />

          {/* Problem blocks */}
          <div className="flex flex-col gap-32 mt-4">

            {/* ── Problem 01 — 3 stacked videos ── */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16"
            >
              {/* Text */}
              <div className="w-full lg:w-2/5 flex flex-col gap-6 lg:sticky lg:top-32">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-px" style={{ backgroundColor: "rgba(78,122,112,0.4)" }} />
                  <span
                    className="font-sans text-[10px] uppercase tracking-[0.3em]"
                    style={{ color: "#4E7A70" }}
                  >
                    Problem 01
                  </span>
                </div>
                <h4
                  className="font-serif leading-tight"
                  style={{ fontSize: "28px", color: "#1E2D2A" }}
                >
                  Fragmented view and cost review
                </h4>
                <p
                  className="font-sans leading-relaxed text-base font-light"
                  style={{ color: "#4D6660" }}
                >
                  Contractors were still relying on spreadsheet-heavy, manual
                  workflows to review estimates. Drawings, room data, cost
                  breakdowns, and version changes lived in separate places,
                  making it slow and cognitively demanding to understand what
                  changed, where it came from, and how it affected cost.
                </p>
                {/* Keyword chips */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {["spreadsheet-heavy", "fragmented review", "manual workflow", "hard to trace cost impact"].map((kw) => (
                    <span
                      key={kw}
                      className="font-sans text-[11px] tracking-wide px-3 py-1 rounded-full"
                      style={{
                        background: "rgba(78,122,112,0.08)",
                        color: "#4E7A70",
                        border: "1px solid rgba(78,122,112,0.18)",
                      }}
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* 3 stacked videos with captions */}
              <div className="w-full lg:w-3/5 flex flex-col gap-8">
                {[
                  { src: "/videos/view_pb_1.mp4", caption: "Estimators often start by manually building spreadsheets just to organize work categories and cost structure." },
                  { src: "/videos/view_pb_2.mov", caption: "As projects grow, a single estimate can expand into multiple sections, forcing users to manage dense tables and cross-check information across screens." },
                  { src: "/videos/view_pb_3.mov", caption: "Manually entering total pricing and calculations is not only time-consuming, but also increases the risk of errors." },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col gap-3">
                    <div
                      className="relative rounded-xl overflow-hidden border transition-all duration-700 hover:shadow-xl"
                      style={{
                        background: "#fff",
                        borderColor: "rgba(78,122,112,0.15)",
                        boxShadow: "0 2px 16px rgba(30,45,42,0.06)",
                      }}
                    >
                      <video
                        src={item.src}
                        className="w-full h-auto block"
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                      <div
                        className="absolute inset-0 rounded-xl pointer-events-none"
                        style={{ border: "1px solid rgba(78,122,112,0.08)" }}
                      />
                    </div>
                    <p
                      className="font-sans text-[13px] leading-relaxed font-light px-1"
                      style={{ color: "#6B8A83" }}
                    >
                      {item.caption}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── Problem 02 — reversed (video left, text right) ── */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col lg:flex-row-reverse items-start gap-12 lg:gap-16"
            >
              {/* Text */}
              <div className="w-full lg:w-2/5 flex flex-col gap-6 lg:sticky lg:top-32">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-px" style={{ backgroundColor: "rgba(78,122,112,0.4)" }} />
                  <span
                    className="font-sans text-[10px] uppercase tracking-[0.3em]"
                    style={{ color: "#4E7A70" }}
                  >
                    Problem 02
                  </span>
                </div>
                <h4
                  className="font-serif leading-tight"
                  style={{ fontSize: "28px", color: "#1E2D2A" }}
                >
                  Manual revision comparison
                </h4>
                <p
                  className="font-sans leading-relaxed text-base font-light"
                  style={{ color: "#4D6660" }}
                >
                  Revisions were frequent, but comparing them was still a manual
                  process. Users needed a faster way to understand how one
                  version changed scope and cost, which made comparison a core
                  decision-making need rather than a secondary feature.
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {["revisions are frequent", "hard to compare versions", "cost impact unclear", "comparison is a decision-support need"].map((kw) => (
                    <span
                      key={kw}
                      className="font-sans text-[11px] tracking-wide px-3 py-1 rounded-full"
                      style={{
                        background: "rgba(78,122,112,0.08)",
                        color: "#4E7A70",
                        border: "1px solid rgba(78,122,112,0.18)",
                      }}
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Single video */}
              <div className="w-full lg:w-3/5">
                <div
                  className="relative rounded-xl overflow-hidden border transition-all duration-700 hover:shadow-xl"
                  style={{
                    background: "#fff",
                    borderColor: "rgba(78,122,112,0.15)",
                    boxShadow: "0 2px 16px rgba(30,45,42,0.06)",
                  }}
                >
                  <video
                    src="/videos/compare_pb.mp4"
                    className="w-full h-auto block"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                  <div
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    style={{ border: "1px solid rgba(78,122,112,0.08)" }}
                  />
                </div>
              </div>
            </motion.div>

            {/* ── Problem 03 — video + image stacked ── */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16"
            >
              {/* Text */}
              <div className="w-full lg:w-2/5 flex flex-col gap-6 lg:sticky lg:top-32">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-px" style={{ backgroundColor: "rgba(78,122,112,0.4)" }} />
                  <span
                    className="font-sans text-[10px] uppercase tracking-[0.3em]"
                    style={{ color: "#4E7A70" }}
                  >
                    Problem 03
                  </span>
                </div>
                <h4
                  className="font-serif leading-tight"
                  style={{ fontSize: "28px", color: "#1E2D2A" }}
                >
                  Slow symbol search in dense drawings
                </h4>
                <p
                  className="font-sans leading-relaxed text-base font-light"
                  style={{ color: "#4D6660" }}
                >
                  The problem was not a lack of AI capability, but friction in
                  using it. Users still had to search through dense drawings
                  manually, cross-reference legends, and count symbols by hand,
                  while also figuring out which scan tool could help them do it
                  fastest.
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {["dense drawings", "manual symbol search", "cross-referencing legend", "tool discoverability", "repetitive takeoff work"].map((kw) => (
                    <span
                      key={kw}
                      className="font-sans text-[11px] tracking-wide px-3 py-1 rounded-full"
                      style={{
                        background: "rgba(78,122,112,0.08)",
                        color: "#4E7A70",
                        border: "1px solid rgba(78,122,112,0.18)",
                      }}
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Video + image stacked */}
              <div className="w-full lg:w-3/5 flex flex-col gap-4">
                <div
                  className="relative rounded-xl overflow-hidden border transition-all duration-700 hover:shadow-xl"
                  style={{
                    background: "#fff",
                    borderColor: "rgba(78,122,112,0.15)",
                    boxShadow: "0 2px 16px rgba(30,45,42,0.06)",
                  }}
                >
                  <video
                    src="/videos/symbol_pb_1.mp4"
                    className="w-full h-auto block"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                  <div
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    style={{ border: "1px solid rgba(78,122,112,0.08)" }}
                  />
                </div>
                <div
                  className="relative rounded-xl overflow-hidden border transition-all duration-700 hover:shadow-xl"
                  style={{
                    background: "#fff",
                    borderColor: "rgba(78,122,112,0.15)",
                    boxShadow: "0 2px 16px rgba(30,45,42,0.06)",
                  }}
                >
                  <img
                    src="/images/ai_symbolfinder.png"
                    alt="AI Symbol Finder interface"
                    className="w-full h-auto block"
                  />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── HMW Bridge ─────────────────────────────────────────── */}
      <section
        className="py-32 border-y relative overflow-hidden"
        style={{
          backgroundColor: "#fff",
          borderColor: "rgba(78,122,112,0.12)",
        }}
      >
        <div className="px-6 sm:px-12 md:px-24 max-w-[900px] mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              className="font-sans text-[10px] uppercase tracking-[0.4em] mb-8 block"
              style={{ color: "#4E7A70" }}
            >
              Design question
            </span>
            <h2
              className="font-serif leading-tight"
              style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", color: "#1E2D2A" }}
            >
              How might we give contractors a{" "}
              <span className="font-display italic" style={{ color: "#4E7A70" }}>
                single, structured workspace
              </span>{" "}
              where drawings, cost data, and revisions are connected — so estimation feels less like{" "}
              <span className="font-display italic" style={{ color: "#4E7A70" }}>
                assembly
              </span>{" "}
              and more like decision-making?
            </h2>
          </motion.div>
        </div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-px rotate-[-2deg]"
          style={{ background: "linear-gradient(to right, transparent, rgba(78,122,112,0.1), transparent)" }}
        />
      </section>

      {/* ── Solution ─────────────────────────────────────────── */}
      <section className="py-32">

        {/* Section header — constrained */}
        <div className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-24 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
            <div className="md:col-span-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-4xl md:text-5xl tracking-tight"
                style={{ color: "#1E2D2A" }}
              >
                The{" "}
                <span className="font-display italic" style={{ color: "#4E7A70" }}>
                  solution
                </span>
              </motion.h2>
            </div>
            <div className="md:col-span-8">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="font-sans leading-relaxed text-base md:text-lg font-light max-w-2xl"
                style={{ color: "#4D6660" }}
              >
                Each feature was designed as a direct response to the workflow
                frictions identified earlier — turning fragmented steps into a
                connected estimation workspace.
              </motion.p>
            </div>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="h-px origin-left mt-16"
            style={{ backgroundColor: "rgba(78,122,112,0.2)" }}
          />
        </div>

        {/* Feature blocks — Z-pattern: large video + side text */}
        <div className="flex flex-col gap-32 md:gap-44 max-w-[1400px] mx-auto px-6 sm:px-10 md:px-16">

          {/* ── Feature 01 — Revision Compare (text LEFT, video RIGHT) ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-10"
          >
            {/* Row: text + main video */}
            <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-12">
              {/* Text — narrow column */}
              <div className="w-full lg:w-[24%] flex flex-col gap-5 lg:sticky lg:top-32 lg:pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-px" style={{ backgroundColor: "rgba(78,122,112,0.4)" }} />
                  <span className="font-sans text-[10px] uppercase tracking-[0.3em]" style={{ color: "#4E7A70" }}>Feature 01</span>
                </div>
                <h4 className="font-serif leading-tight" style={{ fontSize: "28px", color: "#1E2D2A" }}>
                  Revision Compare
                </h4>
                <p className="font-sans leading-relaxed text-[15px] font-light" style={{ color: "#4D6660" }}>
                  Side-by-side version comparison for room area, material cost,
                  and total cost deltas — followed by PDF comparison for
                  annotation, page alignment, and export.
                </p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {["version deltas", "cost comparison", "PDF annotation", "page alignment"].map((kw) => (
                    <span key={kw} className="font-sans text-[11px] tracking-wide px-3 py-1 rounded-full"
                      style={{ background: "rgba(78,122,112,0.08)", color: "#4E7A70", border: "1px solid rgba(78,122,112,0.18)" }}>{kw}</span>
                  ))}
                </div>
              </div>
              {/* Video — dominant */}
              <div className="w-full lg:w-[76%] flex flex-col gap-5">
                <div className="relative rounded-2xl overflow-hidden transition-all duration-700 hover:shadow-2xl"
                  style={{ boxShadow: "0 4px 30px rgba(30,45,42,0.08)" }}>
                  <video src="/videos/solution_1.mp4" className="w-full h-auto block" autoPlay loop muted playsInline />
                </div>
                <p className="font-sans text-[13px] leading-relaxed font-light px-1" style={{ color: "#6B8A83" }}>
                  Side-by-side comparison surfaces room-level deltas across area, material cost, and totals — making scope changes immediately visible.
                </p>
              </div>
            </div>
            {/* Second video — full width within container */}
            <div className="lg:pl-[calc(24%+3rem)]">
              <div className="relative rounded-2xl overflow-hidden transition-all duration-700 hover:shadow-2xl"
                style={{ boxShadow: "0 4px 30px rgba(30,45,42,0.08)" }}>
                <video src="/videos/s_compare.mp4" className="w-full h-auto block" autoPlay loop muted playsInline />
              </div>
              <p className="font-sans text-[13px] leading-relaxed font-light px-1 mt-3" style={{ color: "#6B8A83" }}>
                PDF comparison lets users overlay revisions, annotate differences, and export aligned pages for stakeholder review.
              </p>
            </div>
          </motion.div>

          {/* ── Feature 02 — Estimation Table (text RIGHT, video LEFT) ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-col lg:flex-row-reverse items-start gap-10 lg:gap-12">
              <div className="w-full lg:w-[24%] flex flex-col gap-5 lg:sticky lg:top-32 lg:pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-px" style={{ backgroundColor: "rgba(78,122,112,0.4)" }} />
                  <span className="font-sans text-[10px] uppercase tracking-[0.3em]" style={{ color: "#4E7A70" }}>Feature 02</span>
                </div>
                <h4 className="font-serif leading-tight" style={{ fontSize: "28px", color: "#1E2D2A" }}>
                  Editable Estimation Table
                </h4>
                <p className="font-sans leading-relaxed text-[15px] font-light" style={{ color: "#4D6660" }}>
                  An editable table that lets users adjust room-level parameters
                  and customize quality tiers like Economy, Comfort, and Luxury
                  — while seeing cost impact update in real time.
                </p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {["room-level editing", "quality tiers", "real-time cost", "structured data"].map((kw) => (
                    <span key={kw} className="font-sans text-[11px] tracking-wide px-3 py-1 rounded-full"
                      style={{ background: "rgba(78,122,112,0.08)", color: "#4E7A70", border: "1px solid rgba(78,122,112,0.18)" }}>{kw}</span>
                  ))}
                </div>
              </div>
              <div className="w-full lg:w-[76%]">
                <div className="relative rounded-2xl overflow-hidden transition-all duration-700 hover:shadow-2xl"
                  style={{ boxShadow: "0 4px 30px rgba(30,45,42,0.08)" }}>
                  <video src="/videos/view_s1.mp4" className="w-full h-auto block" autoPlay loop muted playsInline />
                </div>
                <p className="font-sans text-[13px] leading-relaxed font-light px-1 mt-3" style={{ color: "#6B8A83" }}>
                  Users can adjust room dimensions, select quality tiers, and see updated cost breakdowns without leaving the estimation view.
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── Feature 03 — Room Scan (text LEFT, video RIGHT) ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-12">
              <div className="w-full lg:w-[24%] flex flex-col gap-5 lg:sticky lg:top-32 lg:pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-px" style={{ backgroundColor: "rgba(78,122,112,0.4)" }} />
                  <span className="font-sans text-[10px] uppercase tracking-[0.3em]" style={{ color: "#4E7A70" }}>Feature 03</span>
                </div>
                <h4 className="font-serif leading-tight" style={{ fontSize: "28px", color: "#1E2D2A" }}>
                  Room Scan
                </h4>
                <p className="font-sans leading-relaxed text-[15px] font-light" style={{ color: "#4D6660" }}>
                  Room Scan automatically brings plan data into the table,
                  turning scanned drawings into editable estimation inputs —
                  reducing manual entry and bridging the gap between drawings
                  and structured cost data.
                </p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {["AI-assisted scan", "drawing-to-table", "auto-populate", "reduced manual entry"].map((kw) => (
                    <span key={kw} className="font-sans text-[11px] tracking-wide px-3 py-1 rounded-full"
                      style={{ background: "rgba(78,122,112,0.08)", color: "#4E7A70", border: "1px solid rgba(78,122,112,0.18)" }}>{kw}</span>
                  ))}
                </div>
              </div>
              <div className="w-full lg:w-[76%]">
                <div className="relative rounded-2xl overflow-hidden transition-all duration-700 hover:shadow-2xl"
                  style={{ boxShadow: "0 4px 30px rgba(30,45,42,0.08)" }}>
                  <video src="/videos/interactive_table.mp4" className="w-full h-auto block" autoPlay loop muted playsInline />
                </div>
                <p className="font-sans text-[13px] leading-relaxed font-light px-1 mt-3" style={{ color: "#6B8A83" }}>
                  Scanned floor plan data flows directly into the estimation table, turning drawings into editable, structured inputs.
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── Feature 04 — Symbol Finder (text RIGHT, video LEFT) ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-col lg:flex-row-reverse items-start gap-10 lg:gap-12">
              <div className="w-full lg:w-[24%] flex flex-col gap-5 lg:sticky lg:top-32 lg:pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-px" style={{ backgroundColor: "rgba(78,122,112,0.4)" }} />
                  <span className="font-sans text-[10px] uppercase tracking-[0.3em]" style={{ color: "#4E7A70" }}>Feature 04</span>
                </div>
                <h4 className="font-serif leading-tight" style={{ fontSize: "28px", color: "#1E2D2A" }}>
                  Symbol Finder
                </h4>
                <p className="font-sans leading-relaxed text-[15px] font-light" style={{ color: "#4D6660" }}>
                  Symbol Finder helps users quickly locate specific symbols in
                  dense drawings, reducing manual searching and repetitive
                  takeoff work — turning a tedious cross-referencing task into
                  a focused, AI-assisted scan.
                </p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {["symbol detection", "dense drawing support", "AI-assisted", "faster takeoff"].map((kw) => (
                    <span key={kw} className="font-sans text-[11px] tracking-wide px-3 py-1 rounded-full"
                      style={{ background: "rgba(78,122,112,0.08)", color: "#4E7A70", border: "1px solid rgba(78,122,112,0.18)" }}>{kw}</span>
                  ))}
                </div>
              </div>
              <div className="w-full lg:w-[76%]">
                <div className="relative rounded-2xl overflow-hidden transition-all duration-700 hover:shadow-2xl"
                  style={{ boxShadow: "0 4px 30px rgba(30,45,42,0.08)" }}>
                  <video src="/videos/symbol_s.mp4" className="w-full h-auto block" autoPlay loop muted playsInline />
                </div>
                <p className="font-sans text-[13px] leading-relaxed font-light px-1 mt-3" style={{ color: "#6B8A83" }}>
                  Users select a symbol type and the AI highlights all matching instances across the drawing, replacing manual counting and cross-referencing.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── Design Process (NDA) ────────────────────────────── */}
      <section className="py-32 relative overflow-hidden" style={{ backgroundColor: "#fff" }}>
        <div className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-24">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-20"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
              <div className="md:col-span-4">
                <h2
                  className="font-serif text-4xl md:text-5xl tracking-tight"
                  style={{ color: "#1E2D2A" }}
                >
                  Design{" "}
                  <span className="font-display italic" style={{ color: "#4E7A70" }}>
                    process
                  </span>
                </h2>
              </div>
              <div className="md:col-span-7 md:col-start-6 flex flex-col gap-5">
                <p
                  className="font-sans leading-relaxed text-base md:text-lg font-light"
                  style={{ color: "#4D6660" }}
                >
                  This project involved detailed research, workflow mapping,
                  wireframing, and iterative design — work that I'm proud of
                  but unable to share publicly due to an NDA.
                </p>
                <p
                  className="font-sans leading-relaxed text-[15px] font-light"
                  style={{ color: "#6B8A83" }}
                >
                  If you're interested in learning more about my process,
                  decision-making, or how I approached specific challenges,
                  I'd be happy to walk through it in a conversation.
                </p>
              </div>
            </div>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="h-px origin-left mt-16"
              style={{ backgroundColor: "rgba(78,122,112,0.15)" }}
            />
          </motion.div>

          {/* Blurred artifact grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="relative"
          >
            {/* Artifact images — blurred */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Large artifact — NDA.png */}
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{ boxShadow: "0 2px 20px rgba(30,45,42,0.05)" }}
              >
                <img
                  src="/images/NDA.png"
                  alt="Protected design process artifact"
                  className="w-full h-auto block"
                  style={{ filter: "blur(18px) saturate(0.6) brightness(1.04)", transform: "scale(1.08)" }}
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(135deg, rgba(244,246,245,0.3), rgba(78,122,112,0.06))" }}
                />
              </div>

              {/* Second artifact — NDA_1.png */}
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{ boxShadow: "0 2px 20px rgba(30,45,42,0.05)" }}
              >
                <img
                  src="/images/NDA_1.png"
                  alt="Protected design process artifact"
                  className="w-full h-auto block"
                  style={{ filter: "blur(18px) saturate(0.6) brightness(1.04)", transform: "scale(1.08)" }}
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(135deg, rgba(244,246,245,0.3), rgba(78,122,112,0.06))" }}
                />
              </div>
            </div>

            {/* Placeholder artifact rows — abstract blocks */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {[
                { h: "180px", bg: "rgba(78,122,112,0.04)", border: "rgba(78,122,112,0.08)" },
                { h: "140px", bg: "rgba(78,122,112,0.03)", border: "rgba(78,122,112,0.06)" },
                { h: "160px", bg: "rgba(78,122,112,0.05)", border: "rgba(78,122,112,0.07)" },
              ].map((block, i) => (
                <div
                  key={i}
                  className="rounded-xl"
                  style={{
                    height: block.h,
                    background: block.bg,
                    border: `1px solid ${block.border}`,
                  }}
                >
                  {/* Faux content lines */}
                  <div className="p-5 flex flex-col gap-3 opacity-30">
                    <div className="h-2 rounded-full w-[60%]" style={{ backgroundColor: "rgba(78,122,112,0.2)" }} />
                    <div className="h-2 rounded-full w-[80%]" style={{ backgroundColor: "rgba(78,122,112,0.15)" }} />
                    <div className="h-2 rounded-full w-[45%]" style={{ backgroundColor: "rgba(78,122,112,0.12)" }} />
                    <div className="h-2 rounded-full w-[70%] mt-2" style={{ backgroundColor: "rgba(78,122,112,0.1)" }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Centered NDA badge overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center gap-3 px-10 py-8 rounded-2xl backdrop-blur-md"
                style={{
                  background: "rgba(255,255,255,0.85)",
                  boxShadow: "0 8px 40px rgba(30,45,42,0.1)",
                  border: "1px solid rgba(78,122,112,0.12)",
                }}
              >
                {/* Lock icon */}
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4E7A70" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span
                  className="font-sans text-[11px] uppercase tracking-[0.35em] mt-1"
                  style={{ color: "#4E7A70" }}
                >
                  Protected under NDA
                </span>
                <span
                  className="font-sans text-[13px] font-light text-center max-w-[260px]"
                  style={{ color: "#6B8A83" }}
                >
                  Full process available upon request
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Why Success Mattered ─────────────────────────────── */}
      <section
        className="py-28 relative overflow-hidden"
        style={{ backgroundColor: "#F4F6F5" }}
      >
        <div className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px" style={{ backgroundColor: "rgba(78,122,112,0.4)" }} />
              <span className="font-sans text-[10px] uppercase tracking-[0.3em]" style={{ color: "#4E7A70" }}>
                Impact
              </span>
            </div>
            <h2
              className="font-serif text-4xl md:text-5xl tracking-tight mb-16"
              style={{ color: "#1E2D2A" }}
            >
              Why success{" "}
              <span className="font-display italic" style={{ color: "#4E7A70" }}>
                mattered
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20"
          >
            {/* Metric card — $3.5M */}
            <div className="flex flex-col gap-4">
              <span
                className="font-serif tracking-tight"
                style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)", color: "#4E7A70", lineHeight: 1 }}
              >
                $3.5M
              </span>
              <p className="font-sans text-[15px] leading-relaxed font-light max-w-md" style={{ color: "#4D6660" }}>
                Quotr's core workflows were actively used during a critical
                seed-stage period, helping the company demonstrate real product
                value as it went on to raise $3.5M in funding.
              </p>
            </div>

            {/* Metric card — 90% */}
            <div className="flex flex-col gap-4">
              <span
                className="font-serif tracking-tight"
                style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)", color: "#4E7A70", lineHeight: 1 }}
              >
                90%
              </span>
              <p className="font-sans text-[15px] leading-relaxed font-light max-w-md" style={{ color: "#4D6660" }}>
                At the product level, speed was a key measure of success —
                the platform was positioned to make parts of the estimation
                workflow up to 90% faster than traditional manual processes.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Reflection ────────────────────────────────────────── */}
      <section className="py-32" style={{ backgroundColor: "#fff" }}>
        <div className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-20"
          >
            <h2
              className="font-serif text-4xl md:text-5xl tracking-tight"
              style={{ color: "#1E2D2A" }}
            >
              Reflection
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="h-px origin-left mt-10"
              style={{ backgroundColor: "rgba(78,122,112,0.15)" }}
            />
          </motion.div>

          <div className="flex flex-col gap-16 md:gap-20">
            {[
              {
                num: "01",
                title: "Clarity is part of trust",
                body: "In complex B2B workflows, users will not rely on AI unless they can understand the output, verify it, and make changes with confidence. Designing for clarity wasn't a nice-to-have — it was the foundation of adoption.",
              },
              {
                num: "02",
                title: "Good workflow design is about tradeoffs, not feature count",
                body: "The goal was not to add more features, but to make the most important paths — reviewing, comparing, and acting on estimates — easier to follow. Every decision involved choosing what to surface and what to defer.",
              },
              {
                num: "03",
                title: "The output matters as much as the interface",
                body: "For products like Quotr, trust is shaped not only by the screens themselves, but also by the clarity and credibility of the final quotation and cost output. The deliverable is part of the experience.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8"
              >
                <div className="md:col-span-1">
                  <span
                    className="font-sans text-[13px] tabular-nums font-light"
                    style={{ color: "#4E7A70" }}
                  >
                    {item.num}
                  </span>
                </div>
                <div className="md:col-span-3">
                  <h4
                    className="font-serif leading-snug"
                    style={{ fontSize: "22px", color: "#1E2D2A" }}
                  >
                    {item.title}
                  </h4>
                </div>
                <div className="md:col-span-7 md:col-start-6">
                  <p
                    className="font-sans text-[15px] leading-relaxed font-light"
                    style={{ color: "#4D6660" }}
                  >
                    {item.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Next Steps ────────────────────────────────────────── */}
      <section
        className="py-28"
        style={{ backgroundColor: "#F4F6F5" }}
      >
        <div className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8"
          >
            <div className="md:col-span-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px" style={{ backgroundColor: "rgba(78,122,112,0.4)" }} />
                <span className="font-sans text-[10px] uppercase tracking-[0.3em]" style={{ color: "#4E7A70" }}>
                  Looking ahead
                </span>
              </div>
              <h2
                className="font-serif text-4xl md:text-5xl tracking-tight"
                style={{ color: "#1E2D2A" }}
              >
                Next{" "}
                <span className="font-display italic" style={{ color: "#4E7A70" }}>
                  steps
                </span>
              </h2>
            </div>

            <div className="md:col-span-7 md:col-start-6 flex flex-col gap-6">
              <p
                className="font-sans leading-relaxed text-base md:text-lg font-light"
                style={{ color: "#4D6660" }}
              >
                A key next step was refining the product's information
                architecture rather than simply removing features. Frequently
                used tools could be surfaced more clearly, while
                lower-frequency actions could be grouped into secondary layers.
              </p>
              <p
                className="font-sans leading-relaxed text-[15px] font-light"
                style={{ color: "#6B8A83" }}
              >
                Future improvements would also simplify parts of the AI
                toolkit and continue evolving the table layout to better adapt
                traditional contractor workflows into a clearer, more
                structured product experience.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Next Project Footer */}
      <section
        className="relative py-28 overflow-hidden"
        style={{ borderTop: "1px solid rgba(78,122,112,0.1)", backgroundColor: "#F0F8FF" }}
      >
        <div className="relative z-10 px-6 sm:px-12 md:px-24 max-w-[1200px] mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <div className="flex flex-col gap-4">
            <span className="font-sans text-[10px] uppercase tracking-[0.35em]" style={{ color: "#6B8A83" }}>
              Next case study
            </span>
            <h2
              className="font-serif tracking-tight leading-[0.9]"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "#1E2D2A" }}
            >
              Origami Robotics
            </h2>
            <p className="font-display italic text-lg max-w-sm" style={{ color: "#3D5A54" }}>
              Product design for a reconfigurable robotics platform — internal tooling and external product language.
            </p>
          </div>

          <Link
            to="/project/origami-robotics"
            className="group flex items-center gap-4 transition-all duration-500"
          >
            <span
              className="font-sans text-[11px] uppercase tracking-[0.3em] group-hover:opacity-70 transition-opacity"
              style={{ color: "#1E2D2A" }}
            >
              View case study
            </span>
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110"
              style={{ backgroundColor: "#1E2D2A", color: "#F0F8FF" }}
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
