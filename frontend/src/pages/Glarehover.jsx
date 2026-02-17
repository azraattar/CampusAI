import { useRef, useState } from "react";

export default function GlareHover({
  children,
  glareColor = "#ffffff",
  glareOpacity = 0.3,
  glareAngle = -30,
  glareSize = 300,
  transitionDuration = 800,
  playOnce = false,
  className = "",
  style = {},
}) {
  const containerRef = useRef(null);
  const [glareStyle, setGlareStyle] = useState({ opacity: 0 });
  const [hasPlayed, setHasPlayed] = useState(false);

  const handleMouseMove = (e) => {
    if (playOnce && hasPlayed) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setGlareStyle({
      opacity: glareOpacity,
      background: `radial-gradient(circle ${glareSize}px at ${x}px ${y}px, ${glareColor}, transparent)`,
      transform: `rotate(${glareAngle}deg)`,
    });
  };

  const handleMouseLeave = () => {
    setGlareStyle({ opacity: 0 });
    if (playOnce) setHasPlayed(true);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
      className={className}
    >
      {children}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          transition: `opacity ${transitionDuration}ms ease`,
          ...glareStyle,
        }}
      />
    </div>
  );
}