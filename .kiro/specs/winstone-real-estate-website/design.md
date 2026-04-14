# Design Document: Winstone Real Estate Website

## Overview

The Winstone Projects website is a single-page React + Vite marketing application for a Bangalore-based luxury real estate developer. The site presents the brand, showcases developments and portfolio, highlights the founder's vision, and drives prospective buyers and investors toward contact.

The application is a pure client-side SPA with no routing library. All navigation is handled via smooth-scroll to named section anchors. The visual design targets a luxury aesthetic — dark backgrounds, gold/amber accent tones, clean typography — while remaining fully responsive from 320 px to 1920 px.

**Key constraints:**
- React 19 + Vite 8, plain CSS (no UI library)
- All content from the reference site must be preserved verbatim
- Images served from `public/` directory
- No external routing, state management, or animation libraries

---

## Architecture

The application follows a flat component hierarchy. `App.jsx` is the single composition root; it imports and renders every section component in order. There is no global state manager — the only shared logic is the `useCounterAnimation` hook, which is consumed independently by `HeroSection` and `FounderSection`.

```
src/
├── App.jsx                        # Root composition — renders all sections in order
├── App.css                        # Global layout, CSS custom properties, utility classes
├── index.css                      # CSS reset, font imports, body defaults
├── hooks/
│   └── useCounterAnimation.js     # Shared hook: animates a number from 0 → target
└── components/
    ├── Navbar.jsx
    ├── HeroSection.jsx
    ├── AboutSection.jsx
    ├── ServicesSection.jsx
    ├── DevelopmentsSection.jsx
    ├── PortfolioSection.jsx
    ├── WhyChooseSection.jsx
    ├── FounderSection.jsx
    ├── TestimonialsSection.jsx
    ├── CTABanner.jsx
    └── Footer.jsx
```

```
public/
├── hero_villa.png
├── winstone-projects-B0mWZxEY.jpg
├── project_apartments.png
├── project_farms.png
├── project_villa_interior.png
├── winstone-foundation-CnK31L2s.jpg
└── nayaz_hero-Dal7fLmT.jpg
```

### Navigation / Scroll Architecture

Each section component renders a wrapping `<section id="...">` element. The Navbar and Hero CTA buttons call a shared `scrollToSection(id)` utility that calls `document.getElementById(id).scrollIntoView({ behavior: 'smooth' })`. No router or history API is involved.

Section IDs:
| Section | id |
|---|---|
| Hero | `hero` |
| About | `about` |
| Services | `services` |
| Developments | `projects` |
| Portfolio | `portfolio` |
| Why Choose | `why-choose` |
| Founder | `founder` |
| Testimonials | `testimonials` |
| CTA Banner | `cta` |
| Footer / Contact | `contact` |

---

## Components and Interfaces

### `useCounterAnimation(target, duration, triggerRef)`

A custom React hook that animates an integer counter from 0 to `target` when the element referenced by `triggerRef` enters the viewport.

```js
// Parameters
target:     number   // final value to count up to
duration:   number   // animation duration in ms (default 2000)
triggerRef: RefObject<Element>  // ref attached to the section container

// Returns
count: number  // current animated value (0 → target)
```

Implementation uses `IntersectionObserver` to detect viewport entry, then drives the counter with `requestAnimationFrame` using a linear easing over `duration` ms. The observer disconnects after the first trigger so the animation runs only once.

---

### `Navbar`

**Props:** none  
**State:** `menuOpen: boolean` (mobile hamburger toggle), `scrolled: boolean` (adds shadow/background on scroll)

Renders a `<nav>` fixed to the top. On desktop it shows inline links; on mobile (< 768 px) it collapses to a hamburger button that toggles a dropdown menu. Social icon links open in a new tab.

```jsx
<nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
  <div className="navbar__brand">…</div>
  <ul className="navbar__links">…</ul>
  <div className="navbar__social">…</div>
  <button className="navbar__hamburger" aria-label="Toggle menu">…</button>
</nav>
```

---

### `HeroSection`

**Props:** none  
**State:** counter values via `useCounterAnimation` (×4)

Full-viewport section with a CSS background image (`hero_villa.png`). Renders the tagline, heading, subtext, three CTA buttons, and four stat counters. Each counter uses its own `useCounterAnimation` call sharing a single `sectionRef`.

Stat counter data (static, co-located in component):
```js
const STATS = [
  { target: 12, label: 'PROJECTS' },
  { target: 500, label: 'FAMILIES' },
  { target: 200, label: 'ACRES' },
  { target: 7, label: 'YEARS' },
];
```

---

### `AboutSection`

**Props:** none  
**State:** none

Two-column layout: text content on one side, image (`winstone-projects-B0mWZxEY.jpg`) on the other. Collapses to single column on mobile.

---

### `ServicesSection`

**Props:** none  
**State:** none

Renders a grid of five service cards. Each card contains an emoji icon, service name, and description. Data is a static array co-located in the component.

```js
const SERVICES = [
  { icon: '🏡', name: 'Luxury Villas', description: '…' },
  { icon: '🏢', name: 'Residential Projects', description: '…' },
  { icon: '🌿', name: 'Land Development', description: '…' },
  { icon: '🏬', name: 'Commercial Spaces', description: '…' },
  { icon: '🏘️', name: 'Township Development', description: '…' },
];
```

---

### `DevelopmentsSection`

**Props:** none  
**State:** none

Renders three `ProjectCard` sub-components and a "VIEW ALL PROJECTS" button that scrolls to `#portfolio`.

---

### `ProjectCard`

**Props:**
```ts
{
  image: string,       // path to image in public/
  name: string,
  type: string,        // badge text e.g. "LUXURY VILLAS"
  location: string,
  description: string,
}
```

---

### `PortfolioSection`

**Props:** none  
**State:** none

Renders six `PortfolioCard` sub-components and a "VIEW FULL PORTFOLIO" button.

---

### `PortfolioCard`

**Props:**
```ts
{
  name: string,
  location: string,
  type: string,
  status: 'COMPLETED' | 'ONGOING',
  year: string,
  description: string,
}
```

The `status` prop drives a CSS class (`badge--completed` / `badge--ongoing`) that provides both color and a text label, satisfying the accessibility requirement that color alone must not convey status.

---

### `WhyChooseSection`

**Props:** none  
**State:** none

Renders six differentiator cards in a CSS grid (3×2 on desktop, 1-column on mobile).

---

### `FounderSection`

**Props:** none  
**State:** counter values via `useCounterAnimation` (×3)

Two-column layout: founder image on one side, text content (quote, bio, counters, tags, mission) on the other.

Stat counter data:
```js
const FOUNDER_STATS = [
  { target: 7, label: 'Years of Excellence' },
  { target: 12, label: 'Projects Completed' },
  { target: 500, label: 'Lives Impacted' },
];
```

---

### `TestimonialsSection`

**Props:** none  
**State:** none

Renders three `TestimonialCard` sub-components in a CSS grid.

---

### `TestimonialCard`

**Props:**
```ts
{
  quote: string,
  client: string,
  location: string,
}
```

---

### `CTABanner`

**Props:** none  
**State:** none

Full-width section with heading, subtext, two primary CTA buttons, a label, and a secondary CTA. Buttons scroll to `#contact` or `#portfolio` as appropriate.

---

### `Footer`

**Props:** none  
**State:** none

Four-column layout on desktop (brand, quick links, our projects, contact), stacks to single column on mobile. Contains the WhatsApp CTA anchor (`https://wa.me/+919845012345`).

---

## Data Models

All content data is static and co-located within each component as `const` arrays. There is no external data fetching, no database, and no shared data store.

### Project Card Data Shape

```ts
interface ProjectCardData {
  image: string;        // public/ path
  name: string;
  type: string;
  location: string;
  description: string;
}
```

### Portfolio Card Data Shape

```ts
interface PortfolioCardData {
  name: string;
  location: string;
  type: string;
  status: 'COMPLETED' | 'ONGOING';
  year: string;
  description: string;
}
```

### Service Item Data Shape

```ts
interface ServiceItem {
  icon: string;         // emoji character
  name: string;
  description: string;
}
```

### Stat Counter Data Shape

```ts
interface StatItem {
  target: number;
  label: string;
}
```

### Testimonial Data Shape

```ts
interface TestimonialData {
  quote: string;
  client: string;
  location: string;
}
```

### Image Placeholder Strategy

When an image file is absent from `public/`, the `<img>` element's `onError` handler replaces the `src` with a data URI for a styled SVG placeholder that renders the `alt` text. This prevents broken-image icons.

```jsx
const handleImgError = (e) => {
  e.currentTarget.src = `data:image/svg+xml,…`;
  e.currentTarget.onerror = null; // prevent infinite loop
};
```

---

## Correctness Properties


*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

This feature is a static content website with no data transformation logic, no parsers, and no serializers. The vast majority of acceptance criteria are specific content-presence checks (example-based tests). However, a small set of behavioral properties hold universally across inputs and are suitable for property-based testing.

### Property 1: Navigation elements map to valid section IDs

*For any* interactive navigation element (Navbar link or Hero/CTA button) that is intended to scroll to a section, the `data-target` or equivalent attribute must reference a section ID that exists in the rendered DOM.

**Validates: Requirements 1.5, 2.6**

### Property 2: Counter animation reaches its target value

*For any* `useCounterAnimation` hook instance with a given `target` number, after the animation duration has elapsed, the returned `count` value SHALL equal `target`.

**Validates: Requirements 2.8, 8.4**

### Property 3: Every service item has a non-empty icon

*For any* service item rendered in the Services section, the icon field SHALL be a non-empty string so that no service card is rendered without a visual indicator.

**Validates: Requirements 4.3**

### Property 4: Portfolio card status badge uses both class and text

*For any* `PortfolioCard` rendered with a `status` of `"COMPLETED"` or `"ONGOING"`, the badge element SHALL carry a CSS class specific to that status AND display the status text as visible content — ensuring status is never conveyed by color alone.

**Validates: Requirements 6.4, 14.4**

### Property 5: Image error handler prevents broken-image icons

*For any* `<img>` element in the application, if the `src` fails to load, the `onError` handler SHALL replace the `src` with a valid placeholder URI so that no broken-image icon is displayed to the user.

**Validates: Requirements 12.2**

### Property 6: Every img element has a non-empty alt attribute

*For any* `<img>` element rendered by the application, the `alt` attribute SHALL be present and either contain a descriptive string or be explicitly set to `""` for decorative images — never absent or `undefined`.

**Validates: Requirements 14.1**

---

## Error Handling

### Missing Images

Each `<img>` element uses an `onError` handler that swaps the broken `src` for an inline SVG data URI. The SVG renders a grey rectangle with the image's `alt` text centered inside it. The `onerror` attribute is nulled after the first trigger to prevent infinite error loops.

```jsx
const handleImgError = (e) => {
  const alt = e.currentTarget.alt || 'Image unavailable';
  e.currentTarget.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300">
      <rect width="100%" height="100%" fill="#2a2a2a"/>
      <text x="50%" y="50%" fill="#888" font-family="sans-serif"
        font-size="14" text-anchor="middle" dominant-baseline="middle">${alt}</text>
    </svg>`
  )}`;
  e.currentTarget.onerror = null;
};
```

### Scroll Target Not Found

The `scrollToSection(id)` utility guards against missing elements:

```js
const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};
```

If the target element does not exist (e.g., during development), the call is silently ignored — no uncaught exception is thrown.

### Counter Animation Edge Cases

`useCounterAnimation` handles edge cases:
- `target === 0`: returns 0 immediately, no animation runs.
- `target < 0`: treated as 0 (counters are always non-negative).
- Component unmounts before animation completes: `cancelAnimationFrame` is called in the cleanup function to prevent state updates on unmounted components.

---

## Testing Strategy

This feature is a static content marketing website. The primary testing concerns are:

1. **Content correctness** — all required text, links, and images are present
2. **Behavioral correctness** — counter animation, navigation scroll, image fallback
3. **Accessibility** — alt text, semantic HTML, badge text labels

### Unit / Example-Based Tests

Use **Vitest** + **React Testing Library** for component-level tests.

Each section component should have an example-based test that verifies:
- Required static text strings are present in the rendered output
- Required buttons/links are present with correct labels
- Required images are present with correct `alt` attributes
- Required CSS classes are applied (e.g., badge classes)

Example test structure:
```js
// ServicesSection.test.jsx
import { render, screen } from '@testing-library/react';
import ServicesSection from '../components/ServicesSection';

test('renders all five service items', () => {
  render(<ServicesSection />);
  expect(screen.getByText('Luxury Villas')).toBeInTheDocument();
  expect(screen.getByText('Residential Projects')).toBeInTheDocument();
  // … etc.
});
```

### Property-Based Tests

Use **fast-check** for property-based tests. Each property test runs a minimum of **100 iterations**.

Tag format: `// Feature: winstone-real-estate-website, Property {N}: {property_text}`

**Property 1 — Navigation elements map to valid section IDs**
Generate arbitrary nav link configurations and verify each `data-target` resolves to a known section ID from the fixed set.

**Property 2 — Counter animation reaches target**
Generate arbitrary positive integer targets and durations; verify `useCounterAnimation` returns the exact target after the animation completes.
```
// Feature: winstone-real-estate-website, Property 2: counter animation reaches target
fc.assert(fc.property(fc.integer({ min: 1, max: 10000 }), (target) => {
  // render hook, advance timers, assert count === target
}));
```

**Property 3 — Every service item has a non-empty icon**
Generate arbitrary arrays of service items; verify each item's icon field is a non-empty string before rendering.

**Property 4 — Portfolio card status badge uses both class and text**
Generate arbitrary `PortfolioCard` instances with `status` of `"COMPLETED"` or `"ONGOING"`; verify the rendered badge has both the correct CSS class and visible text content.

**Property 5 — Image error handler prevents broken-image icons**
For any `<img>` rendered by the app, simulate an `error` event and verify the `src` is replaced with a non-empty data URI.

**Property 6 — Every img element has a non-empty alt attribute**
Render each section component and query all `<img>` elements; verify none have an absent or `undefined` `alt` attribute.

### Integration / Smoke Tests

- Verify the page `<title>` is set to "Winstone Projects" (smoke test, single execution)
- Verify the WhatsApp link href is exactly `https://wa.me/+919845012345` (smoke test)
- Verify semantic elements (`<nav>`, `<main>`, `<section>`, `<footer>`) are present in the rendered DOM (smoke test)
