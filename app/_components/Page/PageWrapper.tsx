import { ReactNode } from "react";
import { Footer } from "../Footer";

type PageWrapperProps = {
    children: ReactNode;
};

export function PageWrapper({ children }: PageWrapperProps) {
    return (
        <div>

            <div className="
                mx-auto
                min-h-screen flex flex-col
            ">
                <main className="flex-1">
                    {children}
                </main>

                <hr />

                <Footer />
            </div>
        </div>
    );
}