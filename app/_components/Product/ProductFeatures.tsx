import React from "react";

type ScrollListProps = {
    items: string[];
    className?: string;
};

export const ScrollList: React.FC<ScrollListProps> = ({
    items,
    className = "",
}) => {
    return (
        <ul
            className={`
                list-disc list-inside
                relative
                overflow-y-auto
                mask-[linear-gradient(to_bottom,black_80%,transparent)]
                max-h-[150px]
                ml-1
                ${className}
            `}
            style={{
                scrollbarColor: "#937461 #181815",
                scrollbarWidth: "thin",
                direction: "rtl",
            }}
        >
            {items.map((item, index) => (
                <li key={`${item}-${index}`}
                    className="
                    pl-2
                "
                    style={{
                        direction: "ltr"
                    }}>
                    {item}
                </li>
            ))}

            <li className="p-2 list-none text-md" />
        </ul>
    );
};

type ProductFeaturesProps = {
    productId: string
}

export function ProductFeatures({
    productId
}: ProductFeaturesProps) {

    const loadProductFeatures = ({ productId }: {
        productId: string
    }) => {

    }

    return (
        <>
            <ScrollList items={[
                "cubo barulhento de fuder a calota",
                "cubo barulhento de fuder a calota",
                "cubo barulhento de fuder a calota",
                "cubo barulhento de fuder a calota",
                "cubo barulhento de fuder a calota",
                "cubo barulhento de fuder a calota",
                "cubo barulhento de fuder a calota",
                "cubo barulhento de fuder a calota",
                "cubo barulhento de fuder a calota",
                "cubo barulhento de fuder a calota",
                "cubo barulhento de fuder a calota",
                "cubo barulhento de fuder a calota",
                "cubo barulhento de fuder a calota barulhento de fuder",
            ]} />
        </>
    );
}