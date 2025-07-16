import { forwardRef } from "react";

interface FloatingScreenProps {
  videoSrc: string;
  width?: number;
  height?: number;
  className?: string;
  children?: React.ReactNode;
  outerRef?: React.Ref<HTMLDivElement>;
}

export const FloatingScreen = forwardRef<HTMLVideoElement, FloatingScreenProps>(
  ({ videoSrc, width, height, className, children, ...rest }, ref) => {
    return (
      <div

        className={`relative overflow-hidden rounded-4xl shadow-2xl bg-black/50 ${className}`}
        style={{ width, height }}
        {...rest}
      >
        <video
          ref={ref}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={videoSrc} type="video/mp4" />
        </video>

        <div className="absolute inset-0 flex pointer-events-none">
          <div className="pointer-events-auto">
            {children}
          </div>
        </div>
      </div>
    );
  }
);

FloatingScreen.displayName = "FloatingScreen";
