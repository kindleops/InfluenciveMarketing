import type { TeamMember } from "../../model";

/*
 * DEVELOPER FIXTURE. Apart from the founder, these are placeholder people
 * used to exercise the UI. A production source returns the real roster.
 */
export const TEAM: TeamMember[] = [
  { id: "t-ryan", name: "Ryan Kindle", title: "Founder", focus: "Strategy and the whole engagement", lead: true },
  { id: "t-avery", name: "Avery Chen", title: "Growth Strategist", focus: "Roadmap, experiments and reporting" },
  { id: "t-noor", name: "Noor Haddad", title: "Creative Director", focus: "Brand, campaign creative and film" },
  { id: "t-theo", name: "Theo Marsh", title: "Media Buyer", focus: "Meta and Google acquisition" },
  { id: "t-jules", name: "Jules Park", title: "Designer", focus: "Website and product design" },
  { id: "t-sam", name: "Sam Okafor", title: "Developer", focus: "Website build and integrations" },
  { id: "t-iris", name: "Iris Lund", title: "Content Lead", focus: "Editorial, SEO and email" },
];
