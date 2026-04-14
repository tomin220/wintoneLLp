import { useState } from 'react';
import './ServicesSection.css';

const services = [
  {
    num: '01',
    icon: '🏡',
    name: 'Luxury Villas',
    description: 'Private villas with premium finishes, smart-home features, and curated landscaping.',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80',
  },
  {
    num: '02',
    icon: '🏢',
    name: 'Residential Projects',
    description: 'High-rise apartments in prime Bangalore locations with world-class amenities.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
  },
  {
    num: '03',
    icon: '🌳',
    name: 'Land Development',
    description: 'BMRDA-approved plotted developments with clear titles in high-growth corridors.',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
  },
  {
    num: '04',
    icon: '🏬',
    name: 'Commercial Spaces',
    description: 'Grade-A office and retail spaces designed for modern businesses.',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
  },
  {
    num: '05',
    icon: '🏘️',
    name: 'Township Development',
    description: 'Integrated self-sufficient townships blending community, nature, and convenience.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  },
];

export default function ServicesSection() {
  const [active, setActive] = useState(0);

  return (
    <section id="services" className="services-section">
      <div className="services-layout">
        {/* Left: list */}
        <div className="services-list">
          <div className="services-list__header">
            <p className="section-label">WHAT WE BUILD</p>
            <h2 className="section-title">Our Services</h2>
          </div>
          {services.map((s, i) => (
            <button
              key={s.num}
              className={`service-row${active === i ? ' service-row--active' : ''}`}
              onClick={() => setActive(i)}
            >
              <span className="service-row__num">{s.num}</span>
              <span className="service-row__name">{s.name}</span>
              <span className="service-row__arrow">→</span>
            </button>
          ))}
        </div>

        {/* Right: image + detail */}
        <div className="services-detail">
          <div className="services-detail__img-wrap">
            <img
              key={active}
              src={services[active].image}
              alt={services[active].name}
              className="services-detail__img"
              onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'; }}
            />
            <div className="services-detail__img-overlay" />
            <div className="services-detail__caption">
              <span className="services-detail__icon" aria-hidden="true">{services[active].icon}</span>
              <div>
                <p className="services-detail__name">{services[active].name}</p>
                <p className="services-detail__desc">{services[active].description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
