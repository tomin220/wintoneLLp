import { useRef } from 'react';
import { useLiveSiteInfo } from '../hooks/useLiveData';
import './FounderSection.css';

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

function FounderSection() {
  const sectionRef = useRef(null);
  const siteInfo = useLiveSiteInfo();

  return (
    <section id="founder" className="founder" ref={sectionRef}>
      <div className="container">
        <div className="founder__grid">
          {/* Image column */}
          <div className="founder__image-wrap">
            <img
              src="/nayaz_hero-Dal7fLmT.jpg"
              alt={`${siteInfo.founderName}, ${siteInfo.founderTitle}`}
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
            <h2 className="founder__name">{siteInfo.founderName}</h2>
            <p className="founder__title">{siteInfo.founderTitle.toUpperCase()}</p>

            <blockquote className="founder__quote">
              "Excellence is not a destination, but a journey of continuous innovation and
              meaningful impact."
            </blockquote>

            {/* Milestones */}
            <div className="founder__stats">
              {MILESTONES.map((m) => (
                <div key={m.label} className="founder__stat">
                  <span className="founder__stat-icon">{m.icon}</span>
                  <span className="founder__stat-number">{m.label}</span>
                  <span className="founder__stat-label">{m.sub}</span>
                </div>
              ))}
            </div>

            {/* Bio from admin */}
            <p className="founder__bio">{siteInfo.founderBio}</p>

            {/* Leadership tags */}
            <div className="founder__tags">
              {TAGS.map((tag) => (
                <span key={tag} className="founder__tag">{tag}</span>
              ))}
            </div>

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
