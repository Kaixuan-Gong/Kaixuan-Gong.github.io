'use client';

import { useLayoutEffect, useRef, type CSSProperties } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { SITE_CONFIG } from '@/src/config';

export function PortfolioSections() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!rootRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observers: IntersectionObserver[] = [];
    const context = gsap.context(() => {
      rootRef.current?.querySelectorAll<HTMLElement>('[data-reveal-group]').forEach((group) => {
        const items = group.querySelectorAll<HTMLElement>('.section-reveal');
        gsap.set(items, { opacity: 0, y: 30 });

        const observer = new IntersectionObserver(([entry]) => {
          if (!entry.isIntersecting) return;
          gsap.to(items, {
            opacity: 1,
            y: 0,
            duration: 0.72,
            stagger: 0.07,
            ease: 'power3.out',
            clearProps: 'opacity,transform',
          });
          observer.disconnect();
        }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

        observer.observe(group);
        observers.push(observer);
      });
    }, rootRef);

    return () => {
      observers.forEach((observer) => observer.disconnect());
      context.revert();
    };
  }, []);

  return (
    <div ref={rootRef}>
      <section id="works" className="content-section works-section" data-reveal-group>
        <header className="works-masthead">
          <div className="works-kicker section-reveal">
            <span>{SITE_CONFIG.sections.works.eyebrow}</span>
            <span>{String(SITE_CONFIG.projects.length).padStart(2, '0')} PROJECTS</span>
          </div>
          <h2 className="section-reveal" aria-label="Selected work">
            {SITE_CONFIG.sections.works.title.map((line) => <span key={line}>{line}</span>)}
          </h2>
          <p className="works-intro section-reveal">从 AI 产品落地、增长实验到独立创业，选择几件真正做过且持续影响我的事。</p>
        </header>

        <div className="projects-list">
          {SITE_CONFIG.projects.map((project, index) => {
            const isExternal = project.href.startsWith('http');
            return (
              <article
                className="project-row section-reveal"
                key={project.title}
                style={{ '--project-accent': project.accent } as CSSProperties}
              >
                <div className="project-index">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <span>{project.year}</span>
                </div>
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
                  <span>{project.linkLabel}</span>
                  <i aria-hidden="true"><ArrowUpRight size={21} /></i>
                </a>
              </article>
            );
          })}
        </div>
      </section>

      <footer id="contact" className="contact-section" data-reveal-group>
        <div className="contact-topline section-reveal">
          <span>{SITE_CONFIG.sections.contact.eyebrow}</span>
          <span>{SITE_CONFIG.profile.location}</span>
        </div>
        <div className="contact-heading section-reveal">
          <h2>{SITE_CONFIG.sections.contact.title.join(' ')}</h2>
        </div>
        <div className="contact-meta section-reveal">
          <p>{SITE_CONFIG.sections.contact.description}</p>
          <p>{SITE_CONFIG.profile.availability}</p>
          <div className="contact-links">
            {SITE_CONFIG.social.map((item) => (
              <a key={item.label} href={item.href}>{item.label}<ArrowUpRight size={17} /></a>
            ))}
          </div>
        </div>
        <div className="footer-note section-reveal">
          <span>AI PRODUCT</span><span>COMMERCIAL</span><span>DESIGN</span>
        </div>
        <div className="footer-mark" aria-hidden="true">{SITE_CONFIG.profile.shortName}</div>
      </footer>
    </div>
  );
}
