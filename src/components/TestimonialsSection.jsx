import { useState } from 'react';
import './TestimonialsSection.css';

const testimonials = [
  {
    quote: 'RERA compliance and legal clarity were our top priorities — Winstone Projects excelled on both fronts. The handover of our Indiranagar commercial unit was smooth and on schedule. A partner you can truly trust.',
    client: 'Meera Subramaniam',
    location: 'BANGALORE',
    property: 'Winston Square, Indiranagar',
  },
  {
    quote: 'Winstone Projects delivered beyond our expectations. The Arcadia villa we purchased in Whitefield is an absolute masterpiece — the attention to detail, Vastu compliance, and the smart home features are truly world-class. Best decision we ever made.',
    client: 'Rajesh Nair',
    location: 'BANGALORE',
    property: 'Arcadia Villas, Whitefield',
  },
  {
    quote: 'We purchased a plot in Devanahalli as an investment. The location near the airport and the BMRDA approval gave us confidence. In just two years the value has appreciated significantly. Winstone Projects truly delivers on its promises.',
    client: 'Vikram Rao',
    location: 'MUMBAI',
    property: 'Aero Valley, Devanahalli',
  },
];

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="container">
        <div className="testimonials-header">
          <p className="section-label">CLIENT STORIES</p>
          <h2 className="section-title">What Our Clients Say</h2>
        </div>

        {/* Big quote display */}
        <div className="testimonials-stage">
          <div className="testimonials-quote-mark">"</div>
          <blockquote className="testimonials-quote" key={active}>
            {t.quote}
          </blockquote>
          <div className="testimonials-author">
            <div className="testimonials-author__avatar">
              {t.client.charAt(0)}
            </div>
            <div>
              <p className="testimonials-author__name">{t.client}</p>
              <p className="testimonials-author__meta">{t.location} · {t.property}</p>
            </div>
          </div>
        </div>

        {/* Selector dots */}
        <div className="testimonials-nav">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`testimonials-nav__dot${active === i ? ' active' : ''}`}
              onClick={() => setActive(i)}
              aria-label={`View testimonial ${i + 1}`}
            />
          ))}
        </div>

        {/* Client list */}
        <div className="testimonials-clients">
          {testimonials.map((t, i) => (
            <button
              key={t.client}
              className={`testimonials-client${active === i ? ' active' : ''}`}
              onClick={() => setActive(i)}
            >
              <span className="testimonials-client__avatar">{t.client.charAt(0)}</span>
              <div>
                <p className="testimonials-client__name">{t.client}</p>
                <p className="testimonials-client__loc">{t.location}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
