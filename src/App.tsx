import { useEffect, useRef } from "react";
import { ContextButton } from "./components/Contextbutton";
import { FloatingScreen } from "./components/FloatingScreen";
import Play from "./components/Play";
import gsap from "gsap";
import { Container } from "./components/container";

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ControlsRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

useEffect(() => {
  const ctx = gsap.context(() => {
    const container  = containerRef.current;
    const controls   = ControlsRef.current;

    /* ---------- hover in / out ---------- */
    const showControls = () =>
      gsap.to(controls, {
        scale: 1,
        opacity: 1,
        duration: 0.2,
        ease: "power2.out",
        transformOrigin: "center",
        pointerEvents: "auto",
      });

    const hideControls = () =>
      gsap.to(controls, {
        scale: 0.2,
        opacity: 0,
        duration: 0.18,
        ease: "power1.in",
        pointerEvents: "none",
      });

    const dimBg    = () => gsap.to(container, { backgroundColor: "#01010150", duration: 0.4, ease: "linear" });
    const clearBg  = () => gsap.to(container, { backgroundColor: "", duration: 0.1, ease: "linear" });

    /* ---------- hover zoom on the button ---------- */
    const zoomIn  = () => gsap.to(controls, { scale: 1.07, duration: 0.1,  ease: "power1.out" });
    const zoomOut = () => gsap.to(controls, { scale: 1, duration: 0.15, ease: "circ.inOut" });

    /* ---------- listeners ---------- */
    container?.addEventListener("mouseenter", showControls);
    container?.addEventListener("mouseleave", hideControls);
    container?.addEventListener("mouseenter", dimBg);
    container?.addEventListener("mouseleave", clearBg);

    controls?.addEventListener("mouseenter", zoomIn);
    controls?.addEventListener("mouseleave", zoomOut);

    /* ---------- cleanup automatically via GSAP ctx ---------- */
    return () => ctx.revert();
  }, [containerRef, ControlsRef]);
}, []);

  const handlePause = () => {
    if(videoRef.current?.paused) {
      videoRef.current.play()
    } else {
      videoRef.current?.pause()
    }
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <Container ref={containerRef}>
        <ContextButton onClick={handlePause} ref={ControlsRef}>
          <Play />
        </ContextButton>
      </Container>
      <FloatingScreen
        ref={videoRef}
        width={1000}
        height={100}
        videoSrc="clip3.mp4"
      ></FloatingScreen>
    </div>
  );
}

export default App;
