import { useEffect, useRef, useState } from "react";
import { ContextButton } from "./components/Contextbutton";
import { FloatingScreen } from "./components/FloatingScreen";
import Play from "./components/Play";
import gsap from "gsap";
import { Container } from "./components/container";
import { VideoContainer } from "./components/VideoTray";
import { clips } from "./libs/videos";

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ControlsRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [activeVideo, setActiveVideo] = useState("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const controls = ControlsRef.current;

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

      const dimBg = () =>
        gsap.to(container, {
          backgroundColor: "#01010150",
          duration: 0.4,
          ease: "linear",
        });
      const clearBg = () =>
        gsap.to(container, {
          backgroundColor: "",
          duration: 0.1,
          ease: "linear",
        });

      /* ---------- hover zoom on the button ---------- */
      const zoomIn = () =>
        gsap.to(controls, { scale: 1.07, duration: 0.1, ease: "power1.out" });
      const zoomOut = () =>
        gsap.to(controls, { scale: 1, duration: 0.15, ease: "circ.inOut" });

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
    if (videoRef.current?.paused) {
      videoRef.current.play();
    } else {
      videoRef.current?.pause();
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [activeVideo]);

  const changeActiveVideo = (url: string) => {
    setActiveVideo(url);
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <FloatingScreen
        ref={videoRef}
        width={1000}
        height={638}
        videoSrc={activeVideo}
      >
        <Container ref={containerRef}>
          <ContextButton onClick={handlePause} ref={ControlsRef}>
            <Play />
          </ContextButton>
        </Container>
      </FloatingScreen>
      <VideoContainer>
        <div className="flex items-center justify-between w-full h-[8em] px-10 gap-3">
          {clips.map((clip) => (
            <button
              onClick={() => changeActiveVideo(clip.url)}
              key={clip.id}
              className="bg-stone-500 w-full h-full rounded-2xl cursor-pointer"
            >
              <img className="rounded-2xl" src={clip.img} alt="Videos" />
            </button>
          ))}
        </div>
      </VideoContainer>
    </div>
  );
}

export default App;
