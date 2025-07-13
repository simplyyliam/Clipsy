import type { HtmlHTMLAttributes } from "react";

export const ContextButton: React.FC<HtmlHTMLAttributes<HTMLButtonElement>> = ({
  className,
  ...props
}) => {
  return (
    <button
      className={`flex items-center justify-center rounded-full p-4
                bg-white/1 hover:bg-white/5 active:bg-white/20
                border border-white/20
                backdrop-blur-[3px] backdrop-brightness-130 backdrop-saturate-150
                transition duration-300
                absolute z-10 ${className}`}
      {...props}
    ></button>
  );
};
