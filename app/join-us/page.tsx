import type { Metadata } from "next";
import { PageHero } from "../components/page-hero";
import { PageShell } from "../components/page-shell";
import { facultyContacts, joinCategories } from "../site-data";

export const metadata: Metadata = {
  title: "Join Us | SSQS",
};

export default function JoinUsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Join Us"
        title="Openings for Students, Engineers, Postdocs, and Collaborators"
        summary="We are especially interested in people who enjoy careful experiments, physical intuition, and long-horizon problems at the interface of quantum optics, spectroscopy, and materials."
      />

      <main className="site-width page-content">
        <section className="content-section">
          <div className="join-grid">
            {joinCategories.map((item) => (
              <article className="info-card" key={item.title}>
                <h2>{item.title}</h2>
                <p>{item.details}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section dual-panel">
          <article className="panel">
            <p className="eyebrow">Research Fit</p>
            <h2>Backgrounds that match the lab well</h2>
            <ul className="plain-list">
              <li>Quantum information or AMO physics</li>
              <li>Optics and laser experiments</li>
              <li>Solid-state spectroscopy and rare-earth materials</li>
              <li>Cryogenic measurements and instrumentation</li>
              <li>Scientific programming, automation, or data analysis</li>
            </ul>
          </article>

          <article className="panel panel-accent">
            <p className="eyebrow">Contact</p>
            <h2>Initial contact</h2>
            <p>
              Please write with a CV and a short description of your interests. If possible, include supporting material
              such as transcripts, publications, or project summaries.
            </p>
            <div className="link-stack">
              {facultyContacts.map((member) => (
                <a href={`mailto:${member.email}`} key={member.email}>
                  {member.name} | {member.email}
                </a>
              ))}
            </div>
          </article>
        </section>
      </main>
    </PageShell>
  );
}
