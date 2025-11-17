'use client'

import Header from "./_components/Header";

import { RhythmEcosBike } from "./_components/RhythmEcosBike";
import { ProductsSection } from "./_components/ProductsSection";
import { Section } from "./_components/Section";
import CtaButton from "./_components/CtaButton";
import { useState } from "react";

const bikes = ["GTI", "RAVA", "ECOS", "VIKING / PRO"]
const motos = ["AVELLOZ", "JET 90CC", "JET 125", "JET 2025"]
const eletricBikes = ["EMOVIX V8", "OKTO", "EKO-5 DUOS", "X11", "X15-PRO"]

export default function Home() {
  const isNatal = true
  const [mover, setMover] = useState(false);

  return (
    <div className="
    flex flex-col justify-center items-center
    ">
      <main className="
      text-black
      ">
        <div
          className="
          sticky top-0
          z-50
        "
        >
          <Header />
        </div>

        <Section bgColor="">
          <div className="
          text-[#d4710f]
          flex flex-col lg:flex-row
          relative
          ">
            <div className="
            flex flex-col
            justify-end lg:justify-center
            w-screen lg:w-[60vw]
            h-[35vh] lg:h-[90vh]
            pl-[5vw]
            gap-1
            ">
              <div>
                <h2 className="
                inline-block
                font-bold
                text-lg md:text-xl
                px-4
                py-2 rounded-sm
                border border-[#F6C9A1]
                text-[#F6C9A1]
                bg-[#6A0503]
              ">
                  BEM VINDO!
                </h2>
              </div>
              <h2 className="
              font-bold
              text-2xl md:text-5xl
              text-[#787878]
              font-stroke
              ">ONDE A MOBILIDADE TE</h2>
              <h1 className="
              font-bold
              text-5xl md:text-8xl lg:text-8xl xl:text-8xl
              text-[#ED7D3B]
              font-stroke
              ">ENCONTRA</h1>
            </div>

            <div
              className="
              relative
              w-screen lg:w-[40vw]
              h-[50vh] lg:h-[90vh]
              grid
              justify-center
              items-start md:place-items-center
            "
            >
              {/* Card 1 */}
              <img
                src="/JET-WHITE.webp"
                className="
                brightness-75
                rotate-[-7deg]
                absolute
                w-[110vw] md:w-[45vw] lg:w-[28vw]
                -translate-x-[20%] md:-translate-x-[60%]
                z-10
                "
              />

              {/* Card 2 */}
              <img
                src="/JET-125-SS-Cores-3.webp"
                className="
                brightness-75
                rotate-[-7deg]
                absolute
                w-[110vw] md:w-[45vw] lg:w-[28vw]
                -translate-x-[-5%] md:translate-x-[-10%]
                mt-5
                z-20
              "
              />

              {/* Card 3 */}
              <img
                src="/JET-WHITE.webp"
                className="
                brightness-75
                rotate-[-7deg]
                absolute
                w-[110vw] md:w-[45vw] lg:w-[28vw]
                translate-x-[25%] md:translate-x-[40%]
                z-30
              "
              />
            </div>
          </div>
        </Section>

        <Section>
          <div className="
          flex flex-col items-center justify-center
          h-full relative
          gap-5
          ">
            {/* TÍTULOS */}
            <div className="text-center z-2">
              <h2 className="
        font-bold
        text-3xl lg:text-4xl xl:text-5xl
        text-[#787878]
      ">
                MUDE O SEU MEIO
              </h2>

              <h2 className="
        font-bold
        text-3xl md:text-4xl lg:text-6xl
        text-[#787878]
      ">
                E <span className="text-[#ED7D3B] font-stroke">CHEGUE</span> MAIS
              </h2>
            </div>

            {/* BLOCO DO LONGE */}
            <div className="relative w-full flex justify-center">
              <h1
                className="
                text-[#ED7D3B]
                font-bold
                z-2
                text-8xl md:text-9xl lg:text-[12rem]
                font-stroke
                text-center
              "
              >
                LONGE
              </h1>
            </div>
            <img
              src="/ecos.webp"
              className="
              absolute
                brightness-25
                -mt-15 lg:-mt-20
                size-[400px] md:size-[500px] lg:size-[550px]
                grayscale
                z-1
              "
            />
            <div className="
              flex justify-center
              z-2 mt-10
              ">
              <CtaButton title="IR MAIS LONGE" />
            </div>
          </div>
        </Section>

        <Section>
          <div className="
          font-bold
          text-3xl lg:text-4xl xl:text-5xl text-[#787878]
          flex flex-col md:items-center justify-evenly h-[90vh]
          ">
            <div className="ml-[5vw] z-2">
              <h2>
                NÃO IMPORTA A MANEIRA,
              </h2>
              <h2>O QUE VALE É
                <span className="
                text-[rgb(237,125,59)]
                text-4xl lg:text-5xl
                font-stroke
                "> MANTER
                </span> O
              </h2>
            </div>

            <div className="max-w-[1200px]
            grid grid-cols-3 gap-10 ml-[20] -mt-25
            ">
              <div className="
              lg:flex justify-center items-end hidden">
                <img
                  width="300"
                  src="/JET-WHITE.webp"
                  className="
                   grayscale
                   brightness-50
                  "
                />
              </div>
              <div className="hidden md:block lg:hidden"></div>
              <div className="
                md:scale-130 md:-ml-2 lg:ml-0 xl:ml-4 xl:scale-150
              ">
                <RhythmEcosBike />
              </div>
              <div className="
              lg:flex justify-center items-end hidden">
                <img
                  width="300"
                  src="/JET-WHITE.webp"
                  className="
                  grayscale
                  brightness-50
                  "
                />
              </div>
            </div>
            <div className="
            flex justify-center
            ">
              <CtaButton title="QUERO MANTER" />
            </div>
          </div>
        </Section>
        <Section>
          <div className="
            px-8
          ">
            <ProductsSection
              bikes={bikes}
              eletricBikes={eletricBikes}
              motos={motos}
            />
          </div>
        </Section>
        <Section>
          <div className="
          relative
          text-[#BA927A]
          p-2
          ">
            <h1 className="
            text-4xl my-2
            ">MOTOS</h1>
            <div
              className={`
                  relative py-4 flex border border-[#BA927A]
                  bg-linear-to-b from-black via-[#292723] to-[#151515]
                  rounded-tr-[150px] rounded-bl-[150px]

                  transition-all duration-[1000ms] ease-in-out
                  transform-gpu
                  ${mover
                  ? "-translate-y-10 -rotate-x-12 scale-90 opacity-0"
                  : "opacity-80"
                }
                `}
            >
              <div className="w-[60%]">
                <img
                  src="/ecos.webp"
                  className="
                  opacity-100
                  z-2
                  "
                />
              </div>
              <div className="
                flex flex-col justify-between
                gap-2
                uppercase
                w-[50%]
                ">
                <h1 className="
                  text-6xl
                ">viking pro</h1>
                <ul className="list-disc ml-10 text-2xl">
                  <li><p>CUBO BARULHENTO</p></li>
                  <li><p>CUBO BARULHENTO</p></li>
                  <li><p>CUBO BARULHENTO</p></li>
                </ul>

                <div className="
                  relative
                  bg-[#BA927A]/20
                  h-[30%]
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
                  ">nova</p>
                  <p className="
                  text-7xl
                  ">VENHA<br />CONFIRIR</p>
                </div>

                {/* Pointers */}
                <div
                  className="
                  border-t-2 border-r-2
                    cursor-pointer
                    size-10
                    absolute
                    top-1/2
                    right-0
                    rotate-45
                    -translate-x-1/2
                    -translate-y-1/2
                    "
                  onClick={() => setMover(true)}
                />
                <div
                  className="
                  border-b-2 border-l-2
                  cursor-pointer
                  size-10
                  absolute
                  top-1/2
                  left-10
                  rotate-45
                  -translate-x-1/2
                  -translate-y-1/2
                  "
                  onClick={() => setMover(false)}
                />
                {/* End Pointers */}
              </div>
            </div>
          </div>
        </Section>
      </main>
    </div>
  );
}
