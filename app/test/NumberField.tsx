import { BaseFieldProps } from "./FieldsTypes";

export function NumberField({ label, value, onChange }: BaseFieldProps) {
    return (
        <div>
            <label className="block mb-1">{label}</label>
            <input
                type="number"
                value={Number(value) || "-"}
                onChange={(e) => onChange(e.target.value)}
                className="border p-2 w-full rounded"
            />
        </div>
    );
}
