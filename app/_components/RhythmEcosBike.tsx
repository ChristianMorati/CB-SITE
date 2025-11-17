export function RhythmEcosBike() {
    return (
        <div className="
            relative
            w-screen lg:[w-33vw]
            -mt-10 lg:mt-10
            ">
            <h1 className="
                absolute
                top-3
                left-0
                text-[#ED7D3B]
                z-3
                font-bold
                text-8xl
                font-stroke
              ">RÍTM</h1>
            <img src="/ecos.webp"
                className="
                brightness-50
                absolute
                -top-30
                left-[60px]
                z-2
                size-[300px]
                grayscale
                "
            />
            <div className="
              absolute
              top-2
              left-60
              text-[#ED7D3B]
              border-20 rounded-full size-[104px]
              z-1
              " />
            <div className="
              absolute
              top-7
              left-65
              text-black
              border-[.5px] rounded-full size-[62.5px]
              z-2
              "
            />
        </div>
    )
}