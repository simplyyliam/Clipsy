import { useEffect, useRef, useState } from "react";
import { ContextButton } from "./components/Contextbutton";
import { FloatingScreen } from "./components/FloatingScreen";
import Play from "./components/Play";
import gsap from "gsap";
import { Container } from "./components/container";
import { VideoContainer } from "./components/VideoTray";
import { clips } from "./libs/videos";
import { ChevronDown, Video } from "lucide-react";

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ControlsRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const chevronRef = useRef(null);
  const videoTrayRef = useRef<HTMLButtonElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);

  const [activeVideo, setActiveVideo] = useState("");
  const [trayOpen, setTrayOpen] = useState(false);

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

const handleVideoTray = () => setTrayOpen(prev => !prev);
  
useEffect(() => {
  const tray    = videoContainerRef.current;
  const screen  = screenRef.current;
  const chevron = chevronRef.current;
  const trayButton = videoTrayRef.current

  if (!tray || !screen) return;      // first render: just bail, no cleanup

  const tl = gsap.timeline();

  tl.to(tray,   { y: trayOpen ? 2000   : 0, duration: 0.5, ease: "power3.out" }, 0);
  tl.to(screen, { y: trayOpen ? 100 :   0, duration: 0.5, ease: "power3.out" }, 0);
  tl.to(trayButton, {y: trayOpen ? 100 : 0, duration: 0.5, ease: "power3.out" }, 0)

  if (chevron) {
    tl.to(chevron, { rotate: trayOpen ? 180 : 0, duration: 0.4, ease: "power2.out" }, 0);
  }

  return () => {tl.kill();}     
}, [trayOpen]);


  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <div ref={screenRef}>
        <FloatingScreen
          ref={videoRef}
          videoSrc={activeVideo}
          width={1000}
          height={638}
        >
          <Container ref={containerRef}>
            <ContextButton onClick={handlePause} ref={ControlsRef}>
              <Play />
            </ContextButton>
          </Container>
        </FloatingScreen>
      </div>
      <button
        onClick={handleVideoTray}
        ref={videoTrayRef}
        className="Glass flex items-center justify-between p-2 gap-4 border-1 border-white/35 backdrop-blur-[3px] absolute bottom-45 drop-shadow-xl cursor-pointer z-100 rounded-full text-white"
      >
        <span ref={chevronRef}>
          <ChevronDown />
        </span>
        <Video />
      </button>
      <div ref={videoContainerRef}>
        <VideoContainer>
          <div className="flex items-center justify-center w-full h-[8em] px-10 gap-3">
            {clips.map((clip) => (
              <button
                onClick={() => changeActiveVideo(clip.url)}
                key={clip.id}
                className="w-[15em] h-full drop-shadow-xl cursor-pointer hover:scale-105 transition-all ease-linear duration-300 "
              >
                <img className="rounded-2xl" src={clip.img} alt="Videos" />
              </button>
            ))}
          </div>
        </VideoContainer>
      </div>
    </div>
  );
}

export default App;
