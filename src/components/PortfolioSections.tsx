import { ArrowUpRight } from 'lucide-react';
import { SITE_CONFIG } from '@/src/config';

export function PortfolioSections() {
  return (
    <>
      <section id="works" className="content-section works-section">
        <div className="section-heading works-heading">
          <span>{SITE_CONFIG.sections.works.eyebrow}</span>
          <h2>{SITE_CONFIG.sections.works.title.map((line) => <span key={line}>{line}</span>)}</h2>
        </div>

        <div className="projects-list">
          {SITE_CONFIG.projects.map((project, index) => {
            const isExternal = project.href.startsWith('http');
            return (
              <article key={project.title}>
                <div className="project-index"><span>{String(index + 1).padStart(2, '0')}</span><span>{project.year}</span></div>
                <div className="project-copy">
                  <span>{project.tag}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
                <a
                  className="project-link"
                  href={project.href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noreferrer' : undefined}
                  aria-label={`${project.linkLabel}：${project.title}`}
                >
                  <span>{project.linkLabel}</span><ArrowUpRight size={18} />
                </a>
              </article>
            );
          })}
        </div>
      </section>

      <footer id="contact" className="contact-section">
        <div className="contact-heading">
          <span>{SITE_CONFIG.sections.contact.eyebrow}</span>
          <h2>{SITE_CONFIG.sections.contact.title.map((line) => <span key={line}>{line}</span>)}</h2>
        </div>
        <div className="contact-meta">
          <p>{SITE_CONFIG.sections.contact.description}</p>
          <p>{SITE_CONFIG.profile.location}</p><p>{SITE_CONFIG.profile.availability}</p>
          <div>{SITE_CONFIG.social.map((item) => <a key={item.label} href={item.href}>{item.label} <ArrowUpRight size={14} /></a>)}</div>
        </div>
        <div className="footer-mark">{SITE_CONFIG.profile.shortName}</div>
      </footer>
    </>
  );
}
