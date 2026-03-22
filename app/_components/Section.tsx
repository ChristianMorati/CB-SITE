import { ReactNode } from "react";
import { ScrollDownIndicator } from "./AnimatedElements/ScrollDownIndicator";

type SectionProps = {
  children: ReactNode;
  bgColor?: string;
  blendMode?: React.CSSProperties['backgroundBlendMode'];
  limitedArea?: boolean;
  scrollIndicator?: boolean;
}

export function Section({
  children,
  bgColor,
  blendMode = "overlay",
  limitedArea = false,
  scrollIndicator = true
}: SectionProps) {
  return (
    <section
      className={`
        relative
        h-[90vh]
        flex justify-center
        border-b border-zinc-700
        bg-black/30
        bg-cover bg-center bg-no-repeat
        overflow-hidden
        ${bgColor ?? ""}
      `}
      style={{
        backgroundImage: `
          url('/pneu-texture.png'),
          linear-gradient(
            180deg,
            rgba(0,0,0,1) 0%,
            #4D4942 50%,
            rgba(0,0,0,1) 100%
          )
        `,
        backgroundBlendMode: blendMode,
      }}
    >
      <div className={`
        ${limitedArea ? "max-w-[1200px] max-auto" : ""}
        z-2`}
      >
        {children}
        {scrollIndicator && (
          <div className="opacity-50">
            <ScrollDownIndicator />
          </div>
        )}
      </div>
    </section>
  );
}