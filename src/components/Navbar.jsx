import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'HOME', id: 'hero', section: true },
  { label: 'ABOUT US', id: 'about', section: true },
  { label: 'PROJECTS', id: null, href: '/projects' },
  { label: 'PORTFOLIO', id: 'portfolio', section: true },
  { label: 'AWARDS', id: 'awards', section: true },
  { label: 'SERVICES', id: 'services', section: true },
  { label: 'CONTACT', id: 'contact', section: true },
];

const SOCIAL_LINKS = [
  { label: 'Instagram', icon: 'IG', href: 'https://instagram.com/winstoneprojects' },
  { label: 'Twitter / X', icon: 'X', href: 'https://twitter.com/winstoneprojects' },
  { label: 'LinkedIn', icon: 'LI', href: 'https://linkedin.com/company/winstoneprojects' },
];

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (link) => {
    setMenuOpen(false);
    if (link.href) {
      navigate(link.href);
      window.scrollTo(0, 0);
    } else if (link.id) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => scrollToSection(link.id), 300);
      } else {
        scrollToSection(link.id);
      }
    }
  };

  const handleLogoClick = () => {
    setMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      window.scrollTo(0, 0);
    } else {
      scrollToSection('hero');
    }
  };

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <div className="navbar__inner">

        {/* Logo */}
        <button className="navbar__brand" onClick={handleLogoClick} aria-label="Go to home">
          <img
            src="/winstonelogo.jpg"
            alt="Winstone Projects"
            className="navbar__logo-img"
          />
          <div className="navbar__brand-text">
            <span className="navbar__brand-name">Winstone Projects</span>
            <span className="navbar__brand-sub">LUXURY REAL ESTATE · BANGALORE</span>
          </div>
        </button>

        {/* Desktop nav links */}
        <ul className="navbar__links" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <button
                className={`navbar__link${link.href && location.pathname === link.href ? ' navbar__link--active' : ''}`}
                onClick={() => handleNavClick(link)}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Social + CTA */}
        <div className="navbar__right">
          <div className="navbar__social">
            {SOCIAL_LINKS.map(({ label, icon, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="navbar__social-link"
                aria-label={label}
              >
                {icon}
              </a>
            ))}
          </div>
          <button className="navbar__cta" onClick={() => handleNavClick({ id: 'contact' })}>
            ENQUIRE NOW
          </button>
        </div>

        {/* Hamburger */}
        <button
          className="navbar__hamburger"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span className={`navbar__hamburger-icon${menuOpen ? ' navbar__hamburger-icon--open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="navbar__mobile-menu">
          <ul role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <button className="navbar__mobile-link" onClick={() => handleNavClick(link)}>
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="navbar__mobile-footer">
            <div className="navbar__mobile-social">
              {SOCIAL_LINKS.map(({ label, icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="navbar__social-link"
                  aria-label={label}
                >
                  {icon}
                </a>
              ))}
            </div>
            <button className="navbar__cta" onClick={() => handleNavClick({ id: 'contact' })}>
              ENQUIRE NOW
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
