import { forwardRef } from "react";
import type { HTMLAttributes } from "react";

export const ContextButton = forwardRef<
  HTMLButtonElement,
  HTMLAttributes<HTMLButtonElement>
>(({ className = "", ...props }, ref) => (
  <button
    ref={ref}
    className={`Glass flex items-center justify-center rounded-full p-4
                hover:bg-white/5
              bg-white/15 border border-white/40
                backdrop-blur-[2px] backdrop-brightness-150 backdrop-saturate-150
                transition duration-300
                cursor-pointer
                opacity-0 scale-0 ${className}`}
    {...props}
  />
));

ContextButton.displayName = "ContextButton";
