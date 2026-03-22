'use client'

import Header from "./_components/Header";

import { RhythmEcosBike } from "./_components/RhythmEcosBike";
import { Section } from "./_components/Section";
import CtaButton from "./_components/CtaButton";
import { useState } from "react";
import { colors } from "./colors";
import CopyButton from "./_components/CopyButton";
import { PageWrapper } from "./_components/Page/PageWrapper";
import Link from "next/link";
import { ScrollDownIndicator } from "./_components/AnimatedElements/ScrollDownIndicator";
import { FolderTabs } from "./_components/FolderTabs";
import { ProductImage } from "./_components/Product/ProductImage";
import { Product } from "./_components/Product/Product";

const bikes = ["GTI", "RAVA", "ECOS", "VIKING / PRO"]
const motos = ["AVELLOZ", "JET 90CC", "JET 125", "JET 2025"]
const eletricBikes = ["EMOVIX V8", "OKTO", "EKO-5 DUOS", "X11", "X15-PRO"]

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

export default function Home() {
  const isNatal = true

  return (
    <PageWrapper>
      <main className="text-black
      cursor-custom
      ">
        <div
          className="
        sticky 
        top-0 
        z-50
        "
        >
          <Header />
        </div>

        <div>
          {/* Main Section */}
          <Section>
            <div className="
            max-w-[1200px]
            text-[#d4710f]
            flex flex-col
            lg:flex-row
            items-center
            h-[90vh]
            justify-center lg:justify-evenly
            px-10
            ">
              <div className="
              max-w-[1200px]
              flex
              items-center
              lg:justify-center
              lg:w-[45vw]
              h-[45vw] lg:h-screen
              z-2
              ">
                <div>
                  <h2 className="
                inline-block
                font-bold
                text-sm md:text-lg
                my-2
                px-4
                py-2 rounded-sm
                border border-[#F6C9A1]
                text-[#F6C9A1]
                bg-[#6A0503]
                ">
                    BEM VINDO!
                  </h2>
                  <h2 className="
              font-bold
              text-2xl md:text-5xl
              text-[#787878]
              font-stroke
              text-nowrap
              ">ONDE A MOBILIDADE</h2>
                  <h1 className="
              font-bold
              text-5xl md:text-8xl lg:text-8xl xl:text-8xl
              text-[#ED7D3B]
              font-stroke
              ">ENCONTRA</h1>
                </div>
              </div>

              {/* JET GRID */}
              <div
                className="
              grid 
              grid-cols-3
              mt-10
              
              h-[45vw] lg:h-[90vh]
              
              justify-items-end
              content-start lg:content-center
              
              gap-2
              relative
              lg:w-[40vw]
              "
              >
                {/* Card 1 */}
                <img
                  src="/JET-WHITE.webp"
                  className="
                scale-300 md:scale-180 lg:scale-300
                -rotate-[5deg]
                brightness-70
                translate-x-[30%] lg:translate-x-[10%]
                z-1
                "
                />

                {/* Card 2 */}
                <img
                  src="/JET-125-SS-Cores-3.webp"
                  className="
                scale-300 md:scale-200 lg:scale-300
                -rotate-10
                brightness-70
                translate-x-[0%] lg:translate-x-[-30%]
                z-2
              "
                />

                {/* Card 3 */}
                <img
                  src="/JET-WHITE.webp"
                  className="
                scale-300 md:scale-180 lg:scale-300
                -rotate-[5deg]
                brightness-70
                z-3
                -translate-x-[30%] lg:-translate-x-[60%]
              "
                />
              </div>

            </div>
          </Section>

          {/* Far Away Section */}
          <Section>
            <div className="
            flex flex-col items-center justify-center
            h-full relative
            gap-5
            ">
              {/* TÍTULOS */}
              <div className="text-center z-10 font-bold text-3xl sm:text-4xl md:text-5xl text-[#787878] leading-relaxed">
                <h2>
                  <span className="highlight">
                    MUDE O SEU MEIO
                  </span>
                  <br />
                  <span className="highlight mt-2 inline-block">
                    E <span className="text-[#ED7D3B] font-stroke">CHEGUE</span>
                    <br />
                  </span>
                  <br />
                  <span className="highlight">+ </span>
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
                grayscale
                z-1
              "
              />
              <div className="
              flex justify-center
              z-2
              ">
                <a href="#keep-rithm-section"
                  className="scroll-mt-[15vh]"
                >
                  <CtaButton title="IR MAIS LONGE" />
                </a>
              </div>
            </div>
          </Section>

          {/* Keep Rithm Section */}
          <Section>
            <div
              id="keep-rithm-section"
              className={`
            flex flex-col md:items-center justify-evenly h-[90vh]
            text-center
            font-bold font-stroke
            text-3xl sm:text-4xl md:text-5xl text-[${colors.textSecondary}]
            `}
            >
              <h2 className="leading-relaxed z-2">
                <span className="highlight text-white">
                  NÃO IMPORTA COMO,
                  <br />
                  O QUE VALE É
                  <br />
                  <span style={{ color: colors.textPrimary }}>
                    MANTER
                  </span>
                  <br />
                  O
                </span>
              </h2>

              <div className="flex flex-col justify-center items-center
                -mt-20
                xs:-mt-22
                sm:-mt-24
                md:-mt-18
                lg:-mt-16
              ">
                <div className="
                    scale-92 sm:scale-100 md:scale-150 lg:scale-200
                  ">
                  <RhythmEcosBike />
                </div>
                <div className="
                  mt-2
                  md:mt-8
                  lg:mt-16
              ">
                  <a href="#products" className="relative z-20 inline-block">
                    <CtaButton title="QUERO MANTER" />
                  </a>
                </div>
              </div>
            </div>
          </Section>

          {/* <div className="
               flex flex-col lg:flex-row justify-center items-center gap-2
               uppercase
               z-2
              ">
                <div>
                  <h1 className="text-7xl">Avelloz</h1>
                </div>

                <h1 className="text-4xl">X</h1>
                <div>
                  <h1 className="text-7xl leading-loose">Shineray</h1>
                </div>
              </div> */}

          {/* Who We Are */}
          <section>
            <div className="
            text-[#ED7D3B]
              relative h-[90vh] overflow-hidden
              max-w-[1200px]
              mx-auto
              text-xl lg:text-6xl uppercase
          ">
              <div className="absolute
                max-w-[1200px]
                top-0
                z-4
                m-10
                text-white
                ">
                <h1 className="
                text-2xl md:text-4xl lg:text-6xl 
                ">
                  QUEM SOMOS?
                </h1>
                <h1 className="
                  text-2xl md:text-4xl lg:text-6xl 
                 text-[#ED7D3B]
                ">
                  A CENTRAL BIKES É
                </h1>
              </div>

              {/* ESQUERDA */}
              <div
                className="
                flex items-center pl-10
                absolute inset-0
                bg-linear-to-l from-orange-950 to-tranparent
                [clip-path:polygon(0%_0%,56%_0%,45%_100%,0%_100%)]
                z-2
                "
              >
                <div className="flex flex-col gap-2">
                  <p className="
                    text-center
                    bg-black/50 px-6 py-3 rounded-sm
                  ">
                    LOJA
                  </p>
                  <CtaButton title="produtos"></CtaButton>
                </div>
              </div>

              {/* DIREITA */}
              <div
                className="
                absolute inset-0
                flex items-center justify-end pr-10
                bg-[url('/ecos.webp')] bg-cover bg-center
                [clip-path:polygon(55%_0%,100%_0%,100%_100%,45%_100%)]
                z-1
                "
              >
                <div className="absolute inset-0
                  bg-linear-to-r from-black to-tranparent
                "/>
                <div className="flex flex-col" >
                  <p className="
                    text-center
                    bg-black/80
                    px-6 py-3 rounded-sm
                ">
                    oficina
                  </p>
                  <div className="z-2 -mt-4">
                    <CtaButton title="Serviços"></CtaButton>
                  </div>
                </div>
              </div>
              <div className="
              absolute bottom-2/4 left-1/2 md:top-1/2 -translate-x-1/2 -translate-y-1/2
              z-2
              flex flex-col items-center justify-center
              w-18 h-18 md:w-30 md:h-30 lg:size-40
              rounded-full
              bg-linear-to-br from-amber-300 via-yellow-500 to-amber-700
              shadow-[0_0_25px_rgba(255,200,50,0.7)]
              border-4 border-amber-200
              text-center
              font-bold
              text-white
              tracking-wider
              uppercase
              [text-shadow:0_1px_4px_rgba(0,0,0,.75)]
              ">
                <span className="text-xl md:text-3xl">+30</span>
                <span className="text-xs md:text-xl">Anos</span>
              </div>
            </div>
          </section>

          {/* Contact */}
          <Section>
            <div className="
            max-w-[1200px]
            text-white
            text-xl
            py-10 px-2 md:px-0
            w-full mx-auto
          ">
              <div className="
              lg:p-10
              w-full h-full
            ">
                <h1 className="
                text-2xl md:text-4xl lg:text-6xl 
              ">
                  CONTATO
                </h1>

                <div className="flex flex-col gap-6">
                  <div className="flex gap-2 mt-10">
                    <div className="p-2 bg-zinc-500"></div>
                    <h3>R. Cap. José Maria, 549, Araçá, Linhares - ES, 29901-450</h3>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col md:flex-row items-center gap-2">
                      <div className="p-2 bg-zinc-500"></div>
                      <h3>(27) 98969-9129</h3>
                      <CopyButton title="COPY"></CopyButton>
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-2">
                      <div className="p-2 bg-zinc-500"></div>
                      <h3>(27) 98969-9129</h3>
                      <CopyButton title="COPY"></CopyButton>
                    </div>
                  </div>
                  <div className="justify-center md:justify-start flex md:flex-row gap-2">
                    <CtaButton title="WHATSAPP"></CtaButton>
                    <CtaButton title="INSTAGRAM"></CtaButton>
                  </div>
                </div>
              </div>
            </div>

          </Section>
        </div>

        {/* Products Preview */}
        <section
          id="products"
          className="scroll-mt-[10vh]"
        >
          <Product />
        </section>
      </main >
    </PageWrapper >
  );
}
