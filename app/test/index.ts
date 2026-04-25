import { supabase } from "@/lib/supabase";
import { AttributeDefinition, AttributeType } from "../cms/products/create/_Inputs/Attribute";

export type ProductAttributesToInsert = {
    attributeDefinitionId: string
    attributeDefinitionType?: AttributeType | AttributeValue
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

type AttributeValue = boolean | number | string | AttributeType | undefined;
const validTypes: AttributeType[] = ["number", "boolean", "select-list", "color-picker"];

export class ProductAttributes {
    public static validateProductAttributes(
        payload: unknown
    ): ProductAttributesToInsert[] {
        if (!Array.isArray(payload)) {
            throw new Error("Invalid payload: expected an array of attributes.");
        }

        return payload.map((item, index) => {
            if (!item || typeof item !== "object" || Array.isArray(item)) {
                throw new Error(
                    `Invalid attribute at [${index}]: expected an object.`
                );
            }

            const attribute = item as ProductAttributesToInsert;

            if (!validTypes.includes(attribute.attributeDefinitionType as AttributeType)) {
                throw new Error(
                    `Invalid attributeDefinitionType at [${index}]: expected number | boolean | select-list | color-picker. ${attribute.attributeDefinitionType}`
                );
            }

            ProductAttributes.parseAttributeValueOrThrow(
                attribute.value,
                attribute.attributeDefinitionType,
                `[${index}]`
            );

            return attribute;
        });
    }

    public static parseAttributeValueOrThrow(
        value: unknown,
        type: AttributeType,
        path = ""
    ): AttributeValue {
        const location = path ? ` at ${path}` : "";

        if (type === "boolean") {
            if (typeof value === "boolean") return value;
            if (value === "true" || value === 1) return true;
            if (value === "false" || value === 0) return false;

            throw new Error(
                `Invalid boolean value${location}: expected true/false.`
            );
        }

        if (type === "number") {
            if (typeof value === "string" && value.trim() !== "") {
                const parsed = Number(value);

                if (Number.isFinite(parsed)) {
                    this.checkNumberIfIsOutOfRange(parsed, type);
                    return parsed;
                }
            }

            if (typeof value === "number" && Number.isFinite(value)) {
                this.checkNumberIfIsOutOfRange(value, type);
                return value;
            }

            throw new Error(
                `Invalid number value${location}: expected a numeric value.`
            );
        }

        if (type === "color-picker") {
            if (typeof value === "string") {
                const isValidHex = /^#([0-9A-Fa-f]{3}){1,2}$/.test(value);
                if (isValidHex) return value;
            }

            throw new Error(
                `Invalid color value${location}: expected HEX color.`
            );
        }

        if (type === "select-list") {
            if (typeof value === "string" && value.trim().length > 0) {
                return value;
            }

            throw new Error(
                `Invalid select-list value${location}: expected something value.`
            );
        }

        throw new Error(
            `Invalid string value${location}: expected a string.`
        );
    }

    private static checkNumberIfIsOutOfRange(
        value: AttributeValue,
        attributeDefinitionType: AttributeType
    ): void {
        if (attributeDefinitionType === "number") {
            if (typeof value === "number") {
                const isOutOfRange = value < 0 || value > 100000;
                if (isOutOfRange) {
                    throw new Error(`Invalid number value;`);
                }
            }
        }
    }
}

type AttributeDefinitionMap = Map<string, AttributeDefinition>;

export class Product extends ProductAttributes {
    constructor() {
        super();
    }

    private validateAttributesAgainstDefinitions(
        attributes: ProductAttributesToInsert[],
        definitions: AttributeDefinition[]
    ): void {
        const definitionMap: AttributeDefinitionMap = new Map(
            definitions.map((d) => [d.id, d])
        );

        for (const attr of attributes) {
            const definition = definitionMap.get(attr.attributeDefinitionId);

            if (!definition) {
                throw new Error(
                    `AttributeDefinition not found for id: ${attr.attributeDefinitionId}`
                );
            }

            if (
                attr.attributeDefinitionType &&
                attr.attributeDefinitionType !== definition.type
            ) {
                throw new Error(
                    `Type mismatch for attribute ${attr.attributeDefinitionId}: expected ${definition.type}, got ${attr.attributeDefinitionType}`
                );
            }

            ProductAttributes.parseAttributeValueOrThrow(
                attr.value,
                definition.type,
                `attributeId=${attr.attributeDefinitionId}`
            );
        }
    }

    async insertProductAttributes(
        attributes: ProductAttributesToInsert[],
        definitions: AttributeDefinition[]
    ) {
        this.validateAttributesAgainstDefinitions(attributes, definitions);

        const { data, error } = await supabase
            .from("productAttribute")
            .insert(attributes)
            .select();

        if (error) {
            throw new Error(error.message);
        }

        if (!data || data.length !== attributes.length) {
            throw new Error("Mismatch between inserted and returned data");
        }

        return data;
    }
}
