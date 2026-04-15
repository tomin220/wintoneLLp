import { useNavigate } from 'react-router-dom';
import PortfolioCard from './PortfolioCard';
import './PortfolioSection.css';

const PORTFOLIO_ITEMS = [
  {
    image: '/1762605938009-y16mga.jpg',
    name: 'Arcadia Villa',
    location: 'Whitefield',
    type: 'VILLA',
    status: 'COMPLETED',
    year: '2023',
    description: 'A signature smart villa with private pool, home theatre, and lush landscaped grounds.',
  },
  {
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    name: 'The Residences',
    location: 'Koramangala',
    type: 'RESIDENTIAL',
    status: 'COMPLETED',
    year: '2023',
    description: 'Premium 3 & 4 BHK apartments with sky lounge, infinity pool, and gym. Delivered on schedule.',
  },
  {
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    name: 'Winstone Greens Phase 1',
    location: 'Sarjapur',
    type: 'LAYOUT',
    status: 'COMPLETED',
    year: '2022',
    description: 'BMRDA-approved plotted development. Phase 1 fully sold out. Gated community with underground utilities.',
  },
  {
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    name: 'Winston Square',
    location: 'Indiranagar',
    type: 'COMMERCIAL',
    status: 'COMPLETED',
    year: '2022',
    description: 'LEED Gold-certified Grade-A commercial complex with flexible floor plates for modern businesses.',
  },
  {
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    name: 'Heritage Palms',
    location: 'Chamundi Hills',
    type: 'VILLA',
    status: 'ONGOING',
    year: '2024',
    description: 'Collection of 12 heritage-inspired villas with private gardens and club access, overlooking the Chamundi Hills.',
  },
  {
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    name: 'Aero Valley Phase 1',
    location: 'Devanahalli',
    type: 'LAYOUT',
    status: 'ONGOING',
    year: '2024',
    description: 'Premium plotted development near Kempegowda International Airport. 180 plots, BMRDA approved.',
  },
];

export default function PortfolioSection() {
  const navigate = useNavigate();
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
          {PORTFOLIO_ITEMS.map((item) => (
            <PortfolioCard key={item.name} {...item} />
          ))}
        </div>

        <div className="portfolio-section__cta">
          <button
            className="btn btn--outline"
            onClick={() => { navigate('/projects'); window.scrollTo(0, 0); }}
          >
            VIEW FULL PORTFOLIO
          </button>
        </div>
      </div>
    </section>
  );
}
