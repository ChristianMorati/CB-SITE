type Option = {
    label: string;
    value: string;
};

type SelectProps = {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: Option[];
};

export function SelectField({
    label,
    value,
    onChange,
    options,
}: SelectProps) {
    return (
        <div className="flex flex-col gap-2">
            <label>{label}</label>

            <select
                value={value ?? ""}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="">Selecione</option>

                {Array.isArray(options) &&
                    options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
            </select>
        </div>
    );
}