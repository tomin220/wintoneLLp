import { useState } from 'react';
import './ContactSection.css';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', interest: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  return (
    <section id="contact-form" className="contact-section">
      <div className="container">
        <div className="contact-grid">

          {/* Left: info */}
          <div className="contact-info">
            <p className="section-label">GET IN TOUCH</p>
            <div className="gold-divider" />
            <h2 className="contact-info__title">Let's Find Your Perfect Property</h2>
            <p className="contact-info__sub">
              Whether you're looking for a luxury villa, a smart investment, or your dream home — our experts are here to guide you every step of the way.
            </p>

            <div className="contact-details">
              <div className="contact-detail">
                <span className="contact-detail__icon">📍</span>
                <div>
                  <p className="contact-detail__label">VISIT US</p>
                  <p className="contact-detail__value">Prestige Tech Park, Outer Ring Road,<br />Bangalore – 560 103</p>
                </div>
              </div>
              <div className="contact-detail">
                <span className="contact-detail__icon">📞</span>
                <div>
                  <p className="contact-detail__label">CALL US</p>
                  <a href="tel:+919845012345" className="contact-detail__value contact-detail__link">+91 98450 12345</a>
                </div>
              </div>
              <div className="contact-detail">
                <span className="contact-detail__icon">✉️</span>
                <div>
                  <p className="contact-detail__label">EMAIL US</p>
                  <a href="mailto:info@winstoneprojects.in" className="contact-detail__value contact-detail__link">info@winstoneprojects.in</a>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/+919845012345?text=Hello%2C%20I%20am%20interested%20in%20your%20properties."
              target="_blank"
              rel="noopener noreferrer"
              className="contact-whatsapp"
            >
              <span className="contact-whatsapp__icon">💬</span>
              CHAT ON WHATSAPP
            </a>
          </div>

          {/* Right: form */}
          <div className="contact-form-wrap">
            {submitted ? (
              <div className="contact-success">
                <div className="contact-success__icon">✓</div>
                <h3>Thank You for Reaching Out!</h3>
                <p>One of our property consultants will contact you within 24 hours.</p>
                <button className="btn btn--outline" onClick={() => setSubmitted(false)}>
                  SEND ANOTHER ENQUIRY
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="contact-form__row">
                  <div className="contact-form__field">
                    <label htmlFor="cf-name">Full Name *</label>
                    <input id="cf-name" type="text" placeholder="Rajesh Kumar" required value={form.name} onChange={set('name')} />
                  </div>
                  <div className="contact-form__field">
                    <label htmlFor="cf-phone">Phone Number *</label>
                    <input id="cf-phone" type="tel" placeholder="+91 98450 12345" required value={form.phone} onChange={set('phone')} />
                  </div>
                </div>
                <div className="contact-form__field">
                  <label htmlFor="cf-email">Email Address</label>
                  <input id="cf-email" type="email" placeholder="rajesh@example.com" value={form.email} onChange={set('email')} />
                </div>
                <div className="contact-form__field">
                  <label htmlFor="cf-interest">I'm Interested In *</label>
                  <select id="cf-interest" required value={form.interest} onChange={set('interest')}>
                    <option value="" disabled>Select a property type</option>
                    <option>Luxury Villas</option>
                    <option>Residential Apartments</option>
                    <option>Plotted Layouts</option>
                    <option>Commercial Spaces</option>
                    <option>Township Developments</option>
                    <option>General Enquiry</option>
                  </select>
                </div>
                <div className="contact-form__field">
                  <label htmlFor="cf-message">Message</label>
                  <textarea id="cf-message" rows={4} placeholder="Tell us about your requirements, budget, preferred location..." value={form.message} onChange={set('message')} />
                </div>
                <button type="submit" className="btn btn--primary contact-form__submit">
                  SEND ENQUIRY →
                </button>
                <p className="contact-form__note">
                  By submitting, you agree to be contacted by our team. We respect your privacy.
                </p>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
