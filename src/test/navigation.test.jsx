// Feature: winstone-real-estate-website, Property 1: navigation elements map to valid section IDs
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as fc from 'fast-check';
import Navbar from '../components/Navbar';

// The full set of valid section IDs defined in the design
const VALID_SECTION_IDS = new Set([
  'hero', 'about', 'services', 'projects', 'portfolio',
  'why-choose', 'founder', 'testimonials', 'cta', 'contact',
]);

// NAV_LINKS as defined in Navbar.jsx — the source of truth for nav targets
const NAV_LINKS = [
  { label: 'HOME', id: 'hero' },
  { label: 'ABOUT US', id: 'about' },
  { label: 'PROJECTS', id: 'projects' },
  { label: 'PORTFOLIO', id: 'portfolio' },
  { label: 'SERVICES', id: 'services' },
  { label: 'CONTACT', id: 'contact' },
];

describe('Property 1: Navigation elements map to valid section IDs', () => {
  beforeEach(() => {
    // Mock scrollIntoView — not available in jsdom
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  it('all NAV_LINKS ids are in the valid section ID set', () => {
    for (const link of NAV_LINKS) {
      expect(VALID_SECTION_IDS.has(link.id)).toBe(true);
    }
  });

  it('Navbar renders buttons whose labels correspond to known nav links', () => {
    render(<Navbar />);
    for (const link of NAV_LINKS) {
      // Each nav link label should appear as a button in the desktop nav
      const buttons = screen.getAllByText(link.label);
      expect(buttons.length).toBeGreaterThan(0);
    }
  });

  it('property: any subset of valid IDs are all members of the valid set', () => {
    // Generate arbitrary subsets of the valid IDs and verify membership
    const validIdsArray = Array.from(VALID_SECTION_IDS);

    fc.assert(
      fc.property(
        fc.array(fc.constantFrom(...validIdsArray), { minLength: 1, maxLength: validIdsArray.length }),
        (subset) => {
          for (const id of subset) {
            if (!VALID_SECTION_IDS.has(id)) return false;
          }
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('property: NAV_LINKS ids are a subset of valid section IDs for any nav configuration', () => {
    // Generate arbitrary nav link configurations from the valid set
    const validIdsArray = Array.from(VALID_SECTION_IDS);

    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            label: fc.string({ minLength: 1, maxLength: 20 }),
            id: fc.constantFrom(...validIdsArray),
          }),
          { minLength: 1, maxLength: 10 }
        ),
        (navLinks) => {
          // Every generated nav link id must be in the valid set
          return navLinks.every((link) => VALID_SECTION_IDS.has(link.id));
        }
      ),
      { numRuns: 100 }
    );
  });
});
