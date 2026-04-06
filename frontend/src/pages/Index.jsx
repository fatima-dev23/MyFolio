import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import CustomCursor from '@/components/CustomCursor';
import HeroSection from '@/components/HeroSection';
import ExperienceSection from '@/components/ExperienceSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import SignatureSVG from '@/components/SignatureSVG';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const horizontalRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    if (horizontalRef.current && triggerRef.current) {
      const sections = gsap.utils.toArray('.panel');
      const totalWidth = sections.reduce((acc, section) => acc + section.offsetWidth, 0);

      const scrollTween = gsap.to(horizontalRef.current, {
        x: () => -(totalWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        scrollTween.kill();
        ScrollTrigger.getAll().forEach((t) => t.kill());
        lenis.destroy();
      };
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative bg-background">
      <CustomCursor />
      <SignatureSVG scrollContainer={triggerRef} />

      <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-8 py-6">
        <div className="font-display text-xl font-bold tracking-wider text-foreground">
          <span className="text-primary">F</span>ATIMA
        </div>
        <div className="flex items-center gap-8">
          {['Work', 'About', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="group relative font-mono text-sm uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
            >
              {item}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all group-hover:w-full" />
            </a>
          ))}
        </div>
      </nav>

      <div className="fixed left-0 right-0 top-0 z-40 h-0.5 bg-muted">
        <div className="h-full bg-primary shadow-neon-sm" style={{ width: '0%' }} id="progress-bar" />
      </div>

      <div className="relative">
  <div className="flex flex-col w-full"> 
    <HeroSection />
    <ExperienceSection />
    <ProjectsSection />
    <ContactSection />
  </div>
</div>

      <div className="fixed bottom-8 right-8 z-50">
        <div className="flex flex-col items-center gap-2">
          <div className="h-20 w-0.5 overflow-hidden rounded-full bg-muted">
            <div className="w-full bg-primary transition-all" id="scroll-indicator" style={{ height: '0%' }} />
          </div>
          <span className="font-mono text-xs text-muted-foreground">scroll</span>
        </div>
      </div>
    </div>
  );
};

export default Index;