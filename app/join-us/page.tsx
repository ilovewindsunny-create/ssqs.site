import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "../components/page-hero";
import { PageShell } from "../components/page-shell";
import { facultyContacts, joinContactInfo } from "../site-data";

export const metadata: Metadata = {
  title: "Join Us | SSQS",
};

export default function JoinUsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Join Us"
        title="Opening"
        summary="Contact SSQS for opportunities in student research, engineering, postdoctoral work, and academic collaboration."
      />

      <main className="site-width page-content join-us-page">
        <section className="content-section join-contact-shell">
          <div className="join-contact-layout">
            <article className="join-contact-copy">
              <p className="join-contact-lead">{joinContactInfo.opening}</p>
              <p>{joinContactInfo.application}</p>

              <dl className="join-contact-meta">
                <div className="join-contact-meta-row">
                  <dt>Affiliation</dt>
                  <dd>{joinContactInfo.affiliation}</dd>
                </div>
                <div className="join-contact-meta-row">
                  <dt>Address</dt>
                  <dd>{joinContactInfo.address}</dd>
                </div>
                <div className="join-contact-meta-row">
                  <dt>Metro</dt>
                  <dd>{joinContactInfo.metro}</dd>
                </div>
              </dl>

              <div className="join-contact-directory">
                {facultyContacts.map((member) => (
                  <div className="join-contact-person" key={member.email}>
                    <a href={member.href}>{member.name}</a>
                    <a href={`mailto:${member.email}`}>{member.email}</a>
                  </div>
                ))}
              </div>
            </article>

            <aside className="join-contact-visual">
              <p className="eyebrow">Visit Guide</p>
              <div className="join-contact-image-frame">
                <Image
                  src={joinContactInfo.visitImage}
                  alt="Annotated route map for visiting SSQS"
                  fill
                  sizes="(max-width: 1100px) 100vw, 42vw"
                  className="join-contact-image"
                />
              </div>
              <p className="join-contact-caption">{joinContactInfo.visitCaption}</p>
              <ul className="join-contact-notes">
                {joinContactInfo.visitNotes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </aside>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
