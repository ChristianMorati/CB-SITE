import { BooleanField } from "./BooleanField";
import { ColorField } from "./ColorField";
import { AttributeFieldProps } from "./FieldsTypes";
import { NumberField } from "./NumberField";
import { SelectField } from "./SelectField";

type Metadata = {
    options?: {
        label: string;
        value: string;
    }[];
};

export function normalizeMetadata(metadata: unknown): Metadata | null {
    if (!metadata) return null;

    // já é objeto
    if (typeof metadata === "object") {
        return metadata as Metadata;
    }

    // é string → tenta parsear
    if (typeof metadata === "string") {
        try {
            return JSON.parse(metadata) as Metadata;
        } catch (error) {
            console.error("Erro ao fazer parse do metadata:", error);
            return null;
        }
    }

    return null;
}

export function AttributeFieldAdapter({
    attribute,
    value,
    onChange,
}: AttributeFieldProps) {
    switch (attribute.type) {
        case "number":
            return (
                <NumberField label={attribute.label} value={value} onChange={onChange} />
            );

        case "boolean":
            return (
                <BooleanField label={attribute.label} value={value} onChange={onChange} />
            );

        case "color-picker":
            return (
                <ColorField label={attribute.label} value={value} onChange={onChange} />
            );

        case "select-list": {
            const metadata = normalizeMetadata(
                attribute.metadata ?? (attribute as any).matadata
            );

            const options = metadata?.options ?? [];

            return (
                <SelectField
                    label={attribute.label}
                    value={value ?? ""}
                    options={options}
                    onChange={onChange}
                />
            );
        }

        default:
            return null;
    }
}