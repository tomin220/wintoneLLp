import './WhyChooseSection.css';

const differentiators = [
  {
    title: 'Deep Expertise in Indian Markets',
    description: "Unmatched understanding of Bangalore and South India's premium real estate landscape with a proven track record since 2018.",
  },
  {
    title: 'Prime Bangalore Locations',
    description: 'Exclusive developments in Whitefield, Koramangala, Indiranagar, Sarjapur Road, and other high-growth corridors.',
  },
  {
    title: 'Strong Investment Returns',
    description: "Strategic projects in Bangalore's fastest-growing micro-markets ensuring consistent appreciation and rental yields.",
  },
  {
    title: 'Architectural Excellence',
    description: 'Award-winning designs blending contemporary aesthetics with sustainable materials and smart-home technology.',
  },
  {
    title: 'Transparent & Client-First',
    description: 'End-to-end support from site selection to handover, with full legal transparency and RERA compliance.',
  },
  {
    title: 'Bangalore-Focused Expertise',
    description: 'Deep roots in Bangalore\'s premium real estate market — understanding every micro-market, regulation, and opportunity the city has to offer.',
  },
];

export default function WhyChooseSection() {
  return (
    <section id="why-choose" className="why-choose-section">
      {/* Full-width header */}
      <div className="why-choose-header">
        <div className="container">
          <p className="section-label">TRUST &amp; EXCELLENCE</p>
          <h2 className="why-choose-title">Why Choose<br /><em>Winstone Projects</em></h2>
        </div>
      </div>

      {/* Items */}
      <div className="container">
        <div className="why-choose-grid reveal-stagger">
          {differentiators.map((item, i) => (
            <div key={item.title} className="why-item">
              <span className="why-item__num">{String(i + 1).padStart(2, '0')}</span>
              <div className="why-item__body">
                <h3 className="why-item__title">{item.title}</h3>
                <p className="why-item__desc">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
