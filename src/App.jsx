import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import './App.css'

import useCursorSpotlight from './hooks/useCursorSpotlight'
import useScrollProgress from './hooks/useScrollProgress'
import useScrollReveal from './hooks/useScrollReveal'

import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import MarqueeTicker from './components/MarqueeTicker'
import AboutSection from './components/AboutSection'
import ServicesSection from './components/ServicesSection'
import DevelopmentsSection from './components/DevelopmentsSection'
import PortfolioSection from './components/PortfolioSection'
import WhyChooseSection from './components/WhyChooseSection'
import FounderSection from './components/FounderSection'
import CTABanner from './components/CTABanner'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'

import ProjectsPage from './pages/ProjectsPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import AdminPage from './admin/AdminPage'

function HomePage() {
  useCursorSpotlight();
  useScrollReveal();
  const progress = useScrollProgress();

  // Parallax on hero bg
  useEffect(() => {
    const heroBg = document.querySelector('.hero__bg-img');
    if (!heroBg) return;
    const onScroll = () => {
      const y = window.scrollY;
      heroBg.style.transform = `scale(1.05) translateY(${y * 0.25}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <div className="scroll-progress" style={{ width: `${progress}%` }} />

      <Navbar />
      <main>
        <HeroSection />
        <MarqueeTicker />
        <AboutSection />
        <ServicesSection />
        <DevelopmentsSection />
        <PortfolioSection />
        <WhyChooseSection />
        <FounderSection />
        <CTABanner />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/projects/:slug" element={<ProjectDetailPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/admin/*" element={<AdminPage />} />
    </Routes>
  )
}
