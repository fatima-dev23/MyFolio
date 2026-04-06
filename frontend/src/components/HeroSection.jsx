import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="panel relative flex flex-col items-center justify-center overflow-hidden px-8">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-primary/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Grid lines */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(hsl(357 93% 47% / 0.3) 1px, transparent 1px),
              linear-gradient(90deg, hsl(357 93% 47% / 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }}
        />
      </div>

      <div className="relative z-10 text-center">
        {/* Sub-headline with parallax */}
        <motion.p
          className="mb-6 font-mono text-sm uppercase tracking-[0.5em] text-muted-foreground"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Creative Developer & Digital Artist
        </motion.p>

        {/* Main glitch title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h1 
            className="glitch font-display text-[8rem] font-black leading-none tracking-wider text-foreground md:text-[12rem]"
            data-text="FATIMA"
          >
            <span className="gradient-text-red">FATIMA</span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="mt-8 max-w-xl font-mono text-lg text-muted-foreground"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Crafting immersive digital experiences with code, creativity, and a touch of chaos.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="mt-12 flex flex-wrap items-center justify-center gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.button
            className="btn-nuclear"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Projects
          </motion.button>
          <motion.button
            className="group relative overflow-hidden border border-muted-foreground/30 px-8 py-4 font-display text-sm uppercase tracking-widest text-muted-foreground transition-all hover:border-primary hover:text-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get in Touch
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.div
            className="flex flex-col items-center gap-2 text-muted-foreground"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {/* <span className="font-mono text-xs uppercase tracking-widest">Scroll</span> */}
            {/* <div className="h-12 w-[1px] bg-gradient-to-b from-primary to-transparent" /> */}
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute right-20 top-20 h-32 w-32 rounded-full border border-primary/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-primary shadow-neon-sm" />
      </motion.div>

      <motion.div
        className="absolute bottom-32 left-20 h-48 w-48 rounded-full border border-primary/10"
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute left-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-primary/50 shadow-neon-sm" />
      </motion.div>
    </section>
  );
};

export default HeroSection;