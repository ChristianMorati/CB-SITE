'use client'

import { useState } from "react";
import ListTitle from "./ListTitle";
import CtaButton from "./CtaButton";

export function ProductsSection({ bikes, eletricBikes, motos }) {
  const [tab, setTab] = useState("bikes");

  const tabs = [
    { key: "bikes", label: "Bikes", data: bikes },
    { key: "eletric", label: "Bikes Elétricas", data: eletricBikes },
    { key: "motos", label: "Motos", data: motos },
  ];

  return (
    <>
      <h1 className="
      uppercase text-3xl font-bold mb-6 text-white
      ">
        Produtos
      </h1>

      <div className="flex md:hidden gap-3 mb-6 overflow-x-auto no-scrollbar">
        {tabs.map((t) => {
          const active = tab === t.key;

          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`
                relative px-2 py-2 rounded-t-xl
                uppercase font-bold text-xs tracking-wide
                flex items-center gap-1
                border transition-all duration-200
                ${active
                  ? "bg-[#ED7D3B] border-[#ED7D3B] text-white shadow-md scale-105"
                  : "bg-white/5 border-white/20 text-gray-300"
                }
              `}
            >
              {/* Bolinha indicadora */}
              <span
                className={`
                  w-2 h-2 rounded-full
                  ${active ? "bg-white" : "bg-gray-500"}
                `}
              />
              {t.label}

              {/* Linha inferior para a aba selecionada */}
              {active && (
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-white rounded-full" />
              )}
            </button>
          );
        })}
      </div>


      {/* DESKTOP (todas as colunas) */}
      <div className="hidden md:grid grid-cols-3 gap-8">
        {tabs.map((t) => (
          <div key={t.key}>
            <ListTitle text={t.label} />
            <ul className="list-inside space-y-1 text-gray-400">
              {t.data.map((item, index) => (
                <li
                  key={index}
                  className="text-xl font-semibold mb-3 uppercase font-stroke text-gray-400"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* MOBILE (apenas aba selecionada) */}
      <div className="md:hidden">
        {tabs
          .filter((t) => t.key === tab)
          .map((t) => (
            <div key={t.key}>
              <ListTitle text={t.label} />
              <ul className="list-inside space-y-1 text-gray-400">
                {t.data.map((item, index) => (
                  <li
                    key={index}
                    className="text-xl font-semibold mb-3 uppercase font-stroke text-gray-400"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </div>
      <CtaButton title="confira de perto"></CtaButton>
    </>
  );
}
