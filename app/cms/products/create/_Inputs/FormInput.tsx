type FormInputProps = {
    label: string
    value?: string
    onChange: (value: string) => void
    type?: React.HTMLInputTypeAttribute
}

export function FormInput({
    label,
    value,
    onChange,
    type = "text",
}: FormInputProps) {
    return (
        <div className="flex flex-col gap-1">
            <label>{label}</label>

            <input
                className="border border-white"
                type={type}
                value={value ?? ""}
                onChange={(e) => onChange(e.target.value.toUpperCase())}
            />
        </div>
    )
}