import { ProductColorItem, SeatColorItem } from "./Product/Card/ProductDetailedCard"

type ColorItem = ProductColorItem | SeatColorItem

type ColorCircleProps = {
  colors: ColorItem[]
}

export function ColorCircle({ colors }: ColorCircleProps) {
  const smooth = 1

  // 🔍 detecta se tem tipo (productColor)
  const hasType = colors.some(
    (c) => "product_color_type" in c
  )

  let segments: string[] = []

  if (hasType) {
    // 🎯 lógica 70/30
    const typedColors = colors as ProductColorItem[]

    const predominant = typedColors.find(
      (c) => c.product_color_type === "predominant"
    )

    const assistants = typedColors.filter(
      (c) => c.product_color_type !== "predominant"
    )

    const total = 360
    const predominantDeg = predominant ? total * 0.7 : 0
    const remaining = total - predominantDeg

    const assistantDeg =
      assistants.length > 0 ? remaining / assistants.length : 0

    let current = 0

    if (predominant) {
      const start = current
      const end = current + predominantDeg

      segments.push(`
        rgb(${predominant.RGB}) ${start + smooth}deg,
        rgb(${predominant.RGB}) ${end - smooth}deg
      `)

      current = end
    }

    assistants.forEach((c) => {
      const start = current
      const end = current + assistantDeg

      segments.push(`
        rgb(${c.RGB}) ${start + smooth}deg,
        rgb(${c.RGB}) ${end - smooth}deg
      `)

      current = end
    })

  } else {
    // 🎯 seatColor → 100% simples
    const total = 360
    const slice = total / colors.length

    let current = 0

    colors.forEach((c) => {
      const start = current
      const end = current + slice

      segments.push(`
        rgb(${c.RGB}) ${start + smooth}deg,
        rgb(${c.RGB}) ${end - smooth}deg
      `)

      current = end
    })
  }

  const gradient = `conic-gradient(${segments.join(",")})`

  return (
    <div
      className="w-12 h-12 rounded-full border"
      style={{ background: gradient }}
    />
  )
}