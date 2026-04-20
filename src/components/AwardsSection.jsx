import './AwardsSection.css';

const AWARDS = [
  {
    year: '2023',
    title: 'Excellence in Real Estate Development',
    org: 'NAR India (National Association of Realtors)',
    description: 'Recognition for outstanding achievements in luxury real estate development and innovative architectural solutions.',
  },
  {
    year: '2022',
    title: 'Sustainable Development Excellence',
    org: "CREDAI (Confederation of Real Estate Developers' Associations of India)",
    description: 'Recognized for implementing eco-friendly practices and sustainable construction methodologies in luxury developments.',
  },
  {
    year: '2021',
    title: 'Innovation in Design Excellence',
    org: 'Karnataka Real Estate Regulatory Authority',
    description: 'Acknowledged for pioneering design-driven architecture and technology-integrated development projects.',
  },
  {
    year: '2020',
    title: 'Outstanding Project Management',
    org: 'NAREDCO (National Real Estate Development Council)',
    description: 'Honored for exceptional project execution and timely delivery of large-scale residential and commercial projects.',
  },
  {
    year: '2019',
    title: 'Customer Satisfaction Award',
    org: 'Indian Real Estate Forum',
    description: 'Awarded for maintaining highest standards of customer service and client satisfaction across all projects.',
  },
  {
    year: '2018',
    title: 'Best Luxury Villa Development',
    org: 'South India Property Awards',
    description: 'Recognized as the best luxury villa developer for creating premium residential spaces with world-class amenities.',
  },
];

export default function AwardsSection() {
  return (
    <section id="awards" className="awards-section">
      {/* Header */}
      <div className="awards-header">
        <div className="container">
          <p className="section-label">RECOGNITION</p>
          <h2 className="awards-title">
            Awards &amp; <em>Achievements</em>
          </h2>
          <div className="awards-title-rule">
            <span className="awards-title-dot" />
          </div>
          <p className="awards-subtitle">
            Recognition for exceptional achievements in luxury real estate development, innovative
            design, and outstanding contributions to the industry by leading organizations including
            NAR India and CREDAI.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="container">
        <div className="awards-grid reveal-stagger">
          {AWARDS.map((award) => (
            <article key={award.year} className="award-card">
              <div className="award-card__top">
                <div className="award-card__trophy" aria-hidden="true">🏆</div>
                <span className="award-card__year">{award.year}</span>
              </div>
              <h3 className="award-card__title">{award.title}</h3>
              <p className="award-card__org">{award.org}</p>
              <p className="award-card__desc">{award.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
