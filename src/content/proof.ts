/**
 * Social proof.
 *
 * Intentionally empty. Every proof component on the site renders nothing
 * (or a neutral structural state) until real, approved entries are added
 * here. Do not add placeholder names, logos, quotes or numbers.
 */

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  /** Optional case study slug to link to. */
  work?: string;
};

export type Client = {
  name: string;
  /** Path to a monochrome SVG logo in /public/clients. */
  logo: string;
  href?: string;
};

export type Recognition = { title: string; issuer: string; year: string; href?: string };

export const testimonials: Testimonial[] = [];
export const clients: Client[] = [];
export const recognition: Recognition[] = [];
