import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 400 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const trailX1 = useSpring(mouseX, { damping: 30, stiffness: 200 });
  const trailY1 = useSpring(mouseY, { damping: 30, stiffness: 200 });
  const trailX2 = useSpring(mouseX, { damping: 35, stiffness: 150 });
  const trailY2 = useSpring(mouseY, { damping: 35, stiffness: 150 });
  const trailX3 = useSpring(mouseX, { damping: 40, stiffness: 100 });
  const trailY3 = useSpring(mouseY, { damping: 40, stiffness: 100 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isClickable = target.closest('a, button, [role="button"], .cursor-pointer, .glass-card, .project-card');
      setIsHovering(!!isClickable);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-9997 rounded-full bg-primary/20"
        style={{
          x: trailX3,
          y: trailY3,
          width: 12,
          height: 12,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-9998 rounded-full bg-primary/40"
        style={{
          x: trailX2,
          y: trailY2,
          width: 10,
          height: 10,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-9999 rounded-full bg-primary/60"
        style={{
          x: trailX1,
          y: trailY1,
          width: 8,
          height: 8,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      <motion.div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-10000 flex items-center justify-center"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="rounded-full border-2 border-primary"
          animate={{
            width: isHovering ? 60 : 20,
            height: isHovering ? 60 : 20,
            backgroundColor: isHovering ? 'hsl(357 93% 47% / 0.1)' : 'transparent',
            borderWidth: isHovering ? 1 : 2,
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          style={{
            boxShadow: isHovering 
              ? '0 0 20px hsl(357 93% 47% / 0.6), 0 0 40px hsl(357 93% 47% / 0.3)'
              : '0 0 10px hsl(357 93% 47% / 0.4)',
          }}
        />
        <motion.div
          className="absolute rounded-full bg-primary"
          animate={{
            width: isHovering ? 8 : 4,
            height: isHovering ? 8 : 4,
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        />
      </motion.div>
    </>
  );
};

export default CustomCursor;