# Requirements Document

## Introduction

Winstone Projects is a Bangalore-based luxury real estate developer founded in 2018. This feature covers the complete build of their single-page marketing website as a React + Vite application. The site presents the brand, showcases developments and portfolio, highlights the founder's vision, and drives prospective buyers and investors toward contact. The page must faithfully carry all existing content (text, images, section structure) from the reference site while allowing visual differentiation — different layout treatments, typography choices, and UI embellishments are encouraged as long as no content is omitted.

---

## Glossary

- **Website**: The single-page React application being built.
- **App**: The root React component (`App.jsx`) that composes all sections.
- **Section**: A distinct full-width content block within the single page (e.g., Hero, About, Services).
- **Navbar**: The fixed top navigation bar containing the logo, nav links, and social icons.
- **Hero**: The full-viewport opening section with background image, tagline, heading, subtext, CTAs, and animated stat counters.
- **Stat_Counter**: An animated numeric counter that increments from 0 to a target value on page load or scroll entry.
- **About_Section**: The section describing Winstone Projects' story, vision, and a supporting image.
- **Services_Section**: The section listing the five service categories offered by Winstone Projects.
- **Developments_Section**: The section showcasing three featured development cards.
- **Portfolio_Section**: The section displaying six portfolio project cards with status badges.
- **Why_Choose_Section**: The section presenting six trust/differentiator points.
- **Founder_Section**: The section featuring the founder's photo, quote, bio, animated counters, and leadership tags.
- **Testimonials_Section**: The section displaying three client testimonials.
- **CTA_Banner**: The full-width call-to-action banner section above the footer.
- **Footer**: The bottom section containing logo, tagline, links, contact details, and WhatsApp CTA.
- **Project_Card**: A UI card component displaying a development's image, name, type badge, location, and description excerpt.
- **Portfolio_Card**: A UI card component displaying a project's image, name, location, type badge, status badge, year, and description.
- **Testimonial_Card**: A UI card displaying a client quote, name, and location.
- **WhatsApp_CTA**: A button or link that opens a WhatsApp conversation at the configured number.
- **RERA**: Real Estate Regulatory Authority — a compliance certification referenced in content.
- **BMRDA**: Bangalore Metropolitan Region Development Authority — a planning body referenced in content.

---

## Requirements

### Requirement 1: Application Shell and Navigation

**User Story:** As a visitor, I want a persistent navigation bar with the brand logo and page links, so that I can identify the brand and jump to any section at any time.

#### Acceptance Criteria

1. THE App SHALL render a single HTML page with no client-side routing.
2. THE Navbar SHALL display the logo text "Winstone Projects" and the tagline "WINSTONE PROJECTS" together as the brand mark.
3. THE Navbar SHALL contain navigation links: HOME, ABOUT US, PROJECTS, PORTFOLIO, SERVICES, CONTACT.
4. THE Navbar SHALL display social icon links for Instagram, Twitter/X, and LinkedIn.
5. WHEN a navigation link is clicked, THE Navbar SHALL scroll the page smoothly to the corresponding section.
6. WHILE the user scrolls past the top of the page, THE Navbar SHALL remain fixed at the top of the viewport.
7. THE App SHALL set the page `<title>` to "Winstone Projects".

---

### Requirement 2: Hero Section

**User Story:** As a visitor, I want an impactful opening section with the brand's headline and key stats, so that I immediately understand who Winstone Projects is and what they offer.

#### Acceptance Criteria

1. THE Hero SHALL display a full-viewport-height background using the image `hero_villa.png`.
2. THE Hero SHALL display the location/establishment label "BANGALORE, INDIA · EST. 2018".
3. THE Hero SHALL display the heading "Redefining Luxury Living in Bangalore".
4. THE Hero SHALL display the subtext "Premium villas and developments crafted for modern Indian lifestyles".
5. THE Hero SHALL display three CTA buttons: "VIEW PROJECTS", "VIEW PORTFOLIO", and "CONTACT US".
6. WHEN a Hero CTA button is clicked, THE App SHALL scroll smoothly to the corresponding section.
7. THE Hero SHALL display four Stat_Counters with labels: PROJECTS, FAMILIES, ACRES, YEARS.
8. WHEN the Hero section enters the viewport, THE Stat_Counter SHALL animate from 0 to its target value.

---

### Requirement 3: About / Story Section

**User Story:** As a visitor, I want to read about Winstone Projects' background and vision, so that I can assess the company's credibility and values.

#### Acceptance Criteria

1. THE About_Section SHALL display the label "Est. 2018 · BANGALORE'S PREMIER DEVELOPER · OUR STORY".
2. THE About_Section SHALL display the heading "Crafting Premium Living Experiences in India".
3. THE About_Section SHALL display the body copy: "Winstone Projects is a Bangalore-based real estate developer focused on delivering premium residential and commercial developments across India. We emphasize quality, innovation, and trust — building homes that resonate with the modern Indian lifestyle."
4. THE About_Section SHALL display the vision statement: "To be the most trusted luxury real estate developer in India, setting new standards for architectural excellence, sustainable design, and customer-centric living experiences."
5. THE About_Section SHALL display a CTA button labelled "DISCOVER OUR STORY".
6. THE About_Section SHALL display the image `winstone-projects-B0mWZxEY.jpg` alongside the text content.

---

### Requirement 4: Services Section

**User Story:** As a visitor, I want to see the types of developments Winstone Projects builds, so that I can determine whether their offerings match my needs.

#### Acceptance Criteria

1. THE Services_Section SHALL display the label "WHAT WE BUILD · Our Services".
2. THE Services_Section SHALL display exactly five service items with the following names and descriptions:
   - "Luxury Villas" — "Private villas with premium finishes, smart-home features, and curated landscaping."
   - "Residential Projects" — "High-rise apartments in prime Bangalore locations with world-class amenities."
   - "Land Development" — "BMRDA-approved plotted developments with clear titles in high-growth corridors."
   - "Commercial Spaces" — "Grade-A office and retail spaces designed for modern businesses."
   - "Township Development" — "Integrated self-sufficient townships blending community, nature, and convenience."
3. THE Services_Section SHALL display a distinct icon or emoji alongside each service item.

---

### Requirement 5: Featured Developments Section

**User Story:** As a prospective buyer, I want to browse highlighted development projects, so that I can quickly identify flagship properties that interest me.

#### Acceptance Criteria

1. THE Developments_Section SHALL display the label "OUR PORTFOLIO · Featured Developments".
2. THE Developments_Section SHALL display the subtext "Explore our curated collection of luxury developments across Bangalore and South India".
3. THE Developments_Section SHALL render exactly three Project_Cards with the following data:
   - Name: "Winstone Arcadia Villas", Type: "LUXURY VILLAS", Location: "WHITEFIELD, BANGALORE", Description excerpt: "Architecturally stunning independent villas nestled in the heart of Whitefield. Featuring contemporary Indian ..."
   - Name: "The Residences at Koramangala", Type: "RESIDENTIAL PROJECTS", Location: "KORAMANGALA, BANGALORE", Description excerpt: "Premium high-rise residences in the vibrant Koramangala neighbourhood. Thoughtfully designed apartments with p..."
   - Name: "Winstone Greens Township", Type: "TOWNSHIP DEVELOPMENTS", Location: "SARJAPUR ROAD, BANGALORE", Description excerpt: "An integrated township spanning 120 acres along the Sarjapur corridor. Villas, plots, clubhouse, and commercia..."
4. THE Developments_Section SHALL display a "VIEW ALL PROJECTS" CTA button.
5. WHEN the "VIEW ALL PROJECTS" button is clicked, THE App SHALL scroll smoothly to the Portfolio_Section.

---

### Requirement 6: Portfolio Section

**User Story:** As an investor or buyer, I want to see a full list of completed and ongoing projects with their status, so that I can evaluate Winstone Projects' track record.

#### Acceptance Criteria

1. THE Portfolio_Section SHALL display the label "COMPLETED & ONGOING · Our Portfolio".
2. THE Portfolio_Section SHALL display the subtext "A curated showcase of our finest villas, residences, commercial spaces, and plotted layouts".
3. THE Portfolio_Section SHALL render exactly six Portfolio_Cards with the following data:
   - Name: "Arcadia Villa", Location: "Whitefield", Type: "VILLA", Status: "COMPLETED", Year: "2023", Description: "A signature 5-BHK smart villa with private pool, home theatre, and lush 1-acre landscaped grounds."
   - Name: "The Residences", Location: "Koramangala", Type: "RESIDENTIAL", Status: "COMPLETED", Year: "2023", Description: "42 premium 3 & 4 BHK apartments with sky lounge, infinity pool, and gym. Delivered on schedule."
   - Name: "Winstone Greens Phase 1", Location: "Sarjapur", Type: "LAYOUT", Status: "COMPLETED", Year: "2022", Description: "240 BMRDA-approved plots across 48 acres. Phase 1 fully sold out. Gated community with underground utilities."
   - Name: "Winston Square", Location: "Indiranagar", Type: "COMMERCIAL", Status: "COMPLETED", Year: "2022", Description: "Grade-A 6-floor commercial complex, LEED-certified. Home to 15 corporates, with flexible floor plates."
   - Name: "Heritage Palms", Location: "Chamundi Hills", Type: "VILLA", Status: "ONGOING", Year: "2024", Description: "Collection of 12 heritage-inspired villas with private gardens and club access, overlooking the Chamundi Hills."
   - Name: "Aero Valley Phase 1", Location: "Devanahalli", Type: "LAYOUT", Status: "ONGOING", Year: "2024", Description: "Premium plotted development near Kempegowda International Airport. 180 plots, BMRDA approved."
4. THE Portfolio_Card SHALL display a visually distinct badge for "COMPLETED" status versus "ONGOING" status.
5. THE Portfolio_Section SHALL display a "VIEW FULL PORTFOLIO" CTA button.

---

### Requirement 7: Why Choose Us Section

**User Story:** As a prospective client, I want to understand Winstone Projects' key differentiators, so that I can feel confident choosing them over competitors.

#### Acceptance Criteria

1. THE Why_Choose_Section SHALL display the label "TRUST & EXCELLENCE · Why Choose Winstone Projects".
2. THE Why_Choose_Section SHALL display exactly six differentiator items with the following titles and descriptions:
   - "Deep Expertise in Indian Markets" — "Unmatched understanding of Bangalore and South India's premium real estate landscape with a proven track record since 2018."
   - "Prime Bangalore Locations" — "Exclusive developments in Whitefield, Koramangala, Indiranagar, Sarjapur Road, and other high-growth corridors."
   - "Strong Investment Returns" — "Strategic projects in Bangalore's fastest-growing micro-markets ensuring consistent appreciation and rental yields."
   - "Architectural Excellence" — "Award-winning designs blending contemporary aesthetics with sustainable materials and smart-home technology."
   - "Transparent & Client-First" — "End-to-end support from site selection to handover, with full legal transparency and RERA compliance."
   - "Pan-India Expansion" — "Growing presence across Bangalore, Mysore, and Hyderabad — bringing premium living to India's top cities."

---

### Requirement 8: Founder Section

**User Story:** As a visitor, I want to learn about the founder's background and vision, so that I can trust the leadership behind Winstone Projects.

#### Acceptance Criteria

1. THE Founder_Section SHALL display the image `nayaz_hero-Dal7fLmT.jpg`.
2. THE Founder_Section SHALL display the quote: "Excellence is not a destination, but a journey of continuous innovation and meaningful impact."
3. THE Founder_Section SHALL display three Stat_Counters with labels: "Years of Excellence", "Projects Completed", "Lives Impacted".
4. WHEN the Founder_Section enters the viewport, THE Stat_Counter SHALL animate from 0 to its target value.
5. THE Founder_Section SHALL display the label "VISIONARY LEADERSHIP".
6. THE Founder_Section SHALL display the name "Nayaz Faiyaz Ahmed" and the title "FOUNDER & CHAIRMAN · WINSTONE GROUP".
7. THE Founder_Section SHALL display the bio: "A visionary entrepreneur with a passion for transforming India's urban landscape. Since founding Winstone Projects in 2018, Nayaz has led the development of iconic residential and commercial properties across Bangalore, Mysore, and Hyderabad. His relentless pursuit of excellence, combined with deep respect for Indian architectural heritage, has positioned Winstone Projects as a leading name in India's premium real estate sector."
8. THE Founder_Section SHALL display the following leadership quality tags: "Luxury Real Estate", "Design-Driven Architecture", "Technology Integration", "Premium Development", "Pan-India Expansion", "Award-Winning Projects".
9. THE Founder_Section SHALL display the mission statement: "Homes should be more than just spaces to live in; they should be sanctuaries that inspire, comfort, and elevate the lives of those within."

---

### Requirement 9: Testimonials Section

**User Story:** As a prospective buyer, I want to read verified client experiences, so that I can build confidence in Winstone Projects' delivery and quality.

#### Acceptance Criteria

1. THE Testimonials_Section SHALL display the label "CLIENT STORIES · What Our Clients Say".
2. THE Testimonials_Section SHALL render exactly three Testimonial_Cards with the following data:
   - Client: "Meera Subramaniam", Location: "BANGALORE", Quote: "RERA compliance and legal clarity were our top priorities — Winstone Projects excelled on both fronts. The handover of our Indiranagar commercial unit was smooth and on schedule. A partner you can truly trust."
   - Client: "Rajesh Nair", Location: "BANGALORE", Quote: "Winstone Projects delivered beyond our expectations. The Arcadia villa we purchased in Whitefield is an absolute masterpiece — the attention to detail, Vastu compliance, and the smart home features are truly world-class. Best decision we ever made."
   - Client: "Vikram Rao", Location: "MUMBAI", Quote: "We purchased a plot in Devanahalli as an investment. The location near the airport and the BMRDA approval gave us confidence. In just two years the value has appreciated significantly. Winstone Projects truly delivers on its promises."

---

### Requirement 10: CTA Banner Section

**User Story:** As a visitor who is ready to engage, I want a prominent call-to-action section, so that I can easily initiate contact or explore properties.

#### Acceptance Criteria

1. THE CTA_Banner SHALL display the heading "Ready to Own a Piece of Bangalore's Finest?".
2. THE CTA_Banner SHALL display the subtext "Connect with our experts to explore exclusive investment opportunities in India's most dynamic city."
3. THE CTA_Banner SHALL display two primary CTA buttons: "GET IN TOUCH" and "EXPLORE PROPERTIES".
4. THE CTA_Banner SHALL display the label "BANGALORE'S MOST TRUSTED LUXURY DEVELOPER".
5. THE CTA_Banner SHALL display a secondary CTA labelled "START A CONVERSATION".
6. WHEN any CTA_Banner button is clicked, THE App SHALL scroll smoothly to the Footer or open the contact channel as appropriate.

---

### Requirement 11: Footer

**User Story:** As a visitor, I want a comprehensive footer with contact details and quick links, so that I can find essential information and reach Winstone Projects easily.

#### Acceptance Criteria

1. THE Footer SHALL display the brand logo text and the tagline "Redefining luxury living in Bangalore since 2018. Premium villas, residential, and commercial developments across India."
2. THE Footer SHALL display social icon links for Instagram, Twitter/X, and LinkedIn.
3. THE Footer SHALL display a "Quick Links" group containing: Home, About Us, Projects, Portfolio, Services, Contact.
4. THE Footer SHALL display an "Our Projects" group containing: Whitefield Villas, Koramangala Residences, Sarjapur Township, Indiranagar Commercial, Mysore Heritage Palms, Devanahalli Plots.
5. THE Footer SHALL display the contact details: address "Prestige Tech Park, Outer Ring Road, Bangalore – 560 103", phone "+91 98450 12345", and email "info@winstoneprojects.in".
6. THE Footer SHALL display a WhatsApp_CTA button labelled "CHAT ON WHATSAPP" linking to `https://wa.me/+919845012345`.
7. THE Footer SHALL display the copyright notice "© 2026 Winstone Projects. All Rights Reserved."
8. THE Footer SHALL display the bottom tagline "Crafted with excellence · Bangalore, India · RERA Registered".

---

### Requirement 12: Image Assets

**User Story:** As a developer, I want all required image assets to be referenced correctly, so that the site renders all visuals without broken images.

#### Acceptance Criteria

1. THE App SHALL reference the following image files, which must be present in the `public/` directory or `src/assets/`:
   - `hero_villa.png`
   - `winstone-projects-B0mWZxEY.jpg`
   - `project_apartments.png`
   - `project_farms.png`
   - `project_villa_interior.png`
   - `winstone-foundation-CnK31L2s.jpg`
   - `nayaz_hero-Dal7fLmT.jpg`
2. IF an image file is not available at build time, THE App SHALL display a styled placeholder with the image's descriptive alt text so no broken-image icon appears.

---

### Requirement 13: Responsive Layout

**User Story:** As a visitor on any device, I want the site to display correctly on mobile, tablet, and desktop screens, so that I have a consistent experience regardless of device.

#### Acceptance Criteria

1. THE Website SHALL render without horizontal overflow on viewport widths from 320px to 1920px.
2. WHEN the viewport width is below 768px, THE Navbar SHALL collapse navigation links into a hamburger menu or equivalent mobile-friendly control.
3. WHEN the viewport width is below 768px, THE Developments_Section and Portfolio_Section SHALL display cards in a single-column layout.
4. WHEN the viewport width is below 768px, THE Services_Section SHALL display service items in a single-column layout.
5. WHEN the viewport width is below 768px, THE Why_Choose_Section SHALL display differentiator items in a single-column layout.

---

### Requirement 14: Performance and Accessibility

**User Story:** As a visitor, I want the page to load quickly and be navigable with a keyboard or screen reader, so that the site is usable for everyone.

#### Acceptance Criteria

1. THE Website SHALL provide descriptive `alt` text for every `<img>` element.
2. THE Navbar SHALL be navigable using keyboard Tab and Enter keys.
3. THE Website SHALL use semantic HTML elements (`<nav>`, `<main>`, `<section>`, `<footer>`, `<h1>`–`<h3>`) to structure content.
4. THE Website SHALL not use inline styles as the sole means of conveying information (color contrast must not be the only differentiator for status badges).
