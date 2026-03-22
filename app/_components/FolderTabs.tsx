import { useState, useRef, useEffect } from "react";

const productTypes = [
    {
        title: "BICICLETAS",
        src: "bike",
        path: "bikes"
    },
    {
        title: "ELÉTRICAS",
        src: "eletric-effect",
        path: "eletric-bikes"
    },
    {
        title: "MOTOS",
        src: "eletric-effect",
        path: "motor-bikes"
    },
]

import Link from "next/link";
import { EletricProduct } from "./Product/EletricProduct";

export function ProductButtons() {
    return (
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center justify-center">
            {productTypes.map((label, index) => (
                <Link
                    href={`/products/${label.path}`}
                    key={index}
                    className="w-full md:w-auto"
                >
                    <button
                        className="
              shake-hover
              relative
              inline-flex
              h-12
              w-[300px]
              rounded-xl
              md:w-48
              md:aspect-square
              md:h-auto
              items-center
              justify-center
              overflow-hidden
              bg-neutral-950
              font-medium
              text-white
              border border-white
              hover:border-indigo-500
              transition-all
              duration-300
            "
                    >
                        <img
                            src={`/gifs/${label.src}.gif`}
                            alt={label.title}
                            className="absolute inset-0 w-full h-full object-cover opacity-50"
                        />

                        <span className="relative text-sm md:text-base tracking-wide">
                            {label.title}
                        </span>
                    </button>
                </Link>
            ))}
        </div>
    );
}

export function FolderTabs() {
    const [active, setActive] = useState(0);
    const [indicatorStyle, setIndicatorStyle] = useState({
        width: 0,
        left: 0,
    });

    const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

    const tabs = [
        { label: "Design", content: <EletricProduct /> },
        { label: "Performance", content: "Conteúdo da aba Performance" },
        { label: "Tecnologia", content: "Conteúdo da aba Tecnologia" },
    ];

    useEffect(() => {
        const current = tabsRef.current[active];
        if (current) {
            setIndicatorStyle({
                width: current.offsetWidth,
                left: current.offsetLeft,
            });
        }
    }, [active]);

    return (
        <div className="w-full max-w-4xl mx-auto mt-10">

            {/* HEADER */}
            <div className="relative flex border-b border-neutral-700">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        ref={(el) => (tabsRef.current[index] = el)}
                        onClick={() => setActive(index)}
                        className={`
                            relative
                            px-6
                            py-3
                            text-sm
                            md:text-base
                            font-medium
                            transition-colors
                            duration-300
                            uppercase
                            ${active === index
                                ? "text-white"
                                : "text-neutral-400 hover:text-white"
                            }
                        `}
                    >
                        {tab.label}
                    </button>
                ))}

                {/* INDICADOR REAL */}
                <span
                    className="absolute bottom-0 h-[2px] bg-indigo-500 transition-all duration-300"
                    style={{
                        width: indicatorStyle.width,
                        left: indicatorStyle.left,
                    }}
                />
            </div>

            {/* CONTENT */}
            <div className="relative mt-8 min-h-[150px]">
                {tabs.map((tab, index) => (
                    <div
                        key={index}
                        className={`
              transition-all
              duration-500
              ${active === index
                                ? "opacity-100 translate-y-0 relative"
                                : "opacity-0 -translate-y-4 absolute inset-0 pointer-events-none"
                            }
            `}
                    >
                        <div className="p-6 bg-neutral-900 rounded-xl text-white">
                            {tab.content}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}