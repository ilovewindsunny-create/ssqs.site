import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "../components/page-hero";
import { PageShell } from "../components/page-shell";
import { ResearchSidebar } from "../components/research-sidebar";
import { cultivationTracks, facultyMembers, publications, researchThemes, studentMembers } from "../site-data";

export const metadata: Metadata = {
  title: "Research | SSQS",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function ResearchPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Research"
        title="People, Directions, Training, and Recent Papers"
        summary="Research at SSQS is organized around the faculty leading the laboratory, the students growing through active projects, the materials and coherence questions defining the group, and the papers that show how those questions are being answered."
      />

      <main className="site-width page-content">
        <div className="sidebar-layout">
          <ResearchSidebar activeKey="overview" />

          <div className="sidebar-content">
            <section className="content-section side-panel-section" id="directions">
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

            <section className="content-section side-panel-section" id="faculty">
              <div className="section-heading">
                <p className="eyebrow">Researcher</p>
                <h2>Research leadership</h2>
                <p className="section-text">
                  Compact faculty profiles, current contact details, concise research summaries, and dedicated profile
                  pages for each principal researcher.
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

            <section className="content-section side-panel-section" id="students">
              <div className="section-heading">
                <p className="eyebrow">Talent Team</p>
                <h2>Current student researchers</h2>
                <p className="section-text">
                  Each student card already reserves space for a portrait, so future photo updates can be added without
                  changing the page structure again.
                </p>
              </div>

              <div className="student-grid">
                {studentMembers.map((student) => (
                  <article className="student-card" key={student.email}>
                    {student.portrait ? (
                      <div className="student-photo">
                        <img src={student.portrait} alt={student.name} loading="lazy" />
                      </div>
                    ) : (
                      <div
                        className="student-photo student-photo-placeholder"
                        aria-label={`${student.name} portrait placeholder`}
                      >
                        <span>{getInitials(student.name)}</span>
                        <small>Photo to be added</small>
                      </div>
                    )}

                    <div className="student-card-copy">
                      <p className="role-label">{student.role}</p>
                      <h3>{student.name}</h3>
                      <p>{student.summary}</p>
                      <div className="action-row action-row-compact">
                        <a href={`mailto:${student.email}`}>{student.email}</a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="content-section side-panel-section" id="training">
              <div className="section-heading">
                <p className="eyebrow">Research Training</p>
                <h2>How students are developed in SSQS</h2>
                <p className="section-text">
                  The cultivation content is now part of Research itself, so student development appears as a natural
                  part of ongoing laboratory work rather than as a separate administrative page.
                </p>
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

            <section className="content-section side-panel-section" id="publications">
              <div className="section-heading">
                <p className="eyebrow">Achievements</p>
                <h2>Recent papers and what each one contributed</h2>
                <p className="section-text">
                  Each entry keeps the emphasis on the scientific result and links out to the journal or source page
                  rather than directly to a local PDF.
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
          </div>
        </div>
      </main>
    </PageShell>
  );
}
