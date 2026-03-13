import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useMotionValue, useSpring } from "motion/react";

interface CustomCursorProps {
  isHovering: boolean;
}

export function CustomCursor({ isHovering }: CustomCursorProps) {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [visible, setVisible] = useState(false);

  const springConfig = { damping: 22, stiffness: 300, mass: 0.5 };
  const dotSpringConfig = { damping: 40, stiffness: 600, mass: 0.3 };

  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  const dotX = useSpring(cursorX, dotSpringConfig);
  const dotY = useSpring(cursorY, dotSpringConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setVisible(true);
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY]);

  return createPortal(
    <>
      {/* Large ring cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovering ? 96 : 40,
          height: isHovering ? 96 : 40,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <motion.div
          className="rounded-full border-2 size-full flex items-center justify-center"
          animate={{
            borderColor: isHovering ? "rgba(255,255,255,0.8)" : "rgba(86,86,86,0.5)",
            backgroundColor: isHovering ? "rgba(255,255,255,0.15)" : "rgba(86,86,86,0)",
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.span
            className="uppercase tracking-widest select-none"
            style={{ fontSize: "10px", fontWeight: 500 }}
            animate={{
              opacity: isHovering ? 1 : 0,
              scale: isHovering ? 1 : 0.5,
              color: isHovering ? "#ffffff" : "#565656",
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            Ver
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Small dot cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovering ? 6 : 6,
          height: isHovering ? 6 : 6,
          opacity: visible ? (isHovering ? 0.5 : 1) : 0,
          backgroundColor: isHovering ? "#ffffff" : "#565656",
          backgroundImage: isHovering ? "background-image: src ('/cursor-dot-hover.svg')" : "none",
        }}
        transition={{ duration: 0.2 }}
      />
    </>,
    document.body
  );
}