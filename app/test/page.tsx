"use client";

import { useState, useEffect } from "react";
import { AttributeDefinition } from "../cms/products/create/_Inputs/Attribute";
import { Product } from "../_components/Product/Types";
import { AttributeFieldAdapter } from "./AttributeFieldAdapter";
import { AttibuteDefinition, ProductAttributes, ProductAttributesToInsert } from ".";

interface Props {
    product: Product
}

export default function EditAttributesForm({ product }: Props) {
    const [error, setError] = useState("")

    // Attributes Change
    const [attributesDefinitionsBaseListIsLoading,
        setAttributesDefinitionsBaseListIsLoading
    ] = useState<boolean>(true)

    async function getAttributesDefinitionsList() {
        setAttributesDefinitionsBaseListIsLoading(true);

        try {
            const data = await AttibuteDefinition.fetchAttributeDefinitions();

            setAttributesDefinitionsBaseList(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setAttributesDefinitionsBaseListIsLoading(false);
        }
    }

    useEffect(() => {
        const list = getAttributesDefinitionsList().catch(list => list)
    }, [])

    const [
        productAttributesToInsert,
        setProductAttributesToInsert
    ] = useState<ProductAttributesToInsert[]>([])

    type AttributesDefinitionsBaseList = AttributeDefinition

    const [
        attributesDefinitionsBaseList,
        setAttributesDefinitionsBaseList
    ] = useState<AttributesDefinitionsBaseList[]>([]);

    function handleProductAttributeToInsertChange({
        attributeDefinitionId,
        attributeDefinitionType,
        value,
    }: ProductAttributesToInsert) {
        setProductAttributesToInsert((prev) => {
            const exists = prev.some(
                item => item.attributeDefinitionId === attributeDefinitionId
            );

            if (exists) {
                return prev.map(item =>
                    item.attributeDefinitionId === attributeDefinitionId
                        ? { ...item, value }
                        : item
                );
            }

            return [
                ...prev,
                {
                    attributeDefinitionId,
                    attributeDefinitionType,
                    value,
                },
            ];
        });
    }

    useEffect(() => {
        if (!product) return;

        const formattedAttributes = attributesDefinitionsBaseList.map((definition) => {
            const existing = product.productAttributes.find(
                (attr) => attr.attributeDefinition.id === definition.id
            );

            let value: any = existing?.value;

            if (value === undefined || value === null || value === "") {
                switch (definition.type) {
                    case "boolean":
                        value = false;
                        break;
                    case "number":
                        value = 0;
                        break;
                    case "color-picker":
                        value = "#2318798";
                        break;
                    default:
                        value = "";
                }
            }

            return {
                attributeDefinitionId: definition.id,
                productId: product.id,
                value,
            };
        });

        setProductAttributesToInsert(formattedAttributes);
    }, [product, attributesDefinitionsBaseList]);

    // *** Attributes Change End ***
    return (
        <>
            <div className="
                max-w-[1200px] 
                mx-auto
                p-5 flex flex-col gap-4
            ">
                <div>
                    <pre>
                        {JSON.stringify(productAttributesToInsert, null, 2)}
                    </pre>
                </div>
                <hr />

                {/* DEBUG */}

                {attributesDefinitionsBaseListIsLoading ? (
                    <>
                        <p>loading...</p>
                    </>
                ) : (
                    <>
                        {attributesDefinitionsBaseList.map((attr) => {
                            const existingAttribute = productAttributesToInsert.find(
                                attribute => attribute.attributeDefinitionId === attr.id
                            );

                            return (
                                <div className="" key={attr.id}>
                                    <AttributeFieldAdapter
                                        attribute={attr}
                                        value={existingAttribute?.value ?? ""}
                                        onChange={(value) =>
                                            handleProductAttributeToInsertChange({
                                                attributeDefinitionId: attr.id,
                                                attributeDefinitionType: attr.type,
                                                value,
                                            })
                                        }
                                    />
                                </div>
                            );
                        })}</>
                )}

                {error && (
                    <>Error</>
                )}

                <button className="
                    bg-sky-500 text-white
                    px-4 py-2
                "
                    onClick={() => {
                        ProductAttributes.validateProductAttributes(productAttributesToInsert)
                    }}
                >Insert Attrs</button>

            </div>
        </>
    )
}