// Feature: winstone-real-estate-website, Property 5: image error handler prevents broken-image icons
import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import * as fc from 'fast-check';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import PortfolioCard from '../components/PortfolioCard';
import ProjectCard from '../components/ProjectCard';

/**
 * Fires an error event on every <img> in the container and asserts
 * that each src is replaced with a data:image/svg+xml URI.
 */
function assertImgErrorFallback(container) {
  const imgs = container.querySelectorAll('img');
  for (const img of imgs) {
    fireEvent.error(img);
    expect(img.src).toMatch(/^data:image\/svg\+xml/);
  }
  return imgs.length;
}

describe('Property 5: Image error handler prevents broken-image icons', () => {
  it('AboutSection: img src replaced with svg data URI on error', () => {
    const { container } = render(<AboutSection />);
    const count = assertImgErrorFallback(container);
    expect(count).toBeGreaterThan(0);
  });

  it('PortfolioCard: img src replaced with svg data URI on error', () => {
    const props = {
      image: '/some-image.jpg',
      name: 'Test Property',
      location: 'Bangalore',
      type: 'LUXURY VILLAS',
      status: 'COMPLETED',
      year: '2024',
      description: 'A test property.',
    };
    const { container } = render(<PortfolioCard {...props} />);
    const count = assertImgErrorFallback(container);
    expect(count).toBeGreaterThan(0);
  });

  it('ProjectCard: img src replaced with svg data URI on error', () => {
    const props = {
      image: '/some-project.jpg',
      name: 'Test Project',
      type: 'RESIDENTIAL',
      location: 'Whitefield',
      description: 'A test project.',
    };
    const { container } = render(<ProjectCard {...props} />);
    const count = assertImgErrorFallback(container);
    expect(count).toBeGreaterThan(0);
  });

  it('property: PortfolioCard with arbitrary image paths always falls back to svg data URI on error', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 100 }),
        fc.constantFrom('COMPLETED', 'ONGOING'),
        (imagePath, status) => {
          const props = {
            image: imagePath,
            name: 'Property',
            location: 'Bangalore',
            type: 'VILLAS',
            status,
            year: '2024',
            description: 'Description.',
          };
          const { container } = render(<PortfolioCard {...props} />);
          const imgs = container.querySelectorAll('img');
          for (const img of imgs) {
            fireEvent.error(img);
            if (!img.src.startsWith('data:image/svg+xml')) return false;
          }
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('property: ProjectCard with arbitrary image paths always falls back to svg data URI on error', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 100 }),
        (imagePath) => {
          const props = {
            image: imagePath,
            name: 'Project',
            type: 'RESIDENTIAL',
            location: 'Bangalore',
            description: 'Description.',
          };
          const { container } = render(<ProjectCard {...props} />);
          const imgs = container.querySelectorAll('img');
          for (const img of imgs) {
            fireEvent.error(img);
            if (!img.src.startsWith('data:image/svg+xml')) return false;
          }
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });
});
