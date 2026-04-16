import { useParams, useNavigate } from 'react-router-dom';
import { useLiveProjects } from '../hooks/useLiveData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './ProjectDetailPage.css';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const projects = useLiveProjects();
  const project = projects.find(p => p.slug === slug);
  const related = projects.filter(p => p.id !== project?.id && p.category === project?.category).slice(0, 3);

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
                  <a
                    href={project.brochureUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="detail-brochure-btn"
                  >
                    📄 Download Brochure
                  </a>
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

              {/* Gallery */}
              {project.gallery && project.gallery.length > 1 && (
                <section className="detail-section">
                  <h2 className="detail-section__title">Gallery</h2>
                  <div className="detail-gallery">
                    {project.gallery.map((src, i) => (
                      <div key={i} className="detail-gallery__item">
                        <img
                          src={src}
                          alt={`${project.name} — view ${i + 1}`}
                          className="detail-gallery__img"
                          onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'; }}
                        />
                      </div>
                    ))}
                  </div>
                </section>
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
    </>
  );
}
