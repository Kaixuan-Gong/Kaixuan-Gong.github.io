'use client';

import { useEffect, useLayoutEffect, useRef, type CSSProperties } from 'react';
import { X } from 'lucide-react';
import gsap from 'gsap';
import { SITE_CONFIG } from '@/src/config';

type ResumePanelProps = {
  activeSticker: string | null;
  onClose: () => void;
};

export function ResumePanel({ activeSticker, onClose }: ResumePanelProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const sticker = SITE_CONFIG.stickers.find((item) => item.id === activeSticker);
  const experience = SITE_CONFIG.experiences.find((item) => item.id === sticker?.resumeId);

  useLayoutEffect(() => {
    if (!sticker || !contentRef.current) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        '.panel-reveal',
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.58,
          stagger: 0.055,
          delay: 0.18,
          ease: 'power3.out',
          clearProps: 'opacity,transform',
        },
      );
    }, contentRef);

    return () => context.revert();
  }, [sticker]);

  useEffect(() => {
    if (!sticker) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, sticker]);

  return (
    <aside
      className={`resume-panel ${sticker ? 'is-open' : ''}`}
      aria-hidden={!sticker}
      style={{ '--panel-accent': sticker?.accent ?? SITE_CONFIG.theme.accent } as CSSProperties}
    >
      {sticker && (
        <>
          <button className="panel-close" type="button" onClick={onClose} aria-label="关闭经历详情">
            <X size={19} />
          </button>

          <div className="resume-panel-scroll" ref={contentRef} key={sticker.id}>
            {experience ? (
              <ExperienceContent experience={experience} />
            ) : sticker.resumeId === 'education' ? (
              <EducationContent />
            ) : (
              <PersonalContent title={sticker.title} kicker={sticker.kicker} summary={sticker.summary} />
            )}
          </div>
        </>
      )}
    </aside>
  );
}

function ExperienceContent({ experience }: { experience: (typeof SITE_CONFIG.experiences)[number] }) {
  return (
    <>
      <div className="panel-date panel-reveal"><span />{experience.period}</div>
      <header className="panel-title panel-reveal">
        <h2>{experience.company}</h2>
        <p>{experience.role}</p>
      </header>
      <p className="panel-summary panel-reveal">{experience.summary}</p>

      <div className="panel-achievements">
        {experience.achievements.map((achievement, index) => (
          <section className="panel-section panel-reveal" key={achievement.title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <div>
              <h3>{achievement.title}</h3>
              <p>{achievement.text}</p>
            </div>
          </section>
        ))}
      </div>

    </>
  );
}

function EducationContent() {
  const education = SITE_CONFIG.resumeOverview.education;
  const skills = SITE_CONFIG.resumeOverview.skills;
  const project = SITE_CONFIG.resumeProject;

  return (
    <>
      <div className="panel-date panel-reveal"><span />{education.period}</div>
      <header className="panel-title panel-reveal">
        <h2>{education.school}</h2>
        <p>{education.degree}</p>
      </header>
      <p className="panel-summary panel-reveal">{education.facts.join(' · ')}</p>

      <section className="panel-section panel-skills panel-reveal">
        <span>SKILLS</span>
        <div>
          <h3>{skills.label}</h3>
          <div className="panel-skill-groups">
            {skills.groups.map((group) => (
              <p key={group.title}><strong>{group.title}</strong>{group.items.join(' / ')}</p>
            ))}
          </div>
        </div>
      </section>

      <div className="panel-project-block">
        <div className="panel-project-label panel-reveal">{project.eyebrow}</div>
        <header className="panel-project-title panel-reveal">
          <h3>{project.title}</h3>
          <p>{project.role}</p>
        </header>
        <p className="panel-summary panel-reveal">{project.summary}</p>

        {project.achievements.map((achievement, index) => (
          <section className="panel-section panel-reveal" key={achievement.title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <div><h3>{achievement.title}</h3><p>{achievement.text}</p></div>
          </section>
        ))}

      </div>
    </>
  );
}

function PersonalContent({ title, kicker, summary }: { title: string; kicker: string; summary: string }) {
  return (
    <>
      <div className="panel-date panel-reveal"><span />ABOUT ME</div>
      <header className="panel-title panel-reveal"><h2>{title}</h2><p>{kicker}</p></header>
      <p className="panel-summary panel-reveal">{summary}</p>
      <section className="panel-section panel-reveal">
        <span>PROFILE</span>
        <div><h3>{SITE_CONFIG.resumeOverview.intro.title}</h3><p>{SITE_CONFIG.resumeOverview.intro.description}</p></div>
      </section>
      <section className="panel-section panel-reveal">
        <span>FOCUS</span>
        <div><h3>AI · 商业 · 设计</h3><p>{SITE_CONFIG.profile.tagline}</p></div>
      </section>
    </>
  );
}
