import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'Neural Interface',
    description: 'AI-powered dashboard for real-time data visualization and neural network monitoring.',
    tech: ['React', 'TensorFlow.js', 'WebGL'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
    link: '#',
  },
  {
    id: 2,
    title: 'CyberStore',
    description: 'Next-gen e-commerce platform with immersive 3D product experiences.',
    tech: ['Next.js', 'Three.js', 'Stripe'],
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600',
    link: '#',
  },
  {
    id: 3,
    title: 'QuantumChat',
    description: 'End-to-end encrypted messaging app with quantum-resistant cryptography.',
    tech: ['React Native', 'Node.js', 'WebSocket'],
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600',
    link: '#',
  },
  {
    id: 4,
    title: 'HoloBoard',
    description: 'Collaborative workspace with AR integration for remote teams.',
    tech: ['Vue.js', 'WebXR', 'Firebase'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600',
    link: '#',
  },
];

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      className="project-card group relative h-125 w-100 shrink-0 cursor-pointer overflow-hidden rounded-xl"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="absolute inset-0">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent" />
      </div>

      <div className="crt-scanlines" />

      <motion.div
        className="absolute inset-0 rounded-xl border-2 border-transparent transition-colors duration-300 group-hover:border-primary"
        whileHover={{
          boxShadow: '0 0 30px hsl(357 93% 47% / 0.5), inset 0 0 30px hsl(357 93% 47% / 0.1)',
        }}
      />

      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <div className="mb-4 flex flex-wrap gap-2">
          {project.tech.map((tech, i) => (
            <span
              key={i}
              className="rounded border border-primary/30 bg-background/80 px-2 py-1 font-mono text-xs text-primary backdrop-blur-sm"
            >
              {tech}
            </span>
          ))}
        </div>
        <h3 className="font-display text-2xl font-bold text-foreground transition-colors group-hover:text-primary">
          {project.title}
        </h3>
        <p className="mt-2 font-mono text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
        <motion.div
          className="mt-4 flex items-center gap-2 font-mono text-sm text-primary opacity-0 transition-opacity group-hover:opacity-100"
          initial={{ x: -10 }}
          whileHover={{ x: 0 }}
        >
          <span className="uppercase tracking-wider">View Project</span>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </motion.div>
      </div>
      {/* Decorative corners */}
      <div className="absolute left-4 top-4 h-8 w-8">
        <div className="absolute left-0 top-0 h-full w-0.5 bg-primary/50" />
        <div className="absolute left-0 top-0 h-0.5 w-full bg-primary/50" />
      </div>
      <div className="absolute right-4 top-4 h-8 w-8">
        <div className="absolute right-0 top-0 h-full w-0.5 bg-primary/50" />
        <div className="absolute right-0 top-0 h-0.5 w-full bg-primary/50" />
      </div>
    </motion.div>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    tech: PropTypes.arrayOf(PropTypes.string),
    link: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

const ProjectsSection = () => {
  const triggerRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current;
      // Calculate exactly how much is hidden horizontally
      const amountToScroll = cards.offsetWidth - window.innerWidth;

      gsap.to(cards, {
        x: -amountToScroll,
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: () => `+=${cards.offsetWidth}`,
          pin: true,
          pinSpacing: true, // This is crucial for keeping the contact section away
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={triggerRef} 
      className="relative z-10 block min-h-screen overflow-hidden bg-background"
    >
      <div className="relative flex h-screen flex-col justify-center overflow-hidden py-20">
        {/* STATIC HEADING */}
        <motion.div
          className="mb-12 px-8 text-center shrink-0"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-mono text-sm uppercase tracking-[0.3em] text-primary">
            Selected Works
          </span>
          <h2 className="mt-4 font-display text-5xl font-bold text-foreground md:text-6xl">
            PROJECTS
          </h2>
          <div className="mx-auto mt-4 h-px w-32 bg-linear-to-r from-transparent via-primary to-transparent" />
        </motion.div>

        {/* HORIZONTAL CARDS CONTAINER */}
        <div 
          ref={cardsRef} 
          className="flex gap-12 px-[10vw] w-max relative z-10"
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
          
          {/* ESSENTIAL END SPACER */}
          {/* This ensures the last card is fully on screen before unpinning */}
          <div className="w-[0vw] shrink-0" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;