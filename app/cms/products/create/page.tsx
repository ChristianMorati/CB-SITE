"use client"

import { useEffect, useRef, useState } from "react"
import { UnlockType, unlockTypeLabels, UnlockTypesInput } from "./_Inputs/UnlockTypesInput"
import { ColorSelectInput } from "./_Inputs/ColorSelectInput"
import { FormInput } from "./_Inputs/FormInput"
import { SectionTitle } from "./_Inputs/SectionLabel"
import { PaymentConditionInput, PaymentConditionsInput } from "./_Inputs/PaymentConditionsInput"
import { CreateProductPayload } from "@/app/api/_types/CreateProductPayload"
import AttributesSection from "./_Inputs/AttributesSection"
import ProductTypeSelect from "./_Inputs/ProductTypeSelect"
import ProductColorsManager from "./_Inputs/ProductColorsManager"

function parseRGB(rgbString: string) {
  const [r, g, b] = rgbString.split(",").map(Number)
  return { r, g, b }
}

function rgbToString(rgb: { r: number; g: number; b: number }) {
  return `${rgb.r},${rgb.g},${rgb.b}`
}

function rgbToHex({ r, g, b }: { r: number; g: number; b: number }) {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b)
    .toString(16)
    .slice(1)}`
}

type AttributeType = "number" | "boolean" | "string" | "select-list"

type SelectList = {
  option: string
}

interface BaseAttribute {
  id: string
  label: string
  type: AttributeType
  data?: SelectList[]
}

export const productTypes = [
  "bike",
  "electric-bike",
  "motorcycle",
] as const

export type ProductType = typeof productTypes[number]

const baseAttributes: BaseAttribute[] = [
  { id: "power_watts", label: "Potência (W)", type: "number" },
  { id: "range_km", label: "Autonomia (km)", type: "number" },
  { id: "avg_speed_kmh", label: "Velocidade Média (km/h)", type: "number" },
  { id: "charge_time_hours", label: "Tempo de Carga (h)", type: "number" },
  { id: "battery_count", label: "Número de Baterias", type: "number" },
  { id: "max_weight_kg", label: "Peso Máximo (kg)", type: "number" },
  { id: "has_alarm", label: "Possui Alarme", type: "boolean" },
  { id: "passenger_count", label: "Número de Passageiros", type: "number" },
  { id: "tube_tire", label: "Pneu com Câmara", type: "boolean" },
  { id: "reverse_gear", label: "Marcha Ré", type: "boolean" },
  { id: "bluetooth", label: "Bluetooth", type: "boolean" },
  { id: "has_turn_signal", label: "Possui Seta", type: "boolean" },
  { id: "seat_color_name", label: "Cor do Assento (Nome)", type: "string" },
  { id: "seat_color_rgb", label: "Cor do Assento (RGB)", type: "string" },
  {
    id: "battery_type",
    label: "Tipo de Bateria",
    type: "select-list",
    data: [
      { option: "lithium" },
      { option: "lead-acid" },
      { option: "gel" }
    ]
  },
]

export async function createProduct(payload: any) {
  const res = await fetch("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    throw new Error("Failed to create product")
  }

  return res.json()
}

type ProductColorType = "predominant" | "assistant"

type ProductColor = {
  hex: string
  rgb: { r: number; g: number; b: number }
  type: ProductColorType
}

type SeatColor = {
  hex: string
  rgb: { r: number; g: number; b: number }
}

type CreateOrUpdateProductProps = {
  product?: CreateProductPayload
}

export type ProductColorItem = {
  id?: string
  productId?: string
  RGB: string
  product_color_type: "predominant" | "assistant"
}

export default function CreateOrUpdateProduct({
  product
}: CreateOrUpdateProductProps) {
  const inputRefs = useRef<Record<string, HTMLInputElement | HTMLSelectElement | null>>({})
  const [values, setValues] = useState<Record<string, any>>({})
  const [selectedAttributes, setSelectedAttributes] = useState<string[]>([])
  const [unlockTypes, setUnlockTypes] = useState<UnlockType[]>([])
  const [paymentConditions, setPaymentConditions] = useState<PaymentConditionInput[]>([])

  const [productColors, setProductColors] = useState<ProductColorItem[]>(
    product?.productColor ?? [
      {
        RGB: "255, 0, 0",
        product_color_type: "predominant",
      },
    ]
  )

  const [seatColor, setSeatColor] = useState<SeatColor>({
    hex: "#ff0000",
    rgb: { r: 255, g: 0, b: 0 },
  })

  function enforceColorRules(colors: ProductColor[]) {
    if (colors.length === 0) return

    if (colors.length === 1) {
      colors[0].type = "predominant"
      return
    }

    const hasPredominant = colors.some(c => c.type === "predominant")

    if (!hasPredominant) {
      colors[0].type = "predominant"
    }
  }

  useEffect(() => {
    if (!product) return

    // valores simples
    setValues({
      name: product.name ?? "",
      description: product.description ?? "",
      type: product.type ?? "",
      imgUrl: product.imgUrl ?? "",
    })

    // atributos
    if (!product?.attribute) return

    const selected: string[] = []
    const valuesMap: Record<string, any> = {}


    product.attribute.forEach((attr: any) => {
      selected.push(attr.name)

      // tenta converter automaticamente
      if (attr.value === "true" || attr.value === "false") {
        valuesMap[attr.name] = attr.value === "true"
      } else if (!isNaN(Number(attr.value))) {
        valuesMap[attr.name] = Number(attr.value)
      } else {
        valuesMap[attr.name] = attr.value
      }
    })

    setSelectedAttributes(selected)
    setValues(valuesMap)

    // unlock types
    setUnlockTypes(
      product.productUnlockType?.map(
        (item: any) => item.unlockType.type as UnlockType
      ) ?? []
    )

    // ✅ PRODUCT COLORS (ADAPTER)
    if (product.productColor?.length) {
      console.log(product.productColor)
      setProductColors(product.productColor)
    }

    // ✅ SEAT COLOR (ADAPTER)
    if (product.seatColor?.[0]?.RGB) {
      const rgb = parseRGB(product.seatColor[0].RGB)

      setSeatColor({
        hex: rgbToHex(rgb),
        rgb,
      })
    }

    // pagamentos
    setPaymentConditions(product.paymentCondition || [])

  }, [product])

  type ProductAttribute = {
    name: string
    value: string
  }

  useEffect(() => {
    const last = selectedAttributes[selectedAttributes.length - 1]

    if (last && inputRefs.current[last]) {
      inputRefs.current[last]?.focus()
    }
  }, [selectedAttributes])

  function getLabelById(id: string) {
    return baseAttributes.find(attr => attr.id === id)?.label
  }

  function toggleAttribute(id: string) {
    setSelectedAttributes((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    )
  }

  function handleValueChange(id: string, value: any) {
    setValues((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const formattedAttributes = selectedAttributes.map((attrId) => ({
    name: attrId,
    value: String(values[attrId] ?? ""),
  }))

  const composedObject = {
    name: values.name ?? "",
    type: values.type ?? "",
    description: values.description ?? "",

    attributes: selectedAttributes.map((attr) => ({
      attribute: attr,
      value: values[attr] ?? "",
      label: getLabelById(attr) ?? ""
    })),

    unlockTypes: unlockTypes.map((ut) => ({
      type: ut,
      label: unlockTypeLabels[ut]
    })),

    paymentConditions,

    // 🔴 VOLTA PRA STRING (PADRÃO DO BANCO)
    seatColors: [
      {
        RGB: rgbToString(seatColor.rgb),
      },
    ],

    productColors: productColors.map((color) => ({
      RGB: color.RGB,
      product_color_type: color.product_color_type,
    })),

    imgUrl: "/placeholder.png",
  }

  function copyToClipboard() {
    const text = JSON.stringify(composedObject, null, 2)
    navigator.clipboard.writeText(text)
  }

  async function handleSubmit() {

    const payload = {
      ...composedObject,
    }

    await createProduct(payload)
  }

  return (
    <div style={{ padding: 40, fontFamily: "sans-serif" }}
      className="flex max-w-[1200px] mx-auto overflow-hidden"
    >

      <div className="w-[50%]">
        <h1>Product Creation - Bike Elétrica</h1>

        <h2>Selecione os atributos</h2>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <FormInput
              label="Nome"
              value={values.name}
              onChange={(value) => handleValueChange("name", value)}
            />

            <FormInput
              label="Description"
              value={values.description}
              onChange={(value) => handleValueChange("description", value)}
            />
          </div>

          <SectionTitle name="Tipos de Desbloqueio" />
          <UnlockTypesInput
            value={unlockTypes}
            onChange={setUnlockTypes}
          />

          <div>
            <SectionTitle name="Tipo do Produto" />
            <ProductTypeSelect
              value={values.type ?? ""}
              productTypes={productTypes}
              onChange={(value) => handleValueChange("type", value)}
            />
          </div>

          <div>
            <SectionTitle name="Cores do Produto" />
            <ProductColorsManager
              productColors={productColors}
              setProductColors={setProductColors}
            />
          </div>

          {/* in dev */}
          <div>
            <SectionTitle name="Formas de Pagamento" />
            <PaymentConditionsInput
              value={paymentConditions}
              onChange={setPaymentConditions}
            />
          </div>
          <hr />

          <div>
            <SectionTitle name="Cores do Banco" />
            <ColorSelectInput value={seatColor} onChange={setSeatColor} />
          </div>

        </div>
        <br />

        <SectionTitle name="Atributos Elétricos" />
        <AttributesSection
          baseAttributes={baseAttributes}
          selectedAttributes={selectedAttributes}
          values={values}
          toggleAttribute={toggleAttribute}
          handleValueChange={handleValueChange}
          inputRefs={inputRefs}
        />
        <button onClick={() => {
          handleSubmit()
        }}>create</button>
      </div>


      <div className="">
        <h2>Objeto Final Composto</h2>
        <pre
          style={{
            background: "#111",
            color: "#0f0",
            padding: 20,
            borderRadius: 8,
          }}
        >
          {JSON.stringify(/***composedObjec***/product, null, 2)}
        </pre>
        <button
          onClick={copyToClipboard}
          className="mb-2 px-3 py-1 border border-white rounded"
        >
          Copiar JSON
        </button>
      </div>
    </div>
  )
}