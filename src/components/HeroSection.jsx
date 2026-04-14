import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCounterAnimation from '../hooks/useCounterAnimation';
import './HeroSection.css';

const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

const stats = [
  { target: 12, label: 'Projects', suffix: '+' },
  { target: 500, label: 'Families', suffix: '+' },
  { target: 200, label: 'Acres', suffix: '+' },
  { target: 7, label: 'Years', suffix: '' },
];

function StatCounter({ target, label, suffix, sectionRef }) {
  const { count, done } = useCounterAnimation(target, 2200, sectionRef);
  return (
    <div className="hero__stat">
      <span className={`hero__stat-number${done ? ' stat-pulse' : ''}`}>
        {count}<span className="hero__stat-suffix">{suffix}</span>
      </span>
      <span className="hero__stat-label">{label}</span>
    </div>
  );
}

function HeroSection() {
  const sectionRef = useRef(null);
  const navigate = useNavigate();
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', interest: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save to localStorage for admin inbox
    const enquiry = {
      id: Date.now().toString(),
      name: formData.name,
      phone: formData.phone,
      interest: formData.interest,
      email: '',
      message: '',
      date: new Date().toISOString(),
      read: false,
      source: 'hero-modal',
    };
    try {
      const existing = JSON.parse(localStorage.getItem('wp_enquiries') || '[]');
      localStorage.setItem('wp_enquiries', JSON.stringify([enquiry, ...existing]));
    } catch {}
    setSubmitted(true);
    setTimeout(() => {
      setFormOpen(false);
      setSubmitted(false);
      setFormData({ name: '', phone: '', interest: '' });
    }, 2500);
  };

  return (
    <section id="hero" className="hero" ref={sectionRef}>

      {/* ── Full-bleed background ── */}
      <div className="hero__bg-img" />
      <div className="hero__bg-overlay" />

      {/* ── Centered content ── */}
      <div className="hero__inner">

        {/* Eyebrow */}
        <div className="hero__badge">
          <span className="hero__badge-dot" />
          BANGALORE, INDIA · EST. 2018
        </div>

        {/* Heading */}
        <h1 className="hero__heading">
          Where Homes<br />
          Become <em>Legacies</em>
        </h1>

        {/* Thin gold rule */}
        <div className="hero__rule" />

        {/* Subtext */}
        <p className="hero__subtext">
          Premium villas and developments crafted for modern Indian lifestyles —<br className="hero__br" />
          built with trust, delivered with excellence.
        </p>

        {/* CTAs */}
        <div className="hero__cta-group">
          <button
            className="btn btn--primary"
            onClick={() => { navigate('/projects'); window.scrollTo(0, 0); }}
          >
            Explore Projects
          </button>
          <button className="btn btn--ghost" onClick={() => setFormOpen(true)}>
            Enquire Now
          </button>
        </div>

        {/* Stats */}
        <div className="hero__stats">
          {stats.map((stat) => (
            <StatCounter
              key={stat.label}
              target={stat.target}
              label={stat.label}
              suffix={stat.suffix}
              sectionRef={sectionRef}
            />
          ))}
        </div>
      </div>

      {/* Floating property card — bottom right */}
      <div className="hero__float-card">
        <div className="hero__float-card-dot" />
        <div>
          <p className="hero__float-card-title">Arcadia Villas</p>
          <p className="hero__float-card-sub">Whitefield, Bangalore</p>
        </div>
        <span className="hero__float-card-badge">AVAILABLE</span>
      </div>

      {/* Scroll indicator */}
      <button
        className="hero__scroll"
        onClick={() => scrollToSection('about')}
        aria-label="Scroll down"
      >
        <span className="hero__scroll-line" />
        <span className="hero__scroll-text">SCROLL</span>
      </button>

      {/* ── Enquire Modal ── */}
      {formOpen && (
        <div className="hero__modal-backdrop" onClick={() => setFormOpen(false)}>
          <div
            className="hero__modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Enquiry form"
          >
            <button className="hero__modal-close" onClick={() => setFormOpen(false)} aria-label="Close">✕</button>

            {submitted ? (
              <div className="hero__modal-success">
                <span className="hero__modal-success-icon">✓</span>
                <h3>Thank You!</h3>
                <p>We'll reach out within 24 hours.</p>
              </div>
            ) : (
              <>
                <div className="hero__modal-header">
                  <p className="hero__modal-eyebrow">WINSTONE PROJECTS</p>
                  <h2 className="hero__modal-title">Schedule a Consultation</h2>
                  <p className="hero__modal-sub">Our experts will get back to you within 24 hours.</p>
                </div>
                <form className="hero__modal-form" onSubmit={handleSubmit}>
                  <div className="hero__modal-field">
                    <label htmlFor="enq-name">Full Name</label>
                    <input id="enq-name" type="text" placeholder="Rajesh Kumar" required
                      value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                  </div>
                  <div className="hero__modal-field">
                    <label htmlFor="enq-phone">Phone Number</label>
                    <input id="enq-phone" type="tel" placeholder="+91 98450 12345" required
                      value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                  </div>
                  <div className="hero__modal-field">
                    <label htmlFor="enq-interest">I'm interested in</label>
                    <select id="enq-interest" required value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}>
                      <option value="" disabled>Select a property type</option>
                      <option>Luxury Villas</option>
                      <option>Residential Apartments</option>
                      <option>Plotted Layouts</option>
                      <option>Commercial Spaces</option>
                      <option>Township Developments</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn--primary hero__modal-submit">
                    SEND ENQUIRY
                  </button>
                  <p className="hero__modal-note">
                    Or call us: <a href="tel:+919845012345">+91 98450 12345</a>
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default HeroSection;
