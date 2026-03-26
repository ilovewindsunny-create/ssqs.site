import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "../components/page-hero";
import { PageShell } from "../components/page-shell";
import { ResearchSidebar, type SidebarGroup } from "../components/research-sidebar";
import { keyEquipment, publications, researchPlatforms } from "../site-data";

export const metadata: Metadata = {
  title: "Research | SSQS",
};

const researchSidebarGroups: SidebarGroup[] = [
  { key: "publications", title: "Achievements", href: "/research#publications" },
  { key: "platforms", title: "Research Platforms", href: "/research#platforms" },
];

export default function ResearchPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Research"
        title="Research Achievements and Experimental Platforms"
        summary="SSQS develops solid-state quantum memory through materials discovery, high-performance memory experiments, and the laboratory platforms required for spectroscopy, cryogenic measurements, and system integration."
      />

      <main className="site-width page-content research-page-main">
        <div className="sidebar-layout research-page-layout">
          <ResearchSidebar ariaLabel="Research sections" groups={researchSidebarGroups} />

          <div className="sidebar-content">
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
                          sizes="(max-width: 1100px) 100vw, 42vw"
                          className="publication-figure-image"
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

            <section className="content-section side-panel-section" id="platforms">
              <div className="section-heading">
                <p className="eyebrow">Research Platforms</p>
                <h2>Experimental infrastructure supporting SSQS</h2>
                <p className="section-text">
                  These platform views summarize the laboratory environments behind SSQS work in rare-earth
                  spectroscopy, cryogenic memory experiments, and new-material screening.
                </p>
              </div>

              <div className="platform-grid">
                {researchPlatforms.map((platform) => (
                  <article className="platform-card" key={platform.title}>
                    <div className="platform-image">
                      <Image
                        src={platform.image}
                        alt={platform.title}
                        fill
                        sizes="(max-width: 1100px) 100vw, 44vw"
                        className="platform-cover-image"
                      />
                    </div>
                    <div className="platform-copy">
                      <h3>{platform.title}</h3>
                      <p>{platform.summary}</p>
                      <p>{platform.details}</p>
                      {platform.equipment?.length ? (
                        <ul className="platform-equipment-list">
                          {platform.equipment.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>

              <div className="section-heading equipment-section-heading">
                <p className="eyebrow">Key Equipment</p>
                <h2>Representative instruments from the platform slide</h2>
                <p className="section-text">
                  These images are organized from the laboratory presentation materials and highlight the equipment
                  supporting spectroscopy, cryogenic measurements, and optical control.
                </p>
              </div>

              <div className="equipment-grid">
                {keyEquipment.map((item) => (
                  <article className="equipment-card" key={item.title}>
                    <div className="equipment-image">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 780px) 100vw, (max-width: 1100px) 50vw, 48vw"
                        className="equipment-cover-image"
                      />
                    </div>
                    <div className="equipment-copy">
                      <h3>{item.title}</h3>
                      <p>{item.summary}</p>
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
