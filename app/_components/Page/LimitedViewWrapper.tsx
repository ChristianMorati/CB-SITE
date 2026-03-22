import { ReactNode } from "react";

type LimitedViewWrapperProps = {
    children: ReactNode;
};

export function LimitedViewWrapper({ children }: LimitedViewWrapperProps) {
    return (
        <div>

            <div className="
                max-w-[1200px] mx-auto
            ">
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </div>
    );
}