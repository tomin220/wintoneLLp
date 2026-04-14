import './ProjectCard.css';

const SVG_PLACEHOLDER = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='240' viewBox='0 0 400 240'%3E%3Crect width='400' height='240' fill='%231a1a1a'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-family='sans-serif' font-size='14'%3EImage unavailable%3C/text%3E%3C/svg%3E`;

function handleTilt(e) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const cx = rect.width / 2;
  const cy = rect.height / 2;
  const rotateX = ((y - cy) / cy) * -5;
  const rotateY = ((x - cx) / cx) * 5;
  card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
}

function resetTilt(e) {
  e.currentTarget.style.transform = '';
}

export default function ProjectCard({ image, name, type, location, description, onClick }) {
  return (
    <article
      className={`project-card tilt-card${onClick ? ' project-card--clickable' : ''}`}
      onClick={onClick}
      onMouseMove={handleTilt}
      onMouseLeave={resetTilt}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      <div className="project-card__image-wrap">
        <img
          src={image}
          alt={name}
          className="project-card__image"
          onError={(e) => { e.currentTarget.src = SVG_PLACEHOLDER; }}
        />
        {onClick && <div className="project-card__hover-cta">View Details →</div>}
      </div>
      <div className="project-card__content">
        <span className="project-card__type">{type}</span>
        <p className="project-card__location">{location}</p>
        <h3 className="project-card__name">{name}</h3>
        <p className="project-card__description">{description}</p>
      </div>
    </article>
  );
}
