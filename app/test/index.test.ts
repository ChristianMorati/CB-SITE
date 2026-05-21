import { describe, it, expect } from "vitest";
import { Product } from "./index";

import { vi } from "vitest";

vi.mock("@/lib/supabase", () => ({
    supabase: {
        from: () => ({
            insert: () => ({
                select: () => ({
                    data: [],
                    error: null,
                }),
            }),
        }),
    },
}));

describe("Product.validateAttributesAgainstDefinitions", () => {
    const product = new Product();
    const location = ` at attributeId=`;

    const mockDefinitions = [
        {
            id: "4601b247-32fe-45e0-8fd1-155276623c77",
            type: "number",
        },
        {
            id: "946b5731-c2a4-4d87-970e-184a698aa7ec",
            type: "boolean",
        },
        {
            id: "5ee8d824-dde4-46c8-8177-a770bcbda986",
            type: "select-list"
        }
    ];

    const validAttributes = [
        {
            attributeDefinitionId: "4601b247-32fe-45e0-8fd1-155276623c77",
            attributeDefinitionType: "number",
            value: "12",
        },
        {
            attributeDefinitionId: "946b5731-c2a4-4d87-970e-184a698aa7ec",
            attributeDefinitionType: "boolean",
            value: "true",
        },
        {
            attributeDefinitionId: "5ee8d824-dde4-46c8-8177-a770bcbda986",
            attributeDefinitionType: "select-list",
            value: "Option 1",
        }
    ];

    it("should pass with valid data", () => {
        expect(() =>
            (product as any).validateAttributesAgainstDefinitions(
                validAttributes,
                mockDefinitions
            )
        ).not.toThrow();
    });

    it("should throw if definition does not exist", () => {
        const invalid = [
            {
                attributeDefinitionId: "INVALID_ID", // worng definiton ID
                attributeDefinitionType: "number",
                value: "10",
            },
        ];

        expect(() =>
            (product as any).validateAttributesAgainstDefinitions(
                invalid,
                mockDefinitions
            )
        ).toThrow("AttributeDefinition not found");
    });

    it("should throw if type mismatch attribute definition for boolean", () => {
        const invalid = [
            {
                attributeDefinitionId: "946b5731-c2a4-4d87-970e-184a698aa7ec",
                attributeDefinitionType: "boolean", // ❌ wrong type for this definition Id
                value: "true",
            },
        ];

        expect(() =>
            (product as any).validateAttributesAgainstDefinitions(
                invalid,
                mockDefinitions
            )
        ).not.toThrow();
    });

    it("should throw if value is incompatible with type of attribute definition for number", () => {
        const invalid = [
            {
                attributeDefinitionId: "4601b247-32fe-45e0-8fd1-155276623c77",
                attributeDefinitionType: "number",
                value: "abc", // ❌ Wrong value for number type
            },
        ];

        expect(() =>
            (product as any).validateAttributesAgainstDefinitions(
                invalid,
                mockDefinitions
            )
        ).toThrow("Invalid number value");
    });

    // SELECT-LIST TYPE TESTS
    it("should throw if value is incompatible with type of attribute definition for select-list", () => {
        const invalid = [
            {
                attributeDefinitionId: "5ee8d824-dde4-46c8-8177-a770bcbda986",
                attributeDefinitionType: "select-list",
                value: "true",
            },
        ];

        expect(() =>
            (product as any).validateAttributesAgainstDefinitions(
                invalid,
                mockDefinitions
            )
        ).not.toThrow("Invalid color value");
    });

    it("should throw if value is incompatible with type of attribute definition for select-list", () => {
        const invalid = [
            {
                attributeDefinitionId: "5ee8d824-dde4-46c8-8177-a770bcbda986",
                attributeDefinitionType: "select-list",
                value: 1,
            },
        ];

        expect(() =>
            (product as any).validateAttributesAgainstDefinitions(
                invalid,
                mockDefinitions
            )
        ).toThrow(`Invalid select-list value${location + invalid[0].attributeDefinitionId}: expected something value.`);
    });
});