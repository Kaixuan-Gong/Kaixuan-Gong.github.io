'use client';

import { useCallback, useEffect, useState, type MouseEvent } from 'react';
import { ArrowDownRight, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { AvatarScene } from '@/src/components/AvatarScene';
import { ResumePanel } from '@/src/components/ResumePanel';
import { PortfolioSections } from '@/src/components/PortfolioSections';
import { SITE_CONFIG } from '@/src/config';

gsap.registerPlugin(ScrollToPlugin);

export default function Home() {
  const [activeSticker, setActiveSticker] = useState<string | null>(null);

  useEffect(() => {
    if (!activeSticker) return;

    const previousOverflow = document.body.style.overflow;
    const previousOverscroll = document.body.style.overscrollBehavior;
    document.body.style.overflow = 'hidden';
    document.body.style.overscrollBehavior = 'none';

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.overscrollBehavior = previousOverscroll;
    };
  }, [activeSticker]);

  const handleAnchorClick = useCallback((event: MouseEvent<HTMLElement>) => {
    const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
    const href = anchor?.getAttribute('href');
    if (!href || href === '#') return;

    const target = document.querySelector<HTMLElement>(href);
    if (!target) return;

    event.preventDefault();
    if (activeSticker && href !== '#home') return;
    setActiveSticker(null);

    const targetY = href === '#home' ? 0 : target.offsetTop - (window.innerWidth <= 900 ? 72 : 84);
    const distance = Math.abs(window.scrollY - targetY);
    const duration = Math.min(1.35, Math.max(0.72, distance / 1450));

    gsap.killTweensOf(window);
    window.history.replaceState(null, '', href);
    gsap.to(window, {
      scrollTo: { y: Math.max(0, targetY), autoKill: true },
      duration,
      ease: 'power3.inOut',
    });
  }, [activeSticker]);

  return (
    <main onClick={handleAnchorClick}>
      <section id="home" className={`hero-shell ${activeSticker ? 'has-active-sticker' : ''}`} aria-label="3D 虚拟形象首页">
        <span id="resume" className="hero-resume-anchor" aria-hidden="true" />
        <nav className="top-nav" aria-label="主导航">
          <a className="brand" href="#home" aria-label="返回首页"><span className="brand-dot" />{SITE_CONFIG.profile.shortName}</a>
          <div className="nav-links">
            {SITE_CONFIG.navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-disabled={Boolean(activeSticker && item.href !== '#home')}
                tabIndex={activeSticker && item.href !== '#home' ? -1 : undefined}
              >
                {item.label}
              </a>
            ))}
          </div>
          <a className="nav-cta" href="#contact">联系我 <ArrowDownRight size={15} /></a>
        </nav>

        <div className="hero-copy">
          <div className="eyebrow"><Sparkles size={14} /> AI NATIVE PROFILE</div>
          <h1>{SITE_CONFIG.profile.name}</h1>
          <p>{SITE_CONFIG.profile.tagline}</p>
          <div className="interaction-hint"><span className="pulse-dot" /> 点击脸上的贴纸，探索我的经历</div>
        </div>

        <div className="hero-spatial" aria-hidden="true">
          <div className="spatial-orbit"><span /><span /></div>
          <div className="spatial-axis spatial-axis-x" />
          <div className="spatial-axis spatial-axis-y" />
          <strong>KX</strong>
        </div>

        <div className="scene-frame">
          <AvatarScene activeSticker={activeSticker} onStickerSelect={setActiveSticker} />
        </div>

        <div className="hero-index" aria-hidden="true"><span>01</span><div /><span>{String(SITE_CONFIG.stickers.length).padStart(2, '0')}</span></div>
        <ResumePanel activeSticker={activeSticker} onClose={() => setActiveSticker(null)} />
        <a className="scroll-cue" href="#works"><span>查看作品</span><ArrowDownRight size={18} /></a>
      </section>
      <PortfolioSections />
    </main>
  );
}
