import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "../../components/page-shell";
import { facultyMembers, getFacultyMember } from "../../site-data";

type FacultyProfileProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: FacultyProfileProps): Promise<Metadata> {
  const { slug } = await params;
  const member = getFacultyMember(slug);

  if (!member) {
    return {
      title: "Faculty | SSQS",
    };
  }

  return {
    title: `${member.name} | SSQS`,
  };
}

export function generateStaticParams() {
  return facultyMembers.map((member) => ({
    slug: member.slug,
  }));
}

export default async function FacultyProfilePage({ params }: FacultyProfileProps) {
  const { slug } = await params;
  const member = getFacultyMember(slug);

  if (!member) {
    notFound();
  }

  return (
    <PageShell>
      <main className="site-width page-content faculty-profile-page">
        <div className="profile-breadcrumbs">
          <Link href="/research">Research</Link>
          <span>/</span>
          <span>{member.name}</span>
        </div>

        <section className="faculty-profile-hero">
          <div className="faculty-profile-portrait">
            <img src={member.portrait} alt={member.name} />
          </div>

          <div className="faculty-profile-copy">
            <p className="eyebrow">Faculty</p>
            <h1>{member.name}</h1>
            <p className="faculty-profile-role">{member.role}</p>

            {member.bio.map((paragraph) => (
              <p className="hero-text profile-text" key={paragraph}>
                {paragraph}
              </p>
            ))}

            <div className="profile-meta-grid">
              <article className="info-card profile-meta-card">
                <h2>Research Direction</h2>
                <p>{member.direction}</p>
              </article>

              <article className="info-card profile-meta-card">
                <h2>Contact</h2>
                <div className="link-stack">
                  <a href={`mailto:${member.email}`}>{member.email}</a>
                  {member.office ? <p>{member.office}</p> : null}
                  <a href={member.officialHref} target="_blank" rel="noreferrer">
                    Official profile source
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="content-section dual-panel">
          <article className="panel">
            <p className="eyebrow">Focus</p>
            <h2>Current emphasis in SSQS</h2>
            <div className="focus-list">
              {member.focus.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>

          <article className="panel">
            <p className="eyebrow">Education</p>
            <h2>Academic background</h2>
            <ul className="plain-list">
              {member.education.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </section>

        <section className="content-section dual-panel">
          <article className="panel">
            <p className="eyebrow">Experience</p>
            <h2>Professional experience</h2>
            <ul className="plain-list">
              {member.experience.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="panel">
            <p className="eyebrow">Source</p>
            <h2>Official information reference</h2>
            <p>
              This profile is organized for the SSQS website and keeps a direct reference back to the current official
              faculty source.
            </p>
            <div className="action-row action-row-compact">
              <a href={member.officialHref} target="_blank" rel="noreferrer">
                Official profile
              </a>
            </div>
          </article>
        </section>

        <section className="content-section">
          <div className="section-heading">
            <p className="eyebrow">Representative Work</p>
            <h2>Selected publications</h2>
          </div>

          <div className="profile-publication-list">
            {member.selectedWorks.map((work) => (
              <article className="info-card profile-publication-card" key={work.title}>
                <h3>{work.title}</h3>
                <p>{work.citation}</p>
                {work.href ? (
                  <div className="action-row action-row-compact">
                    <a href={work.href} target="_blank" rel="noreferrer">
                      Source
                    </a>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      </main>
    </PageShell>
  );
}
