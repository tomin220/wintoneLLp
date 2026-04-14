import './TestimonialCard.css';

export default function TestimonialCard({ quote, client, location }) {
  const initial = client.charAt(0).toUpperCase();

  return (
    <article className="testimonial-card">
      <span className="testimonial-card__quote-mark" aria-hidden="true">&ldquo;</span>
      <p className="testimonial-card__quote">{quote}</p>
      <div className="testimonial-card__footer">
        <div className="testimonial-card__avatar" aria-hidden="true">
          {initial}
        </div>
        <div className="testimonial-card__info">
          <p className="testimonial-card__client">{client}</p>
          <p className="testimonial-card__location">{location}</p>
        </div>
      </div>
    </article>
  );
}
