import { useEffect, useRef } from "react";
import { ContextButton } from "./components/Contextbutton";
import { FloatingScreen } from "./components/FloatingScreen";
import Play from "./components/Play";
import gsap from "gsap";
import { Container } from "./components/container";

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ControlsRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const controls = ControlsRef.current;

const handleMouseEnter = () => {
  if (controls) {
    gsap.to(controls, {
      scale: 1,
      opacity: 1,
      duration: 0.2, // faster
      ease: "power2.out", // quick in, smooth out
      transformOrigin: "center",
    });
  }
};

const handleMouseLeave = () => {
  if (controls) {
    gsap.to(controls, {
      scale: 0.2,
      opacity: 0,
      duration: 0.18,
      ease: "power1.in", 
      transformOrigin: "center",
    });
  }
};

const handleButtonZoomEnter = () => {
  if (controls) {
    gsap.to(controls, {
      scale: 1.07,
      duration: 0.1,
      ease: "linear",
    });
  }
};

const handleButtonZoomLeave = () => {
  if (controls) {
    gsap.to(controls, {
      scale: 1,
      duration: 0.15,
      ease: "circ.inOut",
      transformOrigin: "center",
    });
  }
};


    container?.addEventListener("mouseenter", handleMouseEnter);
    container?.addEventListener("mouseleave", handleMouseLeave);
    controls?.addEventListener("mouseenter", handleButtonZoomEnter);
    return () => {
      container?.removeEventListener("mouseenter", handleMouseEnter);
      container?.removeEventListener("mouseleave", handleMouseLeave);
      controls?.addEventListener("mouseleave", handleButtonZoomLeave);
    };
  }, []);
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <Container ref={containerRef}>
        <ContextButton ref={ControlsRef}>
          <Play />
        </ContextButton>
      </Container>
      <FloatingScreen
        className="rounded-4xl"
        width={1000}
        height={100}
        videoSrc="clip3.mp4"
      ></FloatingScreen>
    </div>
  );
}

export default App;
