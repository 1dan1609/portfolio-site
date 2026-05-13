import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Chat from "./components/Chat";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="bg-terminal-grid min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Footer />
      <Chat />
    </main>
  );
}
