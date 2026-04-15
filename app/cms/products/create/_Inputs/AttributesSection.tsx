'use client'

type Attribute = {
    id: string
    label: string
    type: "boolean" | "number" | "string" | "select-list"
    matadata?: {
        options?: (string | { label: string; value: any })[]
    }
}

type Props = {
    baseAttributes: Attribute[]
    selectedAttributes: string[]
    values: Record<string, any>
    toggleAttribute: (id: string) => void
    handleValueChange: (id: string, value: any, label?: string) => void
    inputRefs: React.MutableRefObject<
        Record<string, HTMLInputElement | HTMLSelectElement | null>
    >
}

export default function AttributesSection({
    baseAttributes,
    selectedAttributes,
    values,
    toggleAttribute,
    handleValueChange,
    inputRefs,
}: Props) {

    // 🔥 normaliza qualquer formato de JSONB
    function getOptions(attr: Attribute) {
        const metadata = attr.matadata
        if (!metadata?.options) return []

        return metadata.options.map((item) => {
            if (typeof item === "string") {
                return {
                    label: item,
                    value: item,
                }
            }

            return {
                label: item.label ?? String(item.value),
                value: item.value ?? item.label,
            }
        })
    }

    return (
        <div>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {baseAttributes.map((attr) => (
                    <li key={attr.id} style={{ marginBottom: 15 }}>

                        {/* CHECKBOX */}
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedAttributes.includes(attr.id)}
                                onChange={() => toggleAttribute(attr.id)}
                            />{" "}
                            {attr.label}
                        </label>

                        {/* INPUT DINÂMICO */}
                        {selectedAttributes.includes(attr.id) && (
                            <div style={{ marginTop: 8 }}>

                                {/* BOOLEAN */}
                                {attr.type === "boolean" && (
                                    <select
                                        ref={(el) => {
                                            inputRefs.current[attr.id] = el
                                        }}
                                        value={String(values[attr.id] ?? false)}
                                        onChange={(e) =>
                                            handleValueChange(
                                                attr.id,
                                                e.target.value === "true",
                                                attr.label
                                            )
                                        }
                                    >
                                        <option value="true">Sim</option>
                                        <option value="false">Não</option>
                                    </select>
                                )}

                                {/* NUMBER */}
                                {attr.type === "number" && (
                                    <input
                                        ref={(el) => {
                                            inputRefs.current[attr.id] = el
                                        }}
                                        type="number"
                                        placeholder="Digite o valor"
                                        value={values[attr.id] ?? ""}
                                        onChange={(e) =>
                                            handleValueChange(
                                                attr.id,
                                                e.target.value === ""
                                                    ? ""
                                                    : Number(e.target.value),
                                                attr.label
                                            )
                                        }
                                    />
                                )}

                                {/* STRING */}
                                {attr.type === "string" && (
                                    <input
                                        ref={(el) => {
                                            inputRefs.current[attr.id] = el
                                        }}
                                        type="text"
                                        placeholder="Digite o valor"
                                        value={values[attr.id] ?? ""}
                                        onChange={(e) =>
                                            handleValueChange(
                                                attr.id,
                                                e.target.value,
                                                attr.label
                                            )
                                        }
                                    />
                                )}

                                {/* SELECT LIST */}
                                {attr.type === "select-list" && (
                                    <select
                                        ref={(el) => {
                                            inputRefs.current[attr.id] = el
                                        }}
                                        value={
                                            values[attr.id] != null
                                                ? String(values[attr.id])
                                                : ""
                                        }
                                        onChange={(e) =>
                                            handleValueChange(
                                                attr.id,
                                                e.target.value,
                                                attr.label
                                            )
                                        }
                                    >
                                        <option value="">Selecione</option>

                                        {getOptions(attr).map((item) => (
                                            <option
                                                key={String(item.value)}
                                                value={String(item.value)}
                                            >
                                                {item.label}
                                            </option>
                                        ))}
                                    </select>
                                )}

                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}