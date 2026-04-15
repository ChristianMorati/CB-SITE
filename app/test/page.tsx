"use client";

import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";
import { AttributeDefinition } from "../cms/products/create/_Inputs/Attribute";
import { Product } from "../_components/Product/Types";
import { AttributeFieldAdapter } from "./AttributeFieldAdapter";

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
        const {
            data: attributesDefinitionsBaseList,
            error: getAttributesDefinitionsError
        } = await supabase
            .from("attributeDefinition")
            .select("*")

        if (getAttributesDefinitionsError) {
            setAttributesDefinitionsBaseListIsLoading(false)
            setError(JSON.stringify(getAttributesDefinitionsError))
            return
        }

        setAttributesDefinitionsBaseListIsLoading(false)
        setAttributesDefinitionsBaseList(attributesDefinitionsBaseList)
        return attributesDefinitionsBaseList
    }

    useEffect(() => {
        const list = getAttributesDefinitionsList().catch(list => list)
    }, [])

    type ProductAttributesToInsert = {
        attributeDefinitionId: string
        value: any
        productId?: string
    }

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

            let value;

            if (existing) {
                value = existing.value;
            } else {
                // fill in with default values
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
                {/* DEBUG */}
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
                                        value,
                                    })
                                }
                            />
                        </div>
                    );
                })}

                <hr />
                <div>
                    <pre>
                        {/* {JSON.stringify(productAttributesToInsert, null, 2)} */}
                    </pre>
                </div>

                {error && (
                    <>Error</>
                )}
            </div>
        </>
    )
}