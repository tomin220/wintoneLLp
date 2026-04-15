import { useNavigate } from 'react-router-dom';
import ProjectCard from './ProjectCard';
import { useAdmin } from '../admin/AdminContext';
import './DevelopmentsSection.css';

export default function DevelopmentsSection() {
  const navigate = useNavigate();
  const { projects } = useAdmin();
  const featured = projects.filter(p => p.featured);

  return (
    <section id="projects" className="developments-section">
      <div className="container">
        <div className="developments-header">
          <p className="section-label">OUR PORTFOLIO · Featured Developments</p>
          <h2 className="section-title">Featured Developments</h2>
          <div className="gold-divider" />
          <p className="section-subtitle">
            Explore our curated collection of luxury developments across Bangalore and South India
          </p>
        </div>
        <div className="developments-grid reveal-stagger">
          {featured.map((project) => (
            <ProjectCard
              key={project.id}
              image={project.image}
              name={project.name}
              type={project.type}
              location={project.location}
              description={project.description}
              onClick={() => { navigate(`/projects/${project.slug}`); window.scrollTo(0, 0); }}
            />
          ))}
        </div>
        <div className="developments-cta">
          <button className="btn btn--primary" onClick={() => { navigate('/projects'); window.scrollTo(0, 0); }}>
            VIEW ALL PROJECTS
          </button>
        </div>
      </div>
    </section>
  );
}
