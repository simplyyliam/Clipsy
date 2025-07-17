import { forwardRef, type HtmlHTMLAttributes } from "react";

export const Container = forwardRef<HTMLDivElement, HtmlHTMLAttributes<HTMLDivElement>>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`flex items-center justify-center absolute w-full h-full rounded-3xl z-1 ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";