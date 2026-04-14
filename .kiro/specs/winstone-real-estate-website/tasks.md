# Implementation Plan: Winstone Real Estate Website

## Overview

Build the Winstone Projects single-page React + Vite marketing website from scratch. The implementation follows a bottom-up approach: global styles and assets first, then shared hooks, then individual section components, then App composition, then responsive CSS, accessibility hardening, and finally property-based tests.

## Tasks

- [x] 1. Project setup — global styles, CSS variables, fonts, and image assets
  - Replace `src/index.css` with a CSS reset, Google Fonts import (e.g. Playfair Display + Inter), and body defaults
  - Replace `src/App.css` with CSS custom properties (`--color-gold`, `--color-dark`, `--color-bg`, etc.), global layout utilities, and section base styles
  - Add all required image files to `public/`: `hero_villa.png`, `winstone-projects-B0mWZxEY.jpg`, `project_apartments.png`, `project_farms.png`, `project_villa_interior.png`, `winstone-foundation-CnK31L2s.jpg`, `nayaz_hero-Dal7fLmT.jpg` (use placeholder SVGs if real assets are unavailable)
  - Set `<title>` to "Winstone Projects" in `index.html`
  - _Requirements: 1.1, 1.7, 12.1, 12.2_

- [x] 2. Implement `useCounterAnimation` hook
  - Create `src/hooks/useCounterAnimation.js`
  - Accept `target`, `duration` (default 2000 ms), and `triggerRef` parameters; return animated `count`
  - Use `IntersectionObserver` to trigger on viewport entry; drive counter with `requestAnimationFrame` linear easing
  - Disconnect observer after first trigger; call `cancelAnimationFrame` on cleanup to prevent updates on unmounted components
  - Handle edge cases: `target === 0` returns 0 immediately; `target < 0` treated as 0
  - _Requirements: 2.8, 8.4_

  - [ ]* 2.1 Write property test for counter animation reaching target (Property 2)
    - **Property 2: Counter animation reaches its target value**
    - **Validates: Requirements 2.8, 8.4**
    - Use `fast-check` with `fc.integer({ min: 1, max: 10000 })` as arbitrary target; render hook with fake timers, advance by duration, assert `count === target`
    - Tag: `// Feature: winstone-real-estate-website, Property 2: counter animation reaches target`

- [x] 3. Implement `Navbar` component
  - Create `src/components/Navbar.jsx` and `src/components/Navbar.css`
  - Render `<nav>` fixed to top with brand mark "Winstone Projects" / "WINSTONE PROJECTS"
  - Include nav links: HOME, ABOUT US, PROJECTS, PORTFOLIO, SERVICES, CONTACT — each calls `scrollToSection(id)` on click
  - Include social icon links for Instagram, Twitter/X, LinkedIn (open in new tab)
  - Implement `scrolled` state via `scroll` event listener — add `navbar--scrolled` class when page is scrolled
  - Implement `menuOpen` boolean state and hamburger `<button aria-label="Toggle menu">` for mobile
  - Implement `scrollToSection` utility: `document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })`
  - _Requirements: 1.2, 1.3, 1.4, 1.5, 1.6_

- [x] 4. Implement `HeroSection` component
  - Create `src/components/HeroSection.jsx` and `src/components/HeroSection.css`
  - Render `<section id="hero">` with full-viewport-height CSS background image `hero_villa.png`
  - Display label "BANGALORE, INDIA · EST. 2018", heading "Redefining Luxury Living in Bangalore", and subtext
  - Render three CTA buttons: "VIEW PROJECTS" → `#projects`, "VIEW PORTFOLIO" → `#portfolio`, "CONTACT US" → `#contact`
  - Render four `Stat_Counter` displays using `useCounterAnimation` with a shared `sectionRef`; data: `[{ target: 12, label: 'PROJECTS' }, { target: 500, label: 'FAMILIES' }, { target: 200, label: 'ACRES' }, { target: 7, label: 'YEARS' }]`
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8_

- [x] 5. Implement `AboutSection` component
  - Create `src/components/AboutSection.jsx` and `src/components/AboutSection.css`
  - Render `<section id="about">` with two-column layout (text + image)
  - Display label, heading "Crafting Premium Living Experiences in India", body copy, vision statement, and "DISCOVER OUR STORY" button
  - Render `<img src="/winstone-projects-B0mWZxEY.jpg" alt="Winstone Projects development" onError={handleImgError} />`
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 12.2_

- [x] 6. Implement `ServicesSection` component
  - Create `src/components/ServicesSection.jsx` and `src/components/ServicesSection.css`
  - Render `<section id="services">` with label "WHAT WE BUILD · Our Services"
  - Co-locate `SERVICES` array with all five items (icon, name, description) and map to service cards
  - Each card renders emoji icon, service name, and description
  - _Requirements: 4.1, 4.2, 4.3_

  - [ ]* 6.1 Write property test for service items having non-empty icons (Property 3)
    - **Property 3: Every service item has a non-empty icon**
    - **Validates: Requirements 4.3**
    - Use `fast-check` to generate arbitrary arrays of service-item-shaped objects; verify each `icon` field is a non-empty string before rendering
    - Tag: `// Feature: winstone-real-estate-website, Property 3: every service item has a non-empty icon`

- [x] 7. Implement `DevelopmentsSection` and `ProjectCard` components
  - Create `src/components/DevelopmentsSection.jsx`, `src/components/ProjectCard.jsx`, and matching CSS files
  - Render `<section id="projects">` with label and subtext
  - Co-locate three project data objects; render three `<ProjectCard>` instances
  - `ProjectCard` accepts `{ image, name, type, location, description }` props; renders image with `onError` fallback, type badge, location, and description
  - Render "VIEW ALL PROJECTS" button that calls `scrollToSection('portfolio')`
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 12.2_

- [x] 8. Implement `PortfolioSection` and `PortfolioCard` components
  - Create `src/components/PortfolioSection.jsx`, `src/components/PortfolioCard.jsx`, and matching CSS files
  - Render `<section id="portfolio">` with label and subtext
  - Co-locate six portfolio data objects; render six `<PortfolioCard>` instances
  - `PortfolioCard` accepts `{ name, location, type, status, year, description }` props
  - Status badge: apply CSS class `badge--completed` or `badge--ongoing` AND render status text as visible content (never color alone)
  - Render "VIEW FULL PORTFOLIO" button
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 14.4_

  - [ ]* 8.1 Write property test for portfolio card status badge (Property 4)
    - **Property 4: Portfolio card status badge uses both class and text**
    - **Validates: Requirements 6.4, 14.4**
    - Use `fast-check` with `fc.constantFrom('COMPLETED', 'ONGOING')` as arbitrary status; render `PortfolioCard`, assert badge has correct CSS class AND visible text content
    - Tag: `// Feature: winstone-real-estate-website, Property 4: portfolio card status badge uses both class and text`

- [x] 9. Implement `WhyChooseSection` component
  - Create `src/components/WhyChooseSection.jsx` and `src/components/WhyChooseSection.css`
  - Render `<section id="why-choose">` with label "TRUST & EXCELLENCE · Why Choose Winstone Projects"
  - Co-locate six differentiator items (title + description) and map to cards in a CSS grid (3×2 desktop)
  - _Requirements: 7.1, 7.2_

- [x] 10. Implement `FounderSection` component
  - Create `src/components/FounderSection.jsx` and `src/components/FounderSection.css`
  - Render `<section id="founder">` with two-column layout (image + text)
  - Render `<img src="/nayaz_hero-Dal7fLmT.jpg" alt="Nayaz Faiyaz Ahmed, Founder & Chairman" onError={handleImgError} />`
  - Display label "VISIONARY LEADERSHIP", name "Nayaz Faiyaz Ahmed", title "FOUNDER & CHAIRMAN · WINSTONE GROUP", quote, bio, mission statement, and six leadership quality tags
  - Render three `Stat_Counter` displays using `useCounterAnimation` with a shared `sectionRef`; data: `[{ target: 7, label: 'Years of Excellence' }, { target: 12, label: 'Projects Completed' }, { target: 500, label: 'Lives Impacted' }]`
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7, 8.8, 8.9, 12.2_

- [x] 11. Implement `TestimonialsSection` and `TestimonialCard` components
  - Create `src/components/TestimonialsSection.jsx`, `src/components/TestimonialCard.jsx`, and matching CSS files
  - Render `<section id="testimonials">` with label "CLIENT STORIES · What Our Clients Say"
  - Co-locate three testimonial data objects; render three `<TestimonialCard>` instances
  - `TestimonialCard` accepts `{ quote, client, location }` props
  - _Requirements: 9.1, 9.2_

- [x] 12. Implement `CTABanner` component
  - Create `src/components/CTABanner.jsx` and `src/components/CTABanner.css`
  - Render `<section id="cta">` with heading "Ready to Own a Piece of Bangalore's Finest?", subtext, label "BANGALORE'S MOST TRUSTED LUXURY DEVELOPER"
  - Render two primary CTA buttons: "GET IN TOUCH" → `#contact`, "EXPLORE PROPERTIES" → `#portfolio`
  - Render secondary CTA "START A CONVERSATION" → `#contact`
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6_

- [x] 13. Implement `Footer` component
  - Create `src/components/Footer.jsx` and `src/components/Footer.css`
  - Render `<footer id="contact">` with four-column layout: brand, quick links, our projects, contact
  - Brand column: logo text, tagline, social icon links (Instagram, Twitter/X, LinkedIn)
  - Quick Links: Home, About Us, Projects, Portfolio, Services, Contact
  - Our Projects: Whitefield Villas, Koramangala Residences, Sarjapur Township, Indiranagar Commercial, Mysore Heritage Palms, Devanahalli Plots
  - Contact: address, phone "+91 98450 12345", email "info@winstoneprojects.in"
  - WhatsApp CTA `<a href="https://wa.me/+919845012345">CHAT ON WHATSAPP</a>`
  - Copyright "© 2026 Winstone Projects. All Rights Reserved." and bottom tagline
  - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 11.7, 11.8_

- [x] 14. Checkpoint — wire all sections in `App.jsx`
  - Replace the default Vite starter content in `src/App.jsx` with imports of all section components
  - Render in order: `<Navbar>`, `<main>` wrapping `<HeroSection>`, `<AboutSection>`, `<ServicesSection>`, `<DevelopmentsSection>`, `<PortfolioSection>`, `<WhyChooseSection>`, `<FounderSection>`, `<TestimonialsSection>`, `<CTABanner>`, then `<Footer>` outside `<main>`
  - Ensure all section `id` attributes match the scroll targets used in Navbar and CTA buttons
  - Ensure all tests pass, ask the user if questions arise.
  - _Requirements: 1.1, 1.5, 2.6, 5.5, 10.6, 14.3_

- [x] 15. Responsive CSS — mobile layouts and hamburger menu
  - Add `@media (max-width: 767px)` rules to each component CSS file (or a shared breakpoints file)
  - Navbar: hide `.navbar__links` and `.navbar__social`; show hamburger button; toggle `.navbar__menu--open` class to reveal dropdown
  - HeroSection: stack stat counters in 2×2 grid; reduce font sizes
  - DevelopmentsSection and PortfolioSection: switch card grids to single-column (`grid-template-columns: 1fr`)
  - ServicesSection: switch service grid to single-column
  - WhyChooseSection: switch differentiator grid to single-column
  - AboutSection and FounderSection: stack two-column layouts to single-column
  - Footer: stack four columns to single-column
  - Verify no horizontal overflow at 320 px viewport width
  - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5_

- [x] 16. Accessibility pass
  - Audit every `<img>` element — ensure `alt` attribute is present and descriptive (or `alt=""` for decorative images)
  - Verify semantic HTML: `<nav>`, `<main>`, `<section>`, `<footer>`, `<h1>`–`<h3>` used correctly throughout
  - Ensure Navbar hamburger button has `aria-label="Toggle menu"` and is keyboard-focusable
  - Ensure all interactive elements (buttons, links) are reachable via Tab and activatable via Enter
  - Confirm portfolio status badges use both CSS class and visible text (not color alone)
  - _Requirements: 14.1, 14.2, 14.3, 14.4_

  - [ ]* 16.1 Write property test for every img having a non-empty alt attribute (Property 6)
    - **Property 6: Every img element has a non-empty alt attribute**
    - **Validates: Requirements 14.1**
    - Render each section component; query all `<img>` elements; assert none have absent or `undefined` `alt`
    - Tag: `// Feature: winstone-real-estate-website, Property 6: every img element has a non-empty alt attribute`

- [x] 17. Property-based tests — remaining properties
  - Install `fast-check`, `vitest`, `@testing-library/react`, and `@testing-library/jest-dom` as dev dependencies if not already present; configure Vitest in `vite.config.js`

  - [ ]* 17.1 Write property test for navigation elements mapping to valid section IDs (Property 1)
    - **Property 1: Navigation elements map to valid section IDs**
    - **Validates: Requirements 1.5, 2.6**
    - Generate arbitrary nav link configurations; verify each `data-target` resolves to a known section ID from the fixed set `['hero','about','services','projects','portfolio','why-choose','founder','testimonials','cta','contact']`
    - Tag: `// Feature: winstone-real-estate-website, Property 1: navigation elements map to valid section IDs`

  - [ ]* 17.2 Write property test for image error handler preventing broken-image icons (Property 5)
    - **Property 5: Image error handler prevents broken-image icons**
    - **Validates: Requirements 12.2**
    - For any `<img>` rendered by the app, simulate an `error` event and verify `src` is replaced with a non-empty data URI (starts with `data:image/svg+xml`)
    - Tag: `// Feature: winstone-real-estate-website, Property 5: image error handler prevents broken-image icons`

- [x] 18. Final checkpoint — full test suite
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at key integration points
- Property tests validate universal correctness properties using `fast-check` (minimum 100 iterations each)
- Unit tests validate specific content strings, links, and rendered structure
- All image references use paths relative to `public/` (no Vite asset imports for images)
