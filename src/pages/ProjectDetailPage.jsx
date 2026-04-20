import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLiveProjects } from '../hooks/useLiveData';
import { saveEnquiry } from '../lib/enquiryService';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './ProjectDetailPage.css';

// ── Brochure Gate Modal ──────────────────────────────────────────────────────
function BrochureGate({ projectName, brochureUrl, onClose }) {
  const [form, setForm] = useState({ name: '', phone: '', interest: projectName || '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await saveEnquiry({
      name: form.name,
      phone: form.phone,
      interest: `Brochure: ${form.interest}`,
      email: '',
      message: `Requested brochure for ${projectName}`,
      source: 'brochure-gate',
    });
    setLoading(false);
    setSubmitted(true);
    // Auto-open PDF after 1.5s
    setTimeout(() => {
      window.open(brochureUrl, '_blank', 'noopener,noreferrer');
      onClose();
    }, 1500);
  };

  return (
    <div className="brochure-gate-backdrop" onClick={onClose}>
      <div className="brochure-gate" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="brochure-gate__close" onClick={onClose} aria-label="Close">✕</button>

        {submitted ? (
          <div className="brochure-gate__success">
            <div className="brochure-gate__success-icon">✓</div>
            <h3>Thank You!</h3>
            <p>Your brochure is opening now...</p>
          </div>
        ) : (
          <>
            <div className="brochure-gate__header">
              <span className="brochure-gate__icon">📄</span>
              <p className="brochure-gate__eyebrow">FREE DOWNLOAD</p>
              <h2 className="brochure-gate__title">Get the Brochure</h2>
              <p className="brochure-gate__sub">
                Share your details to instantly download the <strong>{projectName}</strong> brochure.
              </p>
            </div>
            <form className="brochure-gate__form" onSubmit={handleSubmit}>
              <div className="brochure-gate__field">
                <label htmlFor="bg-name">Full Name *</label>
                <input id="bg-name" type="text" placeholder="Rajesh Kumar" required
                  value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              </div>
              <div className="brochure-gate__field">
                <label htmlFor="bg-phone">Phone Number *</label>
                <input id="bg-phone" type="tel" placeholder="+91 98450 12345" required
                  value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
              </div>
              <button type="submit" className="btn btn--primary brochure-gate__submit" disabled={loading}>
                {loading ? 'Submitting...' : '📥 Download Brochure'}
              </button>
              <p className="brochure-gate__note">
                We'll also send you project updates. No spam.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function Gallery({ images, projectName }) {
  const [lightbox, setLightbox] = useState(null); // index of open image

  if (!images || images.length === 0) return null;

  const prev = () => setLightbox(i => (i - 1 + images.length) % images.length);
  const next = () => setLightbox(i => (i + 1) % images.length);

  return (
    <section className="detail-section">
      <h2 className="detail-section__title">Gallery</h2>

      {/* Thumbnail grid — max 4 visible, rest hidden behind "View All" */}
      <div className="gallery-grid">
        {images.slice(0, 4).map((src, i) => (
          <div
            key={i}
            className={`gallery-thumb${i === 3 && images.length > 4 ? ' gallery-thumb--more' : ''}`}
            onClick={() => setLightbox(i)}
          >
            <img
              src={src}
              alt={`${projectName} — ${i + 1}`}
              className="gallery-thumb__img"
              onError={e => { e.currentTarget.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=70'; }}
            />
            {i === 3 && images.length > 4 && (
              <div className="gallery-thumb__overlay">
                <span>+{images.length - 4}</span>
                <p>View All</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {images.length > 4 && (
        <button className="gallery-view-all" onClick={() => setLightbox(0)}>
          View All {images.length} Photos →
        </button>
      )}

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="gallery-lightbox" onClick={() => setLightbox(null)}>
          <div className="gallery-lightbox__inner" onClick={e => e.stopPropagation()}>
            <button className="gallery-lightbox__close" onClick={() => setLightbox(null)}>✕</button>
            <button className="gallery-lightbox__nav gallery-lightbox__nav--prev" onClick={prev}>‹</button>
            <img
              key={lightbox}
              src={images[lightbox]}
              alt={`${projectName} — ${lightbox + 1}`}
              className="gallery-lightbox__img"
              onError={e => { e.currentTarget.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80'; }}
            />
            <button className="gallery-lightbox__nav gallery-lightbox__nav--next" onClick={next}>›</button>
            <div className="gallery-lightbox__counter">{lightbox + 1} / {images.length}</div>
            {/* Thumbnail strip */}
            <div className="gallery-lightbox__strip">
              {images.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className={`gallery-lightbox__strip-thumb${i === lightbox ? ' active' : ''}`}
                  onClick={() => setLightbox(i)}
                  onError={e => { e.currentTarget.style.display = 'none'; }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const projects = useLiveProjects();
  const project = projects.find(p => p.slug === slug);
  const related = projects.filter(p => p.id !== project?.id && p.category === project?.category).slice(0, 3);
  const [showBrochureGate, setShowBrochureGate] = useState(false);

  if (!project) {
    return (
      <>
        <Navbar />
        <main className="detail-page detail-page--404">
          <div className="container">
            <h1>Project not found</h1>
            <button className="btn btn--primary" onClick={() => navigate('/projects')}>
              Back to Projects
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const scrollToContact = () => {
    navigate('/');
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <>
      <Navbar />
      <main className="detail-page">

        {/* Hero */}
        <div className="detail-hero">
          <img
            src={project.image}
            alt={project.name}
            className="detail-hero__img"
            onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80'; }}
          />
          <div className="detail-hero__overlay" />
          <div className="detail-hero__content">
            <button className="detail-hero__back" onClick={() => navigate('/projects')}>
              ← All Projects
            </button>
            <span className={`detail-hero__status detail-hero__status--${project.status.toLowerCase()}`}>
              {project.status}
            </span>
            <p className="detail-hero__type">{project.type}</p>
            <h1 className="detail-hero__title">{project.name}</h1>
            <p className="detail-hero__location">
              <span className="detail-hero__loc-dot" />
              {project.location}
            </p>
            <p className="detail-hero__tagline">{project.tagline}</p>
          </div>
        </div>

        {/* Body */}
        <div className="container">
          <div className="detail-body">

            {/* Left: description + highlights */}
            <div className="detail-main">
              <section className="detail-section">
                <h2 className="detail-section__title">About This Project</h2>
                <p className="detail-section__text">{project.fullDescription}</p>
                {project.brochureUrl && (
                  <button
                    className="detail-brochure-btn"
                    onClick={() => setShowBrochureGate(true)}
                  >
                    📄 Download Brochure
                  </button>
                )}
              </section>

              <section className="detail-section">
                <h2 className="detail-section__title">Project Highlights</h2>
                <ul className="detail-highlights">
                  {project.highlights.map((h) => (
                    <li key={h} className="detail-highlights__item">
                      <span className="detail-highlights__icon">✦</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Gallery — slideshow with lightbox */}
              {project.gallery && project.gallery.length > 0 && (
                <Gallery
                  images={[project.image, ...project.gallery.filter(u => u && u !== project.image)]}
                  projectName={project.name}
                />
              )}
            </div>

            {/* Right: specs + CTA */}
            <aside className="detail-sidebar">
              <div className="detail-specs">
                <h3 className="detail-specs__title">Project Specifications</h3>
                <dl className="detail-specs__list">
                  {Object.entries(project.specs).map(([key, val]) => (
                    <div key={key} className="detail-specs__row">
                      <dt className="detail-specs__key">{key}</dt>
                      <dd className="detail-specs__val">{val}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="detail-cta-card">
                <p className="detail-cta-card__label">INTERESTED IN THIS PROJECT?</p>
                <h3 className="detail-cta-card__title">Schedule a Site Visit</h3>
                <p className="detail-cta-card__text">
                  Our experts will walk you through every detail — from floor plans to financing options.
                </p>
                <button className="btn btn--primary detail-cta-card__btn" onClick={scrollToContact}>
                  ENQUIRE NOW
                </button>
                <a href="tel:+919845012345" className="detail-cta-card__phone">
                  +91 98450 12345
                </a>
              </div>
            </aside>
          </div>

          {/* Related projects */}
          {related.length > 0 && (
            <section className="detail-related">
              <h2 className="detail-related__title">Similar Projects</h2>
              <div className="detail-related__grid">
                {related.map((p) => (
                  <article
                    key={p.id}
                    className="detail-related__card"
                    onClick={() => { navigate(`/projects/${p.slug}`); window.scrollTo(0, 0); }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && navigate(`/projects/${p.slug}`)}
                  >
                    <div className="detail-related__img-wrap">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="detail-related__img"
                        onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80'; }}
                      />
                    </div>
                    <div className="detail-related__body">
                      <p className="detail-related__type">{p.type}</p>
                      <h3 className="detail-related__name">{p.name}</h3>
                      <p className="detail-related__loc">{p.location}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>

      </main>
      <Footer />
      {showBrochureGate && project.brochureUrl && (
        <BrochureGate
          projectName={project.name}
          brochureUrl={project.brochureUrl}
          onClose={() => setShowBrochureGate(false)}
        />
      )}
    </>
  );
}
