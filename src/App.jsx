import { Routes, Route } from 'react-router-dom'
import './App.css'

import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import MarqueeTicker from './components/MarqueeTicker'
import AboutSection from './components/AboutSection'
import ServicesSection from './components/ServicesSection'
import DevelopmentsSection from './components/DevelopmentsSection'
import PortfolioSection from './components/PortfolioSection'
import WhyChooseSection from './components/WhyChooseSection'
import FounderSection from './components/FounderSection'
import TestimonialsSection from './components/TestimonialsSection'
import CTABanner from './components/CTABanner'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'

import ProjectsPage from './pages/ProjectsPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import AdminPage from './admin/AdminPage'

function HomePage() {
  return (
    <>
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
        <TestimonialsSection />
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
