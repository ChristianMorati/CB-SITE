import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { MdDirectionsBike } from "react-icons/md";
import { colors } from "@/app/colors";

export function FullscreenMenu() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        // Cleanup (important)
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    return (
        <>
            {/* Botão para abrir */}
            <button
                onClick={() => setIsOpen(true)}
                className={`
                border rounded-2xl border-[${colors.primary}]
                px-4 py-2 bg-black text-[${colors.primary}] rounded-lg
            `}>
                <MdDirectionsBike />
            </button>

            {/* Overlay */}
            <div
                className={`z-100 fixed inset-0 transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex w-full h-full">

                    {/* Área da lista - 80% */}
                    <div className="w-4/5 bg-white p-8 flex flex-col gap-6 text-2xl font-semibold">
                        <a href="#" className="hover:text-blue-600">Home</a>
                        <a href="#" className="hover:text-blue-600">Sobre</a>
                        <a href="#" className="hover:text-blue-600">Serviços</a>
                        <a href="#" className="hover:text-blue-600">Contato</a>
                    </div>

                    {/* Área do botão fechar - 20% */}
                    <div
                        className="w-1/5 bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition"
                        onClick={() => setIsOpen(false)}
                    >
                        <ChevronLeft size={40} />
                    </div>
                </div>
            </div>
        </>
    );
}