import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import './App.css'

import { AdminProvider } from './admin/AdminContext'
import useCursorSpotlight from './hooks/useCursorSpotlight'
import useScrollProgress from './hooks/useScrollProgress'
import useScrollReveal from './hooks/useScrollReveal'
import { useMagneticButtons, useSplitText, useShimmerLabels, useBorderBeam, usePageTransition } from './hooks/useReactBits'

import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import MarqueeTicker from './components/MarqueeTicker'
import AboutSection from './components/AboutSection'
import ServicesSection from './components/ServicesSection'
import DevelopmentsSection from './components/DevelopmentsSection'
import PortfolioSection from './components/PortfolioSection'
import WhyChooseSection from './components/WhyChooseSection'
import FounderSection from './components/FounderSection'
import AwardsSection from './components/AwardsSection'
import CTABanner from './components/CTABanner'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'

import ProjectsPage from './pages/ProjectsPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import AdminPage from './admin/AdminPage'

function HomePage() {
  useCursorSpotlight();
  useScrollReveal();
  useMagneticButtons();
  useSplitText();
  useShimmerLabels();
  useBorderBeam();
  usePageTransition();
  const progress = useScrollProgress();

  useEffect(() => {
    const heroBg = document.querySelector('.hero__bg-img');
    if (!heroBg) return;
    const onScroll = () => {
      heroBg.style.transform = `scale(1.05) translateY(${window.scrollY * 0.25}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
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
        <AwardsSection />
        <CTABanner />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <AdminProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/*" element={<AdminPage />} />
      </Routes>
    </AdminProvider>
  );
}
