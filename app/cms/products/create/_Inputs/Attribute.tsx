'use client'

import { useMemo } from "react"

export type AttributeDefinition = {
  id: string
  label: string
  type: "number" | "boolean" | "string" | "select-list" | "color-picker"
  metadata: Record<string, any> | null;
}

type Props = {
  definitions: AttributeDefinition[]
  value: Record<string, any>
  onChange: (value: Record<string, any>) => void
  onSubmit?: () => void
}

export default function DynamicAttributesForm({
  definitions,
  value,
  onChange,
  onSubmit
}: Props) {

  function handleChange(key: string, val: any) {
    onChange({
      ...value,
      [key]: val
    })
  }

  return (
    <div style={{ display: "grid", gap: 12 }} className="text-black bg-white">

      {definitions.map((attr) => {
        const currentValue = value[attr.id] ?? ""

        return (
          <div key={attr.id}>
            <label>{attr.label}</label>

            {/* NUMBER */}
            {attr.type === "number" && (
              <input
                type="text"
                value={currentValue}
                onChange={(e) =>
                  handleChange(attr.id, Number(e.target.value))
                }
              />
            )}

            {/* STRING */}
            {attr.type === "string" && (
              <input
                type="text"
                value={currentValue}
                onChange={(e) =>
                  handleChange(attr.id, e.target.value)
                }
              />
            )}

            {/* BOOLEAN */}
            {attr.type === "boolean" && (
              <select
                value={currentValue === "" ? "" : String(currentValue)}
                onChange={(e) =>
                  handleChange(attr.id, e.target.value === "true")
                }
              >
                <option value="">Selecione</option>
                <option value="true">Sim</option>
                <option value="false">Não</option>
              </select>
            )}
          </div>
        )
      })}

      {onSubmit && (
        <button onClick={onSubmit}>
          Salvar atributos
        </button>
      )}

    </div>
  )
}