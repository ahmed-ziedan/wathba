import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Footer from "@/components/sections/Footer";
import Packages from "@/components/sections/Packages";
import WhyWathba from "@/components/sections/WhyWathba";
import Portfolio from "@/components/sections/Portfolio";
import Contact from "@/components/sections/Contact";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <Navbar />
      <Hero />
      <Problem />
      <Packages />
      <Portfolio />

      <WhyWathba />

      <Contact />

      <Footer />
    </main>
  );
}
