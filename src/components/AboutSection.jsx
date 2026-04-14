import './AboutSection.css';

const PLACEHOLDER_SVG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='700' viewBox='0 0 600 700'%3E%3Crect width='600' height='700' fill='%231a1a1a'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Georgia,serif' font-size='18' fill='%23c9a84c'%3EWinstone Projects Bangalore development%3C/text%3E%3C/svg%3E";

const ABOUT_IMG_PRIMARY = '/winstone-projects-B0mWZxEY.jpg';
const ABOUT_IMG_FALLBACK = 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80';

function AboutSection() {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about__grid">
          {/* Text column */}
          <div className="about__text">
            <p className="section-label">Est. 2018 · BANGALORE'S PREMIER DEVELOPER · OUR STORY</p>
            <div className="gold-divider" />
            <h2 className="section-title">Crafting Premium Living Experiences in India</h2>
            <p className="about__body">
              Winstone Projects is a Bangalore-based real estate developer focused on delivering
              premium residential and commercial developments across India. We emphasize quality,
              innovation, and trust — building homes that resonate with the modern Indian lifestyle.
            </p>
            <blockquote className="about__vision">
              To be the most trusted luxury real estate developer in India, setting new standards
              for architectural excellence, sustainable design, and customer-centric living
              experiences.
            </blockquote>
            <button className="btn btn--outline">DISCOVER OUR STORY</button>
          </div>

          {/* Image column */}
          <div className="about__image-wrap">
            <img
              src={ABOUT_IMG_PRIMARY}
              alt="Winstone Projects Bangalore development"
              className="about__image"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = ABOUT_IMG_FALLBACK;
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
