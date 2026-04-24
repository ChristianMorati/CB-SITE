import { supabase } from "@/lib/supabase";

export type ProductAttributesToInsert = {
    attributeDefinitionId: string
    attributeDefinitionType?: string
    value: any
    productId?: string
}

export class AttibuteDefinition {
    constructor() { }

    static async fetchAttributeDefinitions() {
        const { data, error } = await supabase
            .from("attributeDefinition")
            .select("*")
            .order("type", { ascending: false });

        if (error) {
            throw new Error(error.message);
        }

        return data;
    }
}

type AttributeType = string | undefined;
type AttributeValue = boolean | number | string;

export class ProductAttributes {
    static validateAttributeValue(
        value: unknown,
        attributeDefinitionType: AttributeType
    ): AttributeValue {
        switch (attributeDefinitionType) {
            case "boolean": {
                if (typeof value === "boolean") return value;

                if (value === "true" || value === 1) return true;
                if (value === "false" || value === 0) return false;

                return false;
            }

            case "number": {
                const parsed = Number(value);
                return !isNaN(parsed) ? parsed : 0;
            }

            case "color-picker": {
                if (typeof value === "string") {
                    const isValidHex = /^#([0-9A-Fa-f]{3}){1,2}$/.test(value);
                    if (isValidHex) return value;
                }
                return "#000000";
            }

            default: {
                if (typeof value === "string") return value;
                return "";
            }
        }
    }
}

class Product {
    constructor() {

    }

    insertProductAttributes(attributes: ProductAttributesToInsert[]) {


        return supabase.from("productAttribute").insert(attributes)
    }
}