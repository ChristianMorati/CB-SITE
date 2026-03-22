import { colors } from "@/app/colors";
import { ChevronDown } from "lucide-react";

interface ScrollDownIndicatorProps {
    targetId?: string;
}

export function ScrollDownIndicator({ targetId }: ScrollDownIndicatorProps) {
    const handleClick = () => {
        if (!targetId) return;

        const el = document.getElementById(targetId);
        el?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
            <button
                onClick={handleClick}
                className="
                    group
                    flex
                    flex-col
                    items-center
                    cursor-pointer
                    select-none
                    "
            >
                <ChevronDown
                    size={50}
                    className={`
                        text-[${colors.primary}]
                        animate-bounce
                        group-hover:scale-100
                        transition-transform
                        duration-300
                        `}
                />
            </button>
        </div>
    );
}