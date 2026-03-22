import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { Intro } from "../components/Intro";
import { FeaturedWork } from "../components/FeaturedWork";
import { FinestWorks } from "../components/FinestWorks";
import { Footer } from "../components/Footer";

export function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Intro />
      <FeaturedWork />
      <FinestWorks />
      <Footer />
    </>
  );
}
