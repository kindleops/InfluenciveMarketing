import type { Metadata } from "next";
import { brand } from "@/config/brand";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <LegalPage title="Terms of use" updated="September 2026">
      <p>
        These terms govern your use of this website operated by {brand.legalName}. By using the site you agree to them.
      </p>
      <h2>Content</h2>
      <p>
        All content on this site, including text, graphics and interface designs, is owned by {brand.legalName} unless
        stated otherwise, and may not be reproduced without permission. Interface compositions shown on the site are
        illustrative representations of the kinds of systems we build.
      </p>
      <h2>No professional advice</h2>
      <p>
        Articles and other materials are provided for general information and do not constitute professional advice
        for your specific situation.
      </p>
      <h2>Engagements</h2>
      <p>Client engagements are governed by a separate written agreement.</p>
      <h2>Contact</h2>
      <p>
        Questions about these terms: <a href={`mailto:${brand.email}`}>{brand.email}</a>.
      </p>
    </LegalPage>
  );
}
