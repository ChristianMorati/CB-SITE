import { BaseFieldProps } from "./FieldsTypes";

export function NumberField({ label, value, onChange }: BaseFieldProps) {
    return (
        <div>
            <label className="block mb-1">{label}</label>
            <input
                value={Number(value) || 0}
                onChange={(e) => onChange(e.target.value)}
                className="border p-2 w-full rounded"
            />
        </div>
    );
}
