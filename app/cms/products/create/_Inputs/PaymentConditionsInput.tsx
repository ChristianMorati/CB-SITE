'use client'

export type PaymentConditionInput = {
  type: string
  label: string
  numberOfInstallments: number
  installmentsValue: number
  value: number
  descountPercent: number
}

type Props = {
  value: PaymentConditionInput[]
  onChange: (value: PaymentConditionInput[]) => void
}

const paymentTypes = [
  { type: "instant-payment", label: "PIX - Dinheiro" },
  { type: "credit-card", label: "Cartão de Crédito" },
]

export function PaymentConditionsInput({ value, onChange }: Props) {

  function getSelected(type: string) {
    return value.find(v => v.type === type)
  }

  function calculateTotal(
    installments: number,
    installmentValue: number,
    discount?: number
  ) {
    const total = installments * installmentValue
    return total
  }

  function toggle(type: string, label: string) {
    const exists = getSelected(type)

    if (exists) {
      onChange(value.filter(v => v.type !== type))
      return
    }

    const newCondition: PaymentConditionInput = {
      type,
      label,
      numberOfInstallments: 1,
      installmentsValue: 0,
      value: 0,
      descountPercent: 0,
    }

    onChange([...value, newCondition])
  }

  function update(
    type: string,
    field: keyof PaymentConditionInput,
    newValue: number
  ) {
    const updated = value.map(item => {
      if (item.type !== type) return item

      const next = { ...item, [field]: newValue }

      // 🔵 CARTÃO → usuário informa TOTAL
      if (type === "credit-card") {
        const installments = next.numberOfInstallments || 1

        if (field === "value" || field === "numberOfInstallments") {
          next.installmentsValue = next.value / installments
        }
      }
      // 🟢 PIX (ou outros) → cálculo normal
      else {
        const total = calculateTotal(
          next.numberOfInstallments,
          next.installmentsValue,
          next.descountPercent
        )

        next.value = total
      }

      return next
    })

    onChange(updated)
  }

  return (
    <div className="flex flex-col gap-3">

      {/* Header */}
      <div className="grid grid-cols-[40px_160px_120px_150px_150px_120px] font-semibold">
        <div></div>
        <div>Forma</div>
        <div>Parcelas</div>
        <div>Valor</div>
        <div>Total</div>
        <div>Desconto %</div>
      </div>

      {paymentTypes.map(({ type, label }) => {

        const selected = getSelected(type)

        return (
          <div
            key={type}
            className="grid grid-cols-[40px_160px_120px_150px_150px_120px] gap-2 items-center border p-2 rounded"
          >

            {/* Checkbox */}
            <input
              type="checkbox"
              checked={!!selected}
              onChange={() => toggle(type, label)}
            />

            <span>{label}</span>

            {selected ? (
              <>
                {/* Parcelas */}
                <input
                  type="number"
                  min={1}
                  value={selected.numberOfInstallments}
                  className="border px-1"
                  onChange={(e) =>
                    update(type, "numberOfInstallments", Number(e.target.value))
                  }
                />

                {/* INPUT DINÂMICO */}
                {type === "credit-card" ? (
                  // 🔵 CARTÃO → usuário informa TOTAL
                  <input
                    type="number"
                    min={0}
                    value={selected.value}
                    className="border px-1"
                    onChange={(e) =>
                      update(type, "value", Number(e.target.value))
                    }
                    placeholder="Valor total"
                  />
                ) : (
                  // 🟢 PIX → usuário informa VALOR PARCELA
                  <input
                    type="number"
                    min={0}
                    value={selected.installmentsValue}
                    className="border px-1"
                    onChange={(e) =>
                      update(type, "installmentsValue", Number(e.target.value))
                    }
                    placeholder="Valor parcela"
                  />
                )}

                {/* TOTAL */}
                <span>
                  R$ {selected.value.toFixed(2)}
                </span>

                {/* DESCONTO */}
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={selected.descountPercent}
                  className="border px-1"
                  onChange={(e) =>
                    update(type, "descountPercent", Number(e.target.value))
                  }
                />

                {/* 💡 EXTRA: mostrar valor da parcela no cartão */}
                {type === "credit-card" && (
                  <span className="text-xs text-gray-500 col-span-6">
                    Parcela: R$ {selected.installmentsValue.toFixed(2)}
                  </span>
                )}
              </>
            ) : (
              <>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </>
            )}

          </div>
        )
      })}

      {/* DEBUG */}
      <pre className="bg-black text-green-400 p-3 rounded">
        {JSON.stringify(value, null, 2)}
      </pre>

    </div>
  )
}