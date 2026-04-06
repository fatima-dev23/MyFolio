import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const experiences = [
  {
    id: 1,
    position: 'Senior Frontend Developer',
    employer: 'TechCorp Industries',
    duration: '2022 - Present',
    powerLevel: 95,
    description: 'Leading frontend architecture and implementing cutting-edge UI/UX solutions. Mentoring junior developers and establishing CI/CD best practices.',
  },
  {
    id: 2,
    position: 'Full Stack Engineer',
    employer: 'StartupX',
    duration: '2020 - 2022',
    powerLevel: 88,
    description: 'Built scalable applications from ground up using React and Node.js. Optimized database queries resulting in 40% performance gain.',
  },
  {
    id: 3,
    position: 'UI Developer',
    employer: 'Digital Agency Pro',
    duration: '2018 - 2020',
    powerLevel: 75,
    description: 'Crafted pixel-perfect interfaces for enterprise clients. Collaborated closely with design teams to bridge the gap between Figma and code.',
  },
  {
    id: 4,
    position: 'Junior Developer',
    employer: 'Code Academy',
    duration: '2017 - 2018',
    powerLevel: 60,
    description: 'Started the journey into professional web development. Specialized in responsive CSS and vanilla JavaScript fundamentals.',
  },
];

const ExperienceCard = ({ experience, index }) => {
  return (
    <motion.div
      className="group relative flex w-full gap-8 pb-12 last:pb-0"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Timeline Line and Dot */}
      <div className="relative flex flex-col items-center">
        <div className="z-10 flex h-4 w-4 items-center justify-center rounded-full border-2 border-primary bg-background shadow-[0_0_10px_rgba(var(--primary),0.5)]">
          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
        </div>
        <div className="absolute top-4 h-full w-px bg-linear-to-b from-primary/50 via-primary/20 to-transparent" />
      </div>

      {/* Content Card */}
      <div className="glass-card neon-border relative flex-1 overflow-hidden p-6 transition-all duration-300 hover:bg-white/5">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
          <div>
            <h3 className="font-display text-2xl font-bold text-foreground">
              {experience.position}
            </h3>
            <p className="mt-1 font-mono text-lg font-medium text-primary">
              {experience.employer}
            </p>
          </div>
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1 font-mono text-xs font-bold tracking-widest text-primary ring-1 ring-inset ring-primary/20">
            {experience.duration}
          </span>
        </div>

        <p className="mt-4 max-w-3xl font-mono text-sm leading-relaxed text-muted-foreground/80">
          {experience.description}
        </p>

        {/* Power Level Bar - Resized for Resume look */}
        <div className="mt-6 max-w-xs">
          <div className="flex items-center justify-between mb-1">
            <span className="font-mono text-[10px] uppercase tracking-tighter text-muted-foreground">
              Proficiency Index
            </span>
            <span className="font-display text-xs font-bold text-primary">
              {experience.powerLevel}%
            </span>
          </div>
          <div className="power-bar h-1">
            <motion.div
              className="power-bar-fill h-full"
              initial={{ width: 0 }}
              whileInView={{ width: `${experience.powerLevel}%` }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

ExperienceCard.propTypes = {
  experience: PropTypes.shape({
    duration: PropTypes.string,
    position: PropTypes.string,
    employer: PropTypes.string,
    description: PropTypes.string,
    powerLevel: PropTypes.number
  }).isRequired,
  index: PropTypes.number.isRequired
};

const ExperienceSection = () => {
  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden px-6 py-24">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 w-full max-w-4xl">
        <motion.div
          className="mb-20 text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="font-mono text-sm uppercase tracking-[0.4em] text-primary">
            History.log
          </span>
          <h2 className="mt-2 font-display text-5xl font-bold text-foreground md:text-7xl">
            EXPERIENCE
          </h2>
        </motion.div>

        {/* Timeline Container */}
        <div className="flex flex-col">
          {experiences.map((exp, index) => (
            <ExperienceCard key={exp.id} experience={exp} index={index} />
          ))}
        </div>

        {/* Stats Row */}
        <motion.div
          className="mt-20 flex flex-wrap justify-between gap-8 border-t border-white/10 pt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[
            { label: 'Years Active', value: '7+' },
            { label: 'Deployments', value: '150+' },
            { label: 'Architecture', value: '12' },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col">
              <span className="font-display text-4xl font-bold text-primary">{stat.value}</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;