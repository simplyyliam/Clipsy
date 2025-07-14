import { forwardRef, type HtmlHTMLAttributes } from "react";

export const Container = forwardRef<HTMLDivElement, HtmlHTMLAttributes<HTMLDivElement>>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`flex items-center justify-center absolute w-[1000px] h-[33em] ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";