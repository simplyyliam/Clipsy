import { useEffect, useRef } from "react";
import { ContextButton } from "./components/Contextbutton";
import { FloatingScreen } from "./components/FloatingScreen";
import Play from "./components/Play";
import gsap from "gsap";

function App() {
  const containerRef = useRef<HTMLVideoElement>(null);
  const ControlsRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const controls = ControlsRef.current;

    const handleMouseEnter = () => {
      if (controls) {
        gsap.to(controls, {
          scale: 1,
          opacity: 1,
          duration: 0.25,
          ease: "expo.in"
        });
      }
    };

    const handleMouseLeave = () => {
      if (controls) {
        gsap.to(controls, {
          scale: 0,
          opacity: 0,
          duration: 0.2,
          ease: "expo.out"
        });
      }
    };

    container?.addEventListener("mouseenter", handleMouseEnter)
    container?.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      container?.removeEventListener("mouseenter", handleMouseEnter)
      container?.removeEventListener("mouseleave", handleMouseLeave)
    }

  }, []);
  return (
    <div
      className="flex items-center justify-center w-screen h-screen"
    >
      <ContextButton ref={ControlsRef}>
        <Play />
      </ContextButton>
      <FloatingScreen
        ref={containerRef}
        className="rounded-4xl"
        width={1000}
        height={100}
        videoSrc="clip3.mp4"
      ></FloatingScreen>
    </div>
  );
}

export default App;
