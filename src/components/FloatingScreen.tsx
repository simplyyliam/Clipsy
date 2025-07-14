import React, { forwardRef } from "react";
import type { HTMLAttributes } from "react";

interface VideoProps extends HTMLAttributes<HTMLVideoElement> {
  videoSrc: string;
  width: number;
  height: number;
}

export const FloatingScreen = forwardRef<HTMLVideoElement, VideoProps>(
  ({ videoSrc, width, height, className = "", ...props }, ref) => (
    <video
      ref={ref}
      width={width}
      height={height}
      autoPlay
      loop
      className={`${className}`}
      {...props}
    >
      <source src={videoSrc} type="video/mp4" />
    </video>
  )
);

FloatingScreen.displayName = "FloatingScreen";
