import { useState } from "react";
import { ProductImage } from "./ProductImage";
import { ProductFeatures } from "./ProductFeatures";
import Link from "next/link";

interface Product {
    id: string
    name: string
}

type ProductProps = {
    product: Product
}

export function Product({
    product,
}: ProductProps) {
    const [mover, setMover] = useState(false);

    return (
        <>
            <div className="
                mx-auto
                relative
                max-w-[1200px]
                text-[#BA927A]
                p-2
          ">
                <h1
                    className="
                        text-2xl md:text-4xl my-2 uppercase
                        bg-[url('/gifs/eletric-effect.gif')]
                        bg-cover
                        bg-center
                        bg-clip-text
                        text-transparent
                    "
                    style={{
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        textShadow: "0 0 1px rgba(186, 146, 122, 0.7)",
                    }}
                >
                    Elétrica
                </h1>
                <div
                    className={`
                    relative
                    flex flex-col md:flex-row
                    border border-[#BA927A]
                    bg-linear-to-b from-black via-[#292723] to-[#151515]
                    md:rounded-tr-[80px] md:rounded-bl-[80px]
                    sm:rounded-tr-[50px] sm:rounded-bl-[50px]

                    overflow-hidden
                    transition-all duration-1000 ease-in-out
                    transform-gpu
                    ${mover
                            ? "-translate-y-10 -rotate-x-12 scale-90 opacity-0"
                            : "opacity-80"
                        }
                `}
                >
                    {/* Fisrt Flex Item */}
                    <div className="
                        w-full md:w-[50%]
                        aspect-square
                    ">
                        <ProductImage />
                    </div>

                    {/* Second Flex Item */}
                    <div className="
                        w-full md:w-[50%]
                        p-2
                        flex flex-col justify-between
                        gap-2
                        uppercase
                    ">
                        <h1 className="
                            text-2xl md:text-4xl lg:text-6xl
                        ">
                            {product?.name || "-"}
                        </h1>

                        <div className="
                            w-full
                            flex flex-col
                            justify-between
                            md:max-h-[300px]
                            min-h-0
                            overflow-hidden
                            pb-6
                        ">
                            <ProductFeatures productId={"12"} />
                            <div className="flex justify-center">
                                <Link href={`/products/${product}`}>
                                    <button className="
                                    p-2 px-4 bg-red-200 rounded-xs
                                    mt-4
                                    rounded-br-lg
                                    rounded-bl-lg
                                    uppercase
                                    text-black
                                ">
                                        Mais Detalhes
                                    </button>
                                </Link>
                            </div>
                        </div>

                        <div className="
                            relative
                            bg-[#BA927A]/20
                            m-2 mt-0
                            p-2
                            flex items-center
                            rounded-xl
                            rounded-tl-none
                        ">
                            <p className="absolute
                                -top-6 left-0
                                text-md text-black text-bold
                                bg-white
                                border border-b-0
                                rounded-t-md px-2
                                opacity-80
                            ">novidade</p>
                            <p className="
                                text-5xl md:text-6xl
                            ">
                                VENHA
                                <br />
                                CONFIRIR
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}