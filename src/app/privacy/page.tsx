import type { Metadata } from "next";
import { brand } from "@/config/brand";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy" updated="September 2026">
      <p>
        This policy explains what information {brand.legalName} collects through this website, how it is used and the
        choices you have.
      </p>
      <h2>Information you give us</h2>
      <p>
        When you submit a project inquiry we collect the details you provide — such as your name, work email, company,
        role, website and the description of your project — in order to respond and to prepare for a conversation.
      </p>
      <h2>Information collected automatically</h2>
      <p>
        We may collect limited technical information such as browser type and pages visited to operate and improve the
        site. Your in-progress inquiry is stored only in your own browser until you submit it.
      </p>
      <h2>How we use information</h2>
      <ul>
        <li>To respond to inquiries and provide our services.</li>
        <li>To operate, secure and improve this website.</li>
        <li>To comply with legal obligations.</li>
      </ul>
      <h2>Your choices</h2>
      <p>
        You can ask us to access, correct or delete your information at any time by contacting{" "}
        <a href={`mailto:${brand.email}`}>{brand.email}</a>.
      </p>
    </LegalPage>
  );
}
