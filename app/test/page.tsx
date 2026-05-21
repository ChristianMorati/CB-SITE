"use client";

import React, { useState, useEffect } from "react";
import { AttributeDefinition } from "../cms/products/create/_Inputs/Attribute";
import { Product } from "../_components/Product/Types";
import { AttributeFieldAdapter } from "./AttributeFieldAdapter";
import { AttibuteDefinition, ProductAttributes, ProductAttributesToInsert } from ".";

interface Props {
    product: Product
    productAttributesToInsert: ProductAttributesToInsert[]
    setProductAttributesToInsert: React.Dispatch<React.SetStateAction<ProductAttributesToInsert[]>>
}

export const EditAttributesForm: React.FC<Props> = ({ 
    product, 
    productAttributesToInsert, 
    setProductAttributesToInsert 
}) => {
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
        const list = getAttributesDefinitionsList().catch(list => list) // what?
    }, [])

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
        const formattedAttributes = attributesDefinitionsBaseList.map((definition) => {
            let existing;
            if (product?.id) {
                existing = product.productAttributes.find(
                    (attr) => attr.attributeDefinition.id === definition.id
                );
            }

            let value: any = existing?.value || "";

            if (value === undefined || value === null || value === "") {
                switch (definition.type) {
                    case "boolean":
                        value = false;
                        break;
                    case "number":
                        value = 0;
                        break;
                    case "color-picker":
                        value = "#000000";
                        break;
                    default:
                        value = "";
                }
            }

            return {
                attributeDefinitionId: definition.id,
                attributeDefinitionType: definition.type,
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
                p-5 flex gap-4
            ">
                {/* <div className="w-[50vw] overflow-x-auto">
                    <pre>
                        {JSON.stringify(productAttributesToInsert, null, 2)}
                    </pre>
                </div> */}
                <hr />

                {/* DEBUG */}
                <div className="w-[50vw]">
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
                                            type={attr.type}
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
                </div>

                {error && (
                    <>Error</>
                )}
            </div>

            <pre>
                {JSON.stringify(productAttributesToInsert, null, 2)}
            </pre>
        </>
    )
}