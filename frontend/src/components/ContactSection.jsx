import { motion } from 'framer-motion';
import { useState } from 'react';

const ContactSection = () => {
  const [email, setEmail] = useState('');

  return (
    <section className="panel relative flex flex-col items-center justify-center overflow-hidden px-8">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: 'radial-gradient(circle at 70% 50%, hsl(357 93% 47% / 0.3), transparent 50%)',
          }}
        />
        {/* Animated circles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-primary/10"
            style={{
              width: 200 + i * 150,
              height: 200 + i * 150,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="mb-12"
        >
          <svg viewBox="0 0 600 150" className="mx-auto h-32 w-auto">
            <defs>
              <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(357 93% 47%)" />
                <stop offset="50%" stopColor="hsl(357 93% 60%)" />
                <stop offset="100%" stopColor="hsl(357 93% 47%)" />
              </linearGradient>
              <filter id="textGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feFlood floodColor="hsl(357 93% 47%)" floodOpacity="0.8" />
                <feComposite in2="blur" operator="in" />
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <motion.text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="font-display"
              fill="url(#textGradient)"
              filter="url(#textGlow)"
              style={{
                fontSize: '100px',
                fontWeight: 900,
                fontFamily: 'Orbitron, sans-serif',
              }}
              initial={{ opacity: 0, pathLength: 0 }}
              whileInView={{ opacity: 1, pathLength: 1 }}
              transition={{ duration: 2, ease: 'easeOut' }}
            >
              FATIMA
            </motion.text>
          </svg>
        </motion.div>

        <motion.p
          className="mb-12 max-w-2xl font-mono text-xl text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Ready to create something extraordinary together?
          <br />
          <span className="text-primary">Let&apos;s make it happen.</span>
        </motion.p>

        <motion.div
          className="mb-12 flex items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-80 rounded-lg border border-muted bg-background/50 px-6 py-4 font-mono text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <motion.button
            className="btn-nuclear"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Send Message
          </motion.button>
        </motion.div>

        <motion.div
          className="flex items-center justify-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          {['GitHub', 'LinkedIn', 'Twitter', 'Dribbble'].map((social) => (
            <motion.a
              key={social}
              href="#"
              className="group relative font-mono text-sm uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
              whileHover={{ y: -2 }}
            >
              {social}
              <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-primary transition-all group-hover:w-full" />
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <p className="font-mono text-xs text-muted-foreground/50">
            © 2024 FATIMA. All rights reserved. Built with passion and lots of ☕
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;