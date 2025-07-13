import type { HTMLAttributes } from "react";
import type React from "react";

interface VideoProps extends HTMLAttributes<HTMLVideoElement> {
  videoSrc: string;
  width: number;
  height: number;
}

export const FloatingScreen: React.FC<VideoProps> = ({
  videoSrc,
  width,
  height,
  className,
  ...props
}) => {
  return (
    <video
      width={width}
      height={height}
      autoPlay
      loop
      className={`drop-shadow-2xl ${className}`}
      {...props}
    >
      <source src={videoSrc} type="video/mp4" />
    </video>
  );
};
