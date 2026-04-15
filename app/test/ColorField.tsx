import { BaseFieldProps } from "./FieldsTypes";

export function ColorField({ label, value, onChange }: BaseFieldProps) {
    return (
        <div>
            <label className="block mb-1">{label}</label>
            <input
                type="color"
                value={value || "#000000"}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}