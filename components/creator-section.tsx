import { ArrowUpRightIcon } from "@/components/icons";
import { conceptProject, creator, creatorContactLinks, type CreatorProfile } from "@/config/creator";

export function CreatorSection({ profile = creator }: { profile?: CreatorProfile }) {
  const contact = creatorContactLinks(profile);

  return <section id="creator" className="creator-section" aria-labelledby="creator-name" data-analytics-project={conceptProject.name}>
    <div className="page-shell creator-grid">
      <div className="creator-label">
        <p className="eyebrow">Independent Concept Project</p>
        <p className="creator-project">{conceptProject.name}<br />Architecture website / {conceptProject.year}</p>
      </div>
      <div className="creator-profile">
        <p className="eyebrow">Designed &amp; developed by</p>
        <h2 id="creator-name">{profile.name}</h2>
        <p className="creator-title">{profile.title}</p>
        <p className="creator-location">{profile.location}</p>
        <p className="creator-availability">{profile.availability}</p>
        <nav className="creator-profiles" aria-label={`${profile.name} profiles`}>
          <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" tabIndex={0} data-analytics-event="creator_linkedin">LinkedIn <ArrowUpRightIcon /></a>
          <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" tabIndex={0} data-analytics-event="creator_github">GitHub <ArrowUpRightIcon /></a>
        </nav>
      </div>
      <div className="creator-invitation">
        <p className="creator-question">Have a similar project in mind?</p>
        <h3>Let&apos;s build something together.</h3>
        <details className="creator-contact">
          <summary className="creator-start" data-analytics-event="creator_start_project">Start a Project <ArrowUpRightIcon /></summary>
          <div className="creator-contact-options">
            <a className="creator-contact-link" href={contact.whatsapp} target="_blank" rel="noopener noreferrer" tabIndex={0} data-analytics-event="creator_whatsapp">
              <span className="creator-contact-label">WhatsApp</span><span className="creator-contact-address">{profile.whatsappDisplay}</span><ArrowUpRightIcon />
            </a>
            <a className="creator-contact-link" href={contact.email} tabIndex={0} data-analytics-event="creator_email">
              <span className="creator-contact-label">Email</span><span className="creator-contact-address">{profile.email}</span><ArrowUpRightIcon />
            </a>
          </div>
        </details>
        {profile.portfolioUrl && <a className="creator-portfolio" href={profile.portfolioUrl} target="_blank" rel="noopener noreferrer" tabIndex={0} data-analytics-event="creator_portfolio">View Portfolio <ArrowUpRightIcon /></a>}
      </div>
    </div>
  </section>;
}
