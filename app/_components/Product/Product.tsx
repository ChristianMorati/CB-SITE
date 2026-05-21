import { useState } from "react";
import { ProductImage } from "./ProductImage";
import { ScrollList } from "./ProductFeatures";

interface Product {
    id: string
    name: string
    imageSrc: string
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
            <div
                className="
          text-[#BA927A]
          border border-[#BA927A]            bg-linear-to-b from-black via-[#292723] 
          w-full
          max-w-[1200px]
          h-[500px]
          mx-auto
          flex
          overflow-hidden
        "
            >
                {/* IMAGE SIDE */}
                <div
                    className="
              w-1/2
              h-full

              flex
              items-center
              justify-center

              overflow-hidden
            "
                >
                    <img
                        src={product.imageSrc}
                        alt={product.name}
                        className="
        w-full
        h-full

        object-cover
        object-center

        animate-[zoomInOut_2s_ease-in-out_infinite]
      "
                    />
                </div>

                {/* DESCRIPTION SIDE */}
                <div
                    className="
      w-1/2
      h-full

      flex
      flex-col
      justify-between

      p-6
      overflow-hidden
    "
                >
                    <h1
                        className="
        text-5xl
        leading-none
      "
                    >
                        {product.name}
                    </h1>

                    <div className="
                            w-full
                            flex flex-col
                            justify-between
                            md:max-h-[300px]
                            min-h-0
                            overflow-hidden
                            py-4
                            pb-6
                            text-md md:text-2xl
                        ">
                        {/* <ProductFeatures productId={"12"} /> */}
                        <ScrollList items={product.features} />
                    </div>

                    <div
                        className="
                                relative
                                bg-[#BA927A]/20
                                m-2 mt-0
                                p-2
                                flex items-center
                                rounded-sm
                                rounded-tl-none

                                before:absolute
                                before:inset-0
                                before:rounded-sm
                                before:rounded-tl-none
                                before:border-2
                                before:border-[#BA927A]
                                before:content-['']
                                before:animate-[outlineBounce_2s_ease-out_infinite]
                            "
                    >
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
                            CONFeRIR
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}