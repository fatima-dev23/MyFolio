import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PropTypes from 'prop-types';

gsap.registerPlugin(ScrollTrigger);

const SignatureSVG = ({ scrollContainer }) => {
  const pathRef = useRef(null);
  const svgRef = useRef(null);

  const signaturePath = `
    M 50,400 
    C 150,350 200,450 300,400 
    S 450,300 550,350 
    S 700,450 850,380 
    S 1000,300 1150,370 
    S 1300,450 1450,380 
    S 1600,300 1750,370 
    S 1900,450 2050,380 
    S 2200,300 2350,370 
    S 2500,450 2650,380 
    S 2800,300 2950,370 
    S 3100,400 3200,350
    L 3300,350 L 3300,450 L 3320,450 L 3320,380 L 3380,380
    M 3420,350 L 3420,450 M 3420,400 L 3480,350 L 3480,450
    M 3520,450 L 3550,350 L 3580,450
    M 3620,350 L 3620,450
    M 3660,450 L 3660,350 L 3720,450 L 3720,350
    M 3760,350 L 3760,450 M 3760,400 L 3820,350 L 3820,450
  `;

  useEffect(() => {
    if (!pathRef.current || !scrollContainer.current) return;

    const path = pathRef.current;
    const length = path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollContainer.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    });

    tl.to(path, {
      strokeDashoffset: 0,
      ease: 'none',
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [scrollContainer]);

  return (
    <svg
      ref={svgRef}
      className="pointer-events-none fixed left-0 top-0 z-10 h-screen"
      style={{ width: '400vw' }}
      viewBox="0 0 4000 800"
      preserveAspectRatio="xMinYMid slice"
    >
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="strokeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(357 93% 47%)" stopOpacity="0.3" />
          <stop offset="50%" stopColor="hsl(357 93% 55%)" stopOpacity="1" />
          <stop offset="100%" stopColor="hsl(357 93% 47%)" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      
      <path
        ref={pathRef}
        d={signaturePath}
        className="liquid-light"
        stroke="url(#strokeGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        filter="url(#glow)"
      />
    </svg>
  );
};

SignatureSVG.propTypes = {
  scrollContainer: PropTypes.shape({
    current: PropTypes.instanceOf(Element)
  }).isRequired
};

export default SignatureSVG;