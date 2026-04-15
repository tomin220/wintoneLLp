import { useRef } from 'react';
import './FounderSection.css';

const PLACEHOLDER_SVG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='800' viewBox='0 0 600 800'%3E%3Crect width='600' height='800' fill='%231a1a1a'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Georgia,serif' font-size='18' fill='%23c9a84c'%3ENayaz Faiyaz Ahmed, Founder %26 Chairman%3C/text%3E%3C/svg%3E";

const MILESTONES = [
  { icon: '✦', label: 'Est. 2018', sub: 'Founded in Bangalore' },
  { icon: '◈', label: 'RERA Compliant', sub: 'All Projects Registered' },
  { icon: '❖', label: 'Client First', sub: 'Transparent Process' },
];

const TAGS = [
  'Luxury Real Estate',
  'Design-Driven Architecture',
  'Technology Integration',
  'Premium Development',
  'Vastu Compliant Homes',
  'Award-Winning Design',
];

function StatCounter({ target, label, sectionRef }) {
  const { count, done } = useCounterAnimation(target, 2000, sectionRef);
  return (
    <div className="founder__stat">
      <span className={`founder__stat-number${done ? ' stat-pulse' : ''}`}>{count}+</span>
      <span className="founder__stat-label">{label}</span>
    </div>
  );
}

function FounderSection() {
  const sectionRef = useRef(null);

  return (
    <section id="founder" className="founder" ref={sectionRef}>
      <div className="container">
        <div className="founder__grid">
          {/* Image column */}
          <div className="founder__image-wrap">
            <img
              src="/nayaz_hero-Dal7fLmT.jpg"
              alt="Nayaz Faiyaz Ahmed, Founder & Chairman"
              className="founder__image"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/nayaz_hero-Dal7fLmT.jpg.jpeg";
              }}
            />
          </div>

          {/* Text column */}
          <div className="founder__content">
            <p className="section-label">VISIONARY LEADERSHIP</p>
            <div className="gold-divider" />
            <h2 className="founder__name">Nayaz Faiyaz Ahmed</h2>
            <p className="founder__title">FOUNDER &amp; CHAIRMAN · WINSTONE GROUP</p>

            <blockquote className="founder__quote">
              "Excellence is not a destination, but a journey of continuous innovation and
              meaningful impact."
            </blockquote>

            {/* Milestones — replacing number stats */}
            <div className="founder__stats">
              {MILESTONES.map((m) => (
                <div key={m.label} className="founder__stat">
                  <span className="founder__stat-icon">{m.icon}</span>
                  <span className="founder__stat-number">{m.label}</span>
                  <span className="founder__stat-label">{m.sub}</span>
                </div>
              ))}
            </div>

            {/* Bio */}
            <p className="founder__bio">
              A visionary entrepreneur with a passion for transforming Bangalore's urban landscape.
              Since founding Winstone Projects in 2018, Nayaz has led the development of premium
              residential and commercial properties across Bangalore. His relentless pursuit of
              excellence, combined with deep respect for Indian architectural heritage, has
              positioned Winstone Projects as a trusted name in Bangalore's luxury real estate sector.
            </p>

            {/* Leadership tags */}
            <div className="founder__tags">
              {TAGS.map((tag) => (
                <span key={tag} className="founder__tag">{tag}</span>
              ))}
            </div>

            {/* Mission statement */}
            <blockquote className="founder__mission">
              "Homes should be more than just spaces to live in; they should be sanctuaries that
              inspire, comfort, and elevate the lives of those within."
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FounderSection;
