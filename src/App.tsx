import { ContextButton } from "./components/Contextbutton";
import { FloatingScreen } from "./components/FloatingScreen";
import Play from "./components/Play";

function App() {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <ContextButton>
        <Play />
      </ContextButton>
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
