import { useEffect, useRef, useState } from "react";
import { ContextButton } from "./components/Contextbutton";
import { FloatingScreen } from "./components/FloatingScreen";
import Play from "./components/Play";
import gsap from "gsap";
import { Container } from "./components/container";
import { VideoContainer } from "./components/VideoTray";
import { clips } from "./libs/videos";
import { ChevronDown } from "lucide-react";
import VideoIcon from "./components/videoIcon";

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

  const handleVideoTray = () => setTrayOpen((prev) => !prev);

  useEffect(() => {
    const tray = videoContainerRef.current;
    const screen = screenRef.current;
    const chevron = chevronRef.current;
    const trayButton = videoTrayRef.current;
    const clip = videoRef.current

    if (!tray || !screen) return; 

    const tl = gsap.timeline();

    tl.to(
      tray,
      { y: trayOpen ? 2000 : 0, duration: 0.5, ease: "power3.out" },
      0
    );
    tl.to(
      screen,
      { y: trayOpen ? 100 : 0, duration: 0.5, width: trayOpen ? "100vw" : 1000, height: trayOpen ? "100vh" : 600,  ease: "power3.out" },
      0
    );
    tl.to(
      clip,
      { width: trayOpen ? "100vw" : 1000, height: trayOpen ? "100vh" : 600, duration: 0.5, ease: "power3.out" },
      0
    );

    tl.to(
      trayButton,
      { y: trayOpen ? 100 : 0, duration: 0.5, ease: "power3.out" },
      0
    );

    if (chevron) {
      tl.to(
        chevron,
        { rotate: trayOpen ? 180 : 0, duration: 0.4, ease: "power2.out" },
        0
      );
    }

    return () => {
      tl.kill();
    };
  }, [trayOpen]);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden">
      <div ref={screenRef} className="flex items-center justify-center w-[90vw] h-[90vh]">
        <FloatingScreen
          ref={videoRef}
          videoSrc={activeVideo}
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
        className="absolute bottom-48 z-10 text-white cursor-pointer box-border flex flex-col justify-center items-center p-[5px] gap-[10px] w-[104px] h-[60px] bg-white/15 border border-white/40 backdrop-blur-[3.6px] rounded-full"
      >
        <div className="flex p-2.5 items-center justify-center gap-2.5">
          <span ref={chevronRef}>
            <ChevronDown />
          </span>
          <VideoIcon />
        </div>
      </button>
      <div ref={videoContainerRef}>
        <VideoContainer>
          <div className="flex justify-center w-full px-10 gap-3">
            {clips.map((clip) => (
              <button
                onClick={() => changeActiveVideo(clip.url)}
                key={clip.id}
                className="w-[15em] h-[9em] drop-shadow-xl cursor-pointer hover:scale-105 transition-all ease-linear duration-300 "
              >
                <img
                  className="rounded-2xl w-full h-full"
                  src={clip.img}
                  alt="Videos"
                />
              </button>
            ))}
          </div>
        </VideoContainer>
      </div>
    </div>
  );
}

export default App;
