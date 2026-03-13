import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "../components/page-hero";
import { PageShell } from "../components/page-shell";
import { facultyMembers, publications, researchThemes } from "../site-data";

export const metadata: Metadata = {
  title: "Research | SSQS",
};

export default function ResearchPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Research"
        title="Faculty, Research Directions, and Recent Papers"
        summary="Research at SSQS is organized around the people leading the laboratory, the materials and coherence questions defining the group, and recent papers that show how those questions are being answered."
      />

      <main className="site-width page-content">
        <section className="content-section">
          <div className="section-heading">
            <p className="eyebrow">Faculty</p>
            <h2>Research leadership</h2>
            <p className="section-text">
              The faculty section now works like a proper lab directory: portraits, current contact details, concise
              research summaries, and dedicated profile pages for each principal researcher.
            </p>
          </div>

          <div className="faculty-grid faculty-grid-featured">
            {facultyMembers.map((member) => (
              <article className="faculty-card faculty-card-featured" key={member.slug}>
                <Link className="faculty-portrait-link" href={`/research/${member.slug}`}>
                  <div className="faculty-portrait">
                    <img src={member.portrait} alt={member.name} loading="lazy" />
                  </div>
                </Link>

                <div className="faculty-card-copy">
                  <p className="role-label">{member.role}</p>
                  <h3>
                    <Link href={`/research/${member.slug}`}>{member.name}</Link>
                  </h3>
                  <p className="faculty-direction">{member.direction}</p>
                  <p>{member.cardSummary}</p>
                  <div className="focus-list">
                    {member.focus.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                  <div className="action-row action-row-compact">
                    <Link href={`/research/${member.slug}`}>Profile</Link>
                    <a href={`mailto:${member.email}`}>{member.email}</a>
                    <a href={member.officialHref} target="_blank" rel="noreferrer">
                      Official page
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section">
          <div className="section-heading">
            <p className="eyebrow">Research Directions</p>
            <h2>Specific systems and questions</h2>
          </div>

          <div className="theme-grid">
            {researchThemes.map((theme) => (
              <article className="theme-card" key={theme.title}>
                <h3>{theme.title}</h3>
                <p>
                  <strong>Systems:</strong> {theme.systems}
                </p>
                <p>
                  <strong>Methods:</strong> {theme.methods}
                </p>
                <p>
                  <strong>Goal:</strong> {theme.goal}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section">
          <div className="section-heading">
            <p className="eyebrow">Publications</p>
            <h2>Recent papers and what each one contributed</h2>
            <p className="section-text">
              Each entry keeps the emphasis on the scientific result and links out to the journal or source page rather
              than directly to a local PDF.
            </p>
          </div>

          <div className="publication-stack">
            {publications.map((paper) => (
              <article className={`publication-card${paper.image ? "" : " text-only"}`} key={paper.title}>
                {paper.image ? (
                  <div className="publication-media">
                    <Image
                      src={paper.image}
                      alt={paper.title}
                      fill
                      sizes="(max-width: 900px) 100vw, 28vw"
                      className="cover-image"
                    />
                  </div>
                ) : null}

                <div className="publication-copy">
                  <p className="publication-meta">
                    {paper.venue} | {paper.year}
                  </p>
                  <h3>{paper.title}</h3>
                  <p>
                    <strong>Result:</strong> {paper.result}
                  </p>
                  <p>
                    <strong>Why it matters:</strong> {paper.significance}
                  </p>
                  {paper.sourceHref ? (
                    <div className="action-row action-row-compact">
                      <a href={paper.sourceHref} target="_blank" rel="noreferrer">
                        Source
                      </a>
                    </div>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </PageShell>
  );
}
