import { useAdmin } from '../admin/AdminContext';
import { useLiveProjects, useLiveSiteInfo } from '../hooks/useLiveData';
import './Footer.css';

const QUICK_LINKS = [
  { label: 'Home', id: 'hero' },
  { label: 'About Us', id: 'about' },
  { label: 'Projects', id: 'projects' },
  { label: 'Portfolio', id: 'portfolio' },
  { label: 'Services', id: 'services' },
  { label: 'Contact', id: 'contact' },
];

const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

export default function Footer() {
  const { siteInfo: adminSiteInfo, projects: adminProjects } = useAdmin();
  // Read directly from localStorage for guaranteed freshness
  const siteInfo = useLiveSiteInfo();
  const projects = useLiveProjects();

  const SOCIAL_LINKS = [
    { label: 'Instagram', icon: 'IG', href: siteInfo.instagram },
    { label: 'Twitter / X', icon: 'X', href: siteInfo.twitter },
    { label: 'LinkedIn', icon: 'LI', href: siteInfo.linkedin },
  ];

  return (
    <footer id="contact" className="footer">
      <div className="footer__top-border" aria-hidden="true" />

      <div className="footer__container">
        <div className="footer__grid">

          {/* Brand Column */}
          <div className="footer__col footer__col--brand">
            <div className="footer__brand">
              <img src="/winstonelogo.jpg" alt="Winstone Projects" className="footer__logo-img" />
              <div className="footer__brand-name">{siteInfo.companyName}</div>
            </div>
            <p className="footer__brand-tagline">{siteInfo.tagline}</p>
            <div className="footer__social">
              {SOCIAL_LINKS.map(({ label, icon, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="footer__social-link" aria-label={label}>
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__col">
            <h3 className="footer__col-heading">QUICK LINKS</h3>
            <ul className="footer__link-list" role="list">
              {QUICK_LINKS.map(({ label, id }) => (
                <li key={id}>
                  <button className="footer__link-btn" onClick={() => scrollToSection(id)}>
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Projects — dynamic from admin */}
          <div className="footer__col">
            <h3 className="footer__col-heading">OUR PROJECTS</h3>
            <ul className="footer__link-list" role="list">
              {projects.slice(0, 6).map((p) => (
                <li key={p.id}>
                  <a href="#projects" className="footer__link">
                    {p.shortName || p.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact — dynamic from admin */}
          <div className="footer__col">
            <h3 className="footer__col-heading">CONTACT US</h3>
            <address className="footer__contact">
              <p className="footer__contact-item">
                <span className="footer__contact-icon" aria-hidden="true">📍</span>
                {siteInfo.address}
              </p>
              <p className="footer__contact-item">
                <span className="footer__contact-icon" aria-hidden="true">📞</span>
                <a href={`tel:${siteInfo.phone}`} className="footer__link">{siteInfo.phone}</a>
              </p>
              <p className="footer__contact-item">
                <span className="footer__contact-icon" aria-hidden="true">✉️</span>
                <a href={`mailto:${siteInfo.email}`} className="footer__link">{siteInfo.email}</a>
              </p>
            </address>
            <a href={`https://wa.me/${siteInfo.whatsapp}`} target="_blank" rel="noopener noreferrer"
              className="footer__whatsapp-btn">
              CHAT ON WHATSAPP
            </a>
          </div>

        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__container">
          <div className="footer__bottom-inner">
            <p className="footer__copyright">© 2026 {siteInfo.companyName}. All Rights Reserved.</p>
            <p className="footer__bottom-tagline">Crafted with excellence · Bangalore, India · RERA Registered</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
    <footer id="contact" className="footer">
      <div className="footer__top-border" aria-hidden="true" />

      <div className="footer__container">
        <div className="footer__grid">

          {/* Brand Column */}
          <div className="footer__col footer__col--brand">
            <div className="footer__brand">
              <img src="/winstonelogo.jpg" alt="Winstone Projects" className="footer__logo-img" />
              <div className="footer__brand-name">Winstone Projects</div>
            </div>
            <p className="footer__brand-tagline">
              Redefining luxury living in Bangalore since 2018. Premium villas, residential, and commercial developments across India.
            </p>
            <div className="footer__social">
              {SOCIAL_LINKS.map(({ label, icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social-link"
                  aria-label={label}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="footer__col">
            <h3 className="footer__col-heading">QUICK LINKS</h3>
            <ul className="footer__link-list" role="list">
              {QUICK_LINKS.map(({ label, id }) => (
                <li key={id}>
                  <button
                    className="footer__link-btn"
                    onClick={() => scrollToSection(id)}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Projects Column */}
          <div className="footer__col">
            <h3 className="footer__col-heading">OUR PROJECTS</h3>
            <ul className="footer__link-list" role="list">
              {OUR_PROJECTS.map((name) => (
                <li key={name}>
                  <a href="#projects" className="footer__link">
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="footer__col">
            <h3 className="footer__col-heading">CONTACT US</h3>
            <address className="footer__contact">
              <p className="footer__contact-item">
                <span className="footer__contact-icon" aria-hidden="true">📍</span>
                Prestige Tech Park, Outer Ring Road, Bangalore – 560 103
              </p>
              <p className="footer__contact-item">
                <span className="footer__contact-icon" aria-hidden="true">📞</span>
                <a href="tel:+919845012345" className="footer__link">+91 98450 12345</a>
              </p>
              <p className="footer__contact-item">
                <span className="footer__contact-icon" aria-hidden="true">✉️</span>
                <a href="mailto:info@winstoneprojects.in" className="footer__link">info@winstoneprojects.in</a>
              </p>
            </address>
            <a
              href="https://wa.me/+919845012345"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__whatsapp-btn"
            >
              CHAT ON WHATSAPP
            </a>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer__bottom">
        <div className="footer__container">
          <div className="footer__bottom-inner">
            <p className="footer__copyright">© 2026 Winstone Projects. All Rights Reserved.</p>
            <p className="footer__bottom-tagline">Crafted with excellence · Bangalore, India · RERA Registered</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
