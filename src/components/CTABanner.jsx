import './CTABanner.css';

const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

export default function CTABanner() {
  return (
    <section id="cta" className="cta-banner">
      {/* Left: image */}
      <div className="cta-banner__image-side">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1000&q=80"
          alt="Luxury property"
          className="cta-banner__image"
          onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80'; }}
        />
        <div className="cta-banner__image-overlay" />
        <div className="cta-banner__image-tag">
          <span>BANGALORE'S MOST TRUSTED</span>
          <span>LUXURY DEVELOPER</span>
        </div>
      </div>

      {/* Right: content */}
      <div className="cta-banner__content-side">
        <p className="cta-banner__eyebrow">READY TO BEGIN?</p>
        <h2 className="cta-banner__heading">
          Own a Piece of<br />
          <em>Bangalore's Finest</em>
        </h2>
        <p className="cta-banner__sub">
          Connect with our experts to explore exclusive investment opportunities in India's most dynamic city.
        </p>
        <div className="cta-banner__actions">
          <button className="btn btn--primary" onClick={() => scrollToSection('contact-form')}>
            GET IN TOUCH
          </button>
          <button className="cta-banner__link" onClick={() => scrollToSection('portfolio')}>
            Explore Properties →
          </button>
        </div>
        <div className="cta-banner__trust">
          <span>✓ RERA Registered</span>
          <span>✓ BBMP Approved</span>
          <span>✓ 7+ Years of Excellence</span>
        </div>
      </div>
    </section>
  );
}
