import { useNavigate } from 'react-router-dom';
import PortfolioCard from './PortfolioCard';
import { useAdmin } from '../admin/AdminContext';
import './PortfolioSection.css';

export default function PortfolioSection() {
  const navigate = useNavigate();
  const { projects } = useAdmin();

  return (
    <section id="portfolio" className="portfolio-section">
      <div className="container">
        <div className="portfolio-section__header">
          <p className="section-label">COMPLETED &amp; ONGOING · Our Portfolio</p>
          <h2 className="section-title">Our Portfolio</h2>
          <p className="section-subtitle">
            A curated showcase of our finest villas, residences, commercial spaces, and plotted layouts
          </p>
        </div>

        <div className="portfolio-section__grid reveal-stagger">
          {projects.map((item) => (
            <PortfolioCard
              key={item.id}
              image={item.image}
              name={item.shortName || item.name}
              location={item.locationShort || item.location}
              type={item.type}
              status={item.status}
              year={item.year}
              description={item.description}
            />
          ))}
        </div>

        <div className="portfolio-section__cta">
          <button className="btn btn--outline" onClick={() => { navigate('/projects'); window.scrollTo(0, 0); }}>
            VIEW FULL PORTFOLIO
          </button>
        </div>
      </div>
    </section>
  );
}
