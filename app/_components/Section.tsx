import { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  bgColor?: string;
  blendMode?: React.CSSProperties['backgroundBlendMode'];
}

export function Section({
  children,
  bgColor,
  blendMode = "overlay",
}: SectionProps) {
  return (
    <section
      className={`
        w-screen
        h-[90vh]
        flex
        justify-center     /* centraliza horizontal */
        items-center       /* centraliza vertical */
        border-b border-[#706A60]
        overflow-hidden
        bg-cover bg-center bg-no-repeat
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
      {/* CONTAINER CENTRALIZADO */}
      <div className="w-full max-w-[1200px]">
        {children}
      </div>
    </section>
  );
}
