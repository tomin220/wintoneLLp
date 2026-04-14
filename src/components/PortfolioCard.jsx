import './PortfolioCard.css';

const SVG_PLACEHOLDER = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='260' viewBox='0 0 400 260'%3E%3Crect width='400' height='260' fill='%231a1a1a'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-family='sans-serif' font-size='14'%3EImage unavailable%3C/text%3E%3C/svg%3E`;

export default function PortfolioCard({ image, name, location, type, status, year, description }) {
  const badgeClass = status === 'COMPLETED' ? 'badge badge--completed' : 'badge badge--ongoing';

  return (
    <article className="portfolio-card">
      <div className="portfolio-card__image-wrap">
        <img
          src={image}
          alt={name}
          className="portfolio-card__image"
          onError={(e) => { e.currentTarget.src = SVG_PLACEHOLDER; }}
        />
        <span className={badgeClass}>{status}</span>
      </div>
      <div className="portfolio-card__content">
        <div className="portfolio-card__meta">
          <span className="portfolio-card__type">{type}</span>
          <span className="portfolio-card__year">{year}</span>
        </div>
        <h3 className="portfolio-card__name">{name}</h3>
        <p className="portfolio-card__location">{location}</p>
        <p className="portfolio-card__description">{description}</p>
      </div>
    </article>
  );
}
