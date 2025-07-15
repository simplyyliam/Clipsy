import type { HtmlHTMLAttributes } from "react";
import type React from "react";

export const VideoContainer: React.FC<HtmlHTMLAttributes<HTMLDivElement>> = ({
    children,
    className,
    ...props
}) => {
    return (
        <div className={`flex flex-col items-center justify-between py-4 w-[70vw] min-h-[9.5em] max-h-[20em] z-10 ${className}`}{...props}>{children}</div>
    )
}