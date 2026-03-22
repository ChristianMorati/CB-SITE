'use client'

import { ProductType } from "../page"

type Props = {
  value: ProductType | ""
  onChange: (value: ProductType) => void
  productTypes: readonly ProductType[] // 🔥 importante
  label?: string
}

export default function ProductTypeSelect({
  value,
  onChange,
  productTypes,
  label = "Tipo do Produto",
}: Props) {

function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
  const selected = e.target.value

  const found = productTypes.find((t) => t === selected)

  if (found) {
    onChange(found)
  }
}

  return (
    <div className="flex flex-col gap-1">
      <label>{label}</label>

      <select
        value={value}
        onChange={handleChange}
      >
        <option value="">Selecione</option>

        {productTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  )
}