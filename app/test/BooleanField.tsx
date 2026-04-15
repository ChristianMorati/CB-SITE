import { BaseFieldProps } from "./FieldsTypes";
import { useId } from "react";

export function BooleanField({ label, value, onChange }: BaseFieldProps) {
    const id = useId();

    const checked = value === true || value === "true";

    return (
        <label
            htmlFor={id}
            className="flex items-center gap-3 cursor-pointer select-none"
        >
            <input
                id={id}
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(String(e.target.checked))}
                className="w-6 h-6 cursor-pointer hover:border-b-2 border-amber-100"
            />

            <span className="text-sm cursor-pointer hover:border-b-2 border-amber-100">{label}</span>
        </label>
    );
}