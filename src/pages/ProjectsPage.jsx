import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PROJECTS } from '../data/projects';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './ProjectsPage.css';

const CATEGORIES = ['All', 'Villa', 'Residential', 'Township', 'Commercial', 'Layout'];

export default function ProjectsPage() {
  const [active, setActive] = useState('All');
  const navigate = useNavigate();

  const filtered = active === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === active);

  return (
    <>
      <Navbar />
      <main className="projects-page">

        {/* Page hero */}
        <div className="projects-page__hero">
          <div className="projects-page__hero-bg" />
          <div className="projects-page__hero-overlay" />
          <div className="projects-page__hero-content">
            <p className="projects-page__eyebrow">OUR DEVELOPMENTS</p>
            <h1 className="projects-page__title">All Projects</h1>
            <p className="projects-page__sub">
              Explore every development — from signature villas to integrated townships
            </p>
          </div>
        </div>

        {/* Filter bar */}
        <div className="projects-page__filters-wrap">
          <div className="container">
            <div className="projects-page__filters">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`projects-page__filter-btn${active === cat ? ' active' : ''}`}
                  onClick={() => setActive(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="container">
          <div className="projects-page__grid">
            {filtered.map((project) => (
              <article
                key={project.id}
                className="pcard"
                onClick={() => navigate(`/projects/${project.slug}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && navigate(`/projects/${project.slug}`)}
              >
                <div className="pcard__img-wrap">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="pcard__img"
                    onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'; }}
                  />
                  <span className={`pcard__status pcard__status--${project.status.toLowerCase()}`}>
                    {project.status}
                  </span>
                  <div className="pcard__img-overlay" />
                </div>
                <div className="pcard__body">
                  <div className="pcard__meta">
                    <span className="pcard__type">{project.type}</span>
                    <span className="pcard__year">{project.year}</span>
                  </div>
                  <h2 className="pcard__name">{project.name}</h2>
                  <p className="pcard__location">
                    <span className="pcard__location-dot" />
                    {project.location}
                  </p>
                  <p className="pcard__desc">{project.description}</p>
                  <div className="pcard__footer">
                    <span className="pcard__cta">View Details →</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
