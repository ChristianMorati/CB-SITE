"use client";

import { useState } from "react";
import { Product } from "../Product/Product";

export function ProductsCarousel({
    title,
    items
}) {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((prev) => (prev + 1) % items.length);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <div className="p-4 max-w-[1200px] mx-auto flex flex-col gap-4">
      <h1 className="electric-text">
        {title}
      </h1>

      <div className="relative overflow-hidden">
        <Product product={items[current]} />

        {/* Buttons */}
        <button
          onClick={prev}
          className="
            absolute
            left-2
            top-1/2
            -translate-y-1/2

            bg-black/60
            hover:bg-black/80

            text-white
            px-4 py-2
            rounded-full
            z-20
            transition
          "
        >
          ←
        </button>

        <button
          onClick={next}
          className="
            absolute
            right-2
            top-1/2
            -translate-y-1/2

            bg-black/60
            hover:bg-black/80

            text-white
            px-4 py-2
            rounded-full
            z-20
            transition
          "
        >
          →
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`
              w-3 h-3 rounded-full transition-all
              ${
                current === index
                  ? "bg-[#BA927A] scale-125"
                  : "bg-white/30"
              }
            `}
          />
        ))}
      </div>
    </div>
  );
}