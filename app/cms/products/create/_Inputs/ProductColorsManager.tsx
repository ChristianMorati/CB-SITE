"use client"

export type ProductColorItem = {
  id?: string
  productId?: string
  RGB: string
  product_color_type: "predominant" | "assistant"
}

type Props = {
  productColors: ProductColorItem[]
  setProductColors: React.Dispatch<React.SetStateAction<ProductColorItem[]>>
}

export default function ProductColorsManager({
  productColors,
  setProductColors,
}: Props) {
  // 🎯 utils
  function rgbToHex(rgb: string) {
    const [r, g, b] = rgb.split(",").map((n) => parseInt(n.trim()))

    const toHex = (n: number) =>
      n.toString(16).padStart(2, "0")

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`
  }

  function hexToRgb(hex: string) {
    const sanitized = hex.replace("#", "")

    const r = parseInt(sanitized.substring(0, 2), 16)
    const g = parseInt(sanitized.substring(2, 4), 16)
    const b = parseInt(sanitized.substring(4, 6), 16)

    return `${r}, ${g}, ${b}`
  }

  function handleAddColor() {
    setProductColors((prev) => [
      ...prev,
      {
        RGB: "0, 0, 0",
        product_color_type: "assistant",
      },
    ])
  }

  function handleRemove(index: number) {
    setProductColors((prev) => {
      const updated = prev.filter((_, i) => i !== index)

      if (!updated.some((c) => c.product_color_type === "predominant")) {
        if (updated.length > 0) {
          updated[0].product_color_type = "predominant"
        }
      }

      return [...updated]
    })
  }

  function handleColorChange(index: number, hex: string) {
    const rgb = hexToRgb(hex)

    setProductColors((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, RGB: rgb } : item
      )
    )
  }

  function setAsPredominant(index: number) {
    setProductColors((prev) =>
      prev.map((item, i) => ({
        ...item,
        product_color_type: i === index ? "predominant" : "assistant",
      }))
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-lg">Cores do Produto</h2>

      {productColors.map((color, index) => (
        <div
          key={index}
          className="flex items-center gap-3 border p-3 rounded-lg"
        >
          {/* 🎨 Color Picker */}
          <input
            type="color"
            value={rgbToHex(color.RGB)}
            onChange={(e) => handleColorChange(index, e.target.value)}
            className="w-12 h-10 cursor-pointer border rounded"
          />

          {/* Preview */}
          <div
            className="w-10 h-10 rounded-full border"
            style={{ backgroundColor: `rgb(${color.RGB})` }}
          />

          {/* RGB texto (readonly opcional) */}
          <span className="text-sm text-gray-600 w-[110px]">
            {color.RGB}
          </span>

          {/* Predominante */}
          <button
            onClick={() => setAsPredominant(index)}
            className={`px-3 py-1 rounded text-sm ${
              color.product_color_type === "predominant"
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {color.product_color_type === "predominant"
              ? "Predominante"
              : "Definir"}
          </button>

          {/* Remover */}
          <button
            onClick={() => handleRemove(index)}
            className="text-red-500 text-sm"
          >
            Remover
          </button>
        </div>
      ))}

      <button
        onClick={handleAddColor}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        + Adicionar cor
      </button>
    </div>
  )
}