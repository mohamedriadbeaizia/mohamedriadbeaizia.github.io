import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Parcours } from "@/components/Parcours";
import { ProfileProvider } from "@/components/ProfileProvider";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";

export default function Home() {
  return (
    <ProfileProvider>
      <Hero />
      <About />
      <Skills />
      <Parcours />
      <Projects />
      <Contact />
    </ProfileProvider>
  );
}
