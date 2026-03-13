import type { Metadata } from "next";
import { PageHero } from "../components/page-hero";
import { PageShell } from "../components/page-shell";
import { cultivationTracks, currentStudents } from "../site-data";

export const metadata: Metadata = {
  title: "Cultivation | SSQS",
};

export default function CultivationPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Cultivation"
        title="Training Through Theory, Experiment, and Communication"
        summary="The laboratory treats cultivation as part of research itself, with students growing through literature, hands-on work, structured feedback, and increasing scientific responsibility."
      />

      <main className="site-width page-content">
        <section className="content-section">
          <div className="section-heading">
            <p className="eyebrow">Training Approach</p>
            <h2>How students are developed in SSQS</h2>
          </div>

          <div className="cultivation-grid">
            {cultivationTracks.map((track) => (
              <article className="info-card" key={track.title}>
                <h3>{track.title}</h3>
                <p>{track.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section dual-panel">
          <article className="panel">
            <p className="eyebrow">Daily Research Life</p>
            <h2>Typical components of training</h2>
            <ul className="plain-list">
              <li>Literature reading and structured paper discussion</li>
              <li>Weekly group meetings and progress reporting</li>
              <li>Optics, cryogenic, and instrumentation practice</li>
              <li>Data analysis, plotting, and interpretation</li>
              <li>Scientific writing and presentation feedback</li>
              <li>Gradually increasing project ownership</li>
            </ul>
          </article>

          <article className="panel">
            <p className="eyebrow">Current Researchers</p>
            <h2>Student roster</h2>
            <div className="chip-wrap">
              {currentStudents.map((name) => (
                <span className="name-chip" key={name}>
                  {name}
                </span>
              ))}
            </div>
          </article>
        </section>
      </main>
    </PageShell>
  );
}
