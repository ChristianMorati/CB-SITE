'use client'

export enum UnlockType {
    WITHOUT = "WITHOUT",
    NFC = "NFC",
    KEY = "KEY",
    BUTTON = "BUTTON",
}

type UnlockTypesInputProps = {
    value: UnlockType[]
    onChange: (value: UnlockType[]) => void
}

export const unlockTypeLabels: Record<UnlockType, string> = {
    [UnlockType.WITHOUT]: "Nenhum",
    [UnlockType.NFC]: "NFC",
    [UnlockType.KEY]: "Chave",
    [UnlockType.BUTTON]: "Botão",
}

export function UnlockTypesInput({ value, onChange }: UnlockTypesInputProps) {
    const allTypes = Object.values(UnlockType)

    const unlockTypeList = Object.values(UnlockType).map((type) => ({
        type,
        label: unlockTypeLabels[type],
    }))

    function toggle(type: UnlockType) {
        if (type === UnlockType.WITHOUT) {
            onChange([UnlockType.WITHOUT])
            return
        }

        let newValues = value.includes(type)
            ? value.filter((v) => v !== type)
            : [...value.filter(v => v !== UnlockType.WITHOUT), type]

        onChange(newValues)
    }

    function selectAll() {
        onChange(allTypes)
    }

    function clearAll() {
        onChange([])
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {unlockTypeList.map((item) => (
                <label key={item.type} style={{ display: "flex", gap: 6 }}>
                    <input
                        type="checkbox"
                        checked={value.includes(item.type)}
                        onChange={() => toggle(item.type)}
                    />
                    {item.label}
                </label>
            ))}
            <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                <button type="button" onClick={selectAll}>
                    Selecionar todos
                </button>

                <button type="button" onClick={clearAll}>
                    Limpar
                </button>
            </div>
        </div>
    )
}