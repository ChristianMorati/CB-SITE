import { useState } from "react"

type ColorValue = {
  hex: string
  rgb: {
    r: number
    g: number
    b: number
  }
}

type ColorInputProps = {
  value: ColorValue
  onChange: (color: ColorValue) => void
}

function hexToRgb(hex: string) {
  const bigint = parseInt(hex.replace("#", ""), 16)

  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  }
}

export function ColorSelectInput({ value, onChange }: ColorInputProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const hex = e.target.value

    onChange({
      hex,
      rgb: hexToRgb(hex),
    })
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <label htmlFor="">Clique na Cor para alterar</label>
      <input
        type="color"
        value={value.hex}
        onChange={handleChange}
      />

      {/* <div
        style={{
          width: 80,
          height: 40,
          background: value.hex,
          border: "1px solid #ccc",
        }}
      /> */}

      {/* <pre>{JSON.stringify(value, null, 2)}</pre> */}
    </div>
  )
}