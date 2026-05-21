"use client"

import { CreateProductPayload } from "@/app/api/_types/CreateProductPayload";
import { supabase } from "@/lib/supabase";
import { useRef, useState, useEffect } from "react";
import { ColorSelectInput } from "./_Inputs/ColorSelectInput";
import { PaymentConditionInput, PaymentConditionsInput } from "./_Inputs/PaymentConditionsInput";
import ProductColorsManager from "./_Inputs/ProductColorsManager";
import ProductTypeSelect from "./_Inputs/ProductTypeSelect";
import { SectionTitle } from "./_Inputs/SectionLabel";
import { UnlockType, unlockTypeLabels, UnlockTypesInput } from "./_Inputs/UnlockTypesInput";
import { ProductColorItem, createProduct, productTypes } from "./page";
import { FormInput } from "./_Inputs/FormInput";
import { EditAttributesForm } from "@/app/test/page";
import { ProductAttributes, ProductAttributesToInsert } from "@/app/test";

function parseRGB(rgbString: string) {
    const [r, g, b] = rgbString.split(",").map(Number)
    return { r, g, b }
}

function rgbToString(rgb: { r: number; g: number; b: number }) {
    return `${rgb.r},${rgb.g},${rgb.b}`
}

function rgbToHex({ r, g, b }: { r: number; g: number; b: number }) {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b)
        .toString(16)
        .slice(1)}`
}

type AttributeType = "number" | "boolean" | "string" | "select-list"

type SelectList = {
    option: string
}

type ProductColorType = "predominant" | "assistant"

type ProductColor = {
    hex: string
    rgb: { r: number; g: number; b: number }
    type: ProductColorType
}

interface BaseAttribute {
    id: string
    label: string
    type: AttributeType
    data?: SelectList[]
}

type SeatColor = {
    hex: string
    rgb: { r: number; g: number; b: number }
}

type CreateOrUpdateProductProps = {
    product?: CreateProductPayload
}

type ProductFormValues = {
    id?: string
    name: string
    description: string
    type: string
}

export function CreateOrUpdateProduct({
    product
}: CreateOrUpdateProductProps) {
    const inputRefs = useRef<Record<string, HTMLInputElement | HTMLSelectElement | null>>({})

    const [productForm, setProductForm] = useState<ProductFormValues>({
        id: product?.id,
        name: product?.name ?? "",
        description: product?.description ?? "",
        type: product?.type ?? "",
    })

    const [selectedAttributes, setSelectedAttributes] = useState<string[]>([])

    const [unlockTypes, setUnlockTypes] = useState<UnlockType[]>(() => {
        if (!product?.productUnlockType) return []

        return product.productUnlockType.map((item) => {
            return item.unlockType.type as UnlockType
        })
    })

    const [paymentConditions, setPaymentConditions] = useState<PaymentConditionInput[]>(product?.paymentCondition || [])

    const [
        productAttributesToInsert,
        setProductAttributesToInsert
    ] = useState<ProductAttributesToInsert[]>([])

    const [productColors, setProductColors] = useState<ProductColorItem[]>(
        product?.productColor ?? [
            {
                RGB: "0, 0, 0",
                product_color_type: "predominant",
            },
        ]
    )

    const [seatColor, setSeatColor] = useState<SeatColor>(
        () => {
            if (product?.seatColor?.[0]?.RGB) {
                const rgb = parseRGB(product?.seatColor[0].RGB)

                return {
                    hex: rgbToHex(rgb),
                    rgb,
                }
            }

            return {
                hex: "#ff0000",
                rgb: { r: 255, g: 0, b: 0 },
            }
        });

    const [definitions, setDefinitions] = useState<any>([])
    const [productAttributes, setProductAttributes] = useState<Record<string, any>>({})

    useEffect(() => {
        if (!product) return

        // atributos
        if (!product?.attribute) return

        const selected: string[] = []
        const valuesMap: Record<string, any> = {}

        product.attribute.forEach((attr: any) => {
            selected.push(attr.name)

            // tenta converter automaticamente
            if (attr.value === "true" || attr.value === "false") {
                valuesMap[attr.name] = attr.value === "true"
            } else if (!isNaN(Number(attr.value))) {
                valuesMap[attr.name] = Number(attr.value)
            } else {
                valuesMap[attr.name] = attr.value
            }
        })

        setSelectedAttributes(selected)
    }, [product])

    useEffect(() => {
        if (!product) return;
        const last = selectedAttributes[selectedAttributes.length - 1]

        if (last && inputRefs.current[last]) {
            inputRefs.current[last]?.focus()
        }
    }, [selectedAttributes])

    const composedObject = {
        name: productForm.name ?? "",
        type: productForm.type ?? "",
        description: productForm.description ?? "",

        attributes: productAttributes,

        unlockTypes: unlockTypes.map((ut) => ({
            type: ut,
            label: unlockTypeLabels[ut]
        })),

        paymentConditions,

        // 🔴 VOLTA PRA STRING (PADRÃO DO BANCO)
        seatColors: [
            {
                RGB: rgbToString(seatColor.rgb),
            },
        ],

        productColors: productColors.map((color) => ({
            RGB: color.RGB,
            product_color_type: color.product_color_type,
        })),

        imgUrl: "/placeholder.png",
    }

    function copyToClipboard() {
        const text = JSON.stringify(composedObject, null, 2)
        navigator.clipboard.writeText(text)
    }

    async function handleSubmit() {

        const payload = {
            ...composedObject,
        }

        await createProduct(payload)
    }

    useEffect(() => {
        if (!product) return;
        async function load() {
            const { data: attributeDefinitions } = await supabase
                .from("attributeDefinition")
                .select("*")
                .order("label")

            setDefinitions(attributeDefinitions || [])

            const { data: productAttributes } = await supabase
                .from("productAttributes")
                .select("*")
                .eq("productId", productForm?.id)

            if (!productAttributes) return

            // ✅ marcar selecionados
            const selected = productAttributes.map(
                (item) => item.attributeDefinitionId
            )

            setSelectedAttributes(selected)

            // ✅ mapear valores
            const mappedValues: Record<string, any> = {}

            productAttributes.forEach((item) => {
                let value = item.value

                // normalizar boolean
                if (value === "true") value = true
                if (value === "false") value = false

                mappedValues[item.attributeDefinitionId] = value
            })

            setProductAttributes((prev) => ({
                ...prev,
                ...mappedValues,
            }))
        }

        load()
    }, [])

    function handleBasicChange(field: string, value: any) {
        setProductForm((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const [attributeValues, setAttributeValues] = useState<
        Record<string, string>
    >({});


    // 🔥 inicializa corretamente
    useEffect(() => {
        if (!product?.id) return;

        if (product?.productAttributes) {
            const initialValues = Object.fromEntries(
                product.productAttributes.map((item) => [
                    item.attributeDefinitionId,
                    item.value,
                ])
            );

            setAttributeValues(initialValues);
        }
    }, [product]);

    // Attributes Change
    const [attributesDefinitionsBaseListIsLoading,
        setAttributesDefinitionsBaseListIsLoading
    ] = useState<boolean>(true)

    async function getAttributesDefinitionsList() {
        const {
            data: attributesDefinitionsBaseList,
            error: getAttributesDefinitionsError
        } = await supabase
            .from("attributesDefinition")
            .select("*")

        if (getAttributesDefinitionsError) {
            setAttributesDefinitionsBaseListIsLoading(false)
            return <>{JSON.stringify(getAttributesDefinitionsError)}</>
        }

        setAttributesDefinitionsBaseListIsLoading(false)
        setAttributesDefinitionsBaseList(attributesDefinitionsBaseList)
        return attributesDefinitionsBaseList
    }

    useEffect(() => {
        getAttributesDefinitionsList()
            .then((list) => {
                console.log(list)
            })
            .catch()

    }, [])

    const [
        attributesDefinitionsBaseList,
        setAttributesDefinitionsBaseList
    ] = useState<any>();

    function handleProductAttributeToInsertChange({
        attributeDefinitionId,
        value,
        attributeDefinitionType
    }: ProductAttributesToInsert) {
        setProductAttributesToInsert((prev) => {
            const indexToUpdate = prev
                .findIndex(productAttribute =>
                    productAttribute.attributeDefinitionId === attributeDefinitionId
                );
            prev[indexToUpdate] = value
            return prev
        })
    }

    // *** Attributes Change End ***

    return (
        <div
            style={{ padding: 40, fontFamily: "sans-serif" }}
            className="flex flex-col max-w-[1200px] mx-auto overflow-hidden"
        >

            <pre>
                {JSON.stringify(productColors, null, 2)}
                {JSON.stringify(seatColor, null, 2)}
            </pre>
            <div className="w-[50%]">
                <h1>Product Creation - Bike Elétrica</h1>

                {/* DEBUG */}
                {/* {JSON.stringify(productForm, null, 2)} */}

                {!attributesDefinitionsBaseListIsLoading && (
                    <pre>
                        {JSON.stringify(attributesDefinitionsBaseList, null, 2)}
                    </pre>
                )}
                <hr />

                <SectionTitle name="Atributos Elétricos" />

                <h2>Selecione os atributos</h2>
                <div className="flex flex-col gap-2">
                    <FormInput
                        label="Nome"
                        value={productForm.name}
                        onChange={(value) => handleBasicChange("name", value)}
                    />

                    <FormInput
                        label="Description"
                        value={productForm.description}
                        onChange={(value) => handleBasicChange("description", value)}
                    />

                    <ProductTypeSelect
                        productTypes={productTypes}
                        value={productForm.type || "electric-bike"}
                        onChange={(value) => handleBasicChange("type", value)}
                    />

                    <SectionTitle name="Tipos de Desbloqueio" />
                    <UnlockTypesInput
                        value={unlockTypes}
                        onChange={setUnlockTypes}
                    />

                    <div>
                        <SectionTitle name="Cores do Produto" />
                        <ProductColorsManager
                            productColors={productColors}
                            setProductColors={setProductColors}
                        />
                    </div>

                    <div>
                        <SectionTitle name="Cores do Banco" />
                        <ColorSelectInput value={seatColor} onChange={setSeatColor} />
                    </div>

                    {/* in dev */}
                    <div>
                        <SectionTitle name="Formas de Pagamento" />
                        <PaymentConditionsInput
                            value={paymentConditions}
                            onChange={setPaymentConditions}
                        />
                    </div>
                </div>
                <br />
            </div>
            <hr />

            <button className="
                    bg-sky-500 text-white
                    px-4 py-2
                "
                onClick={() => {
                    try {
                        ProductAttributes.validateProductAttributes(productAttributesToInsert)
                        console.log("Valid attributes to insert:", productAttributesToInsert);
                    } catch (error) {
                        console.error("Validation error:", error);
                    }
                }}
            >Insert Attrs</button>

            <EditAttributesForm
                productAttributesToInsert={productAttributesToInsert}
                setProductAttributesToInsert={setProductAttributesToInsert}
                product={product}
            />
            <button onClick={() => {
                // handleSubmit()

            }}>create</button>
            <div className="">
                <h2>Objeto Final Composto</h2>
                <pre
                    style={{
                        background: "#111",
                        color: "#0f0",
                        padding: 20,
                        borderRadius: 8,
                    }}
                >
                    {JSON.stringify(/***composedObjec***/productForm, null, 2)}
                    {JSON.stringify(seatColor, null, 2)}
                    {JSON.stringify(productColors, null, 2)}
                </pre>
                <button
                    onClick={copyToClipboard}
                    className="mb-2 px-3 py-1 border border-white rounded"
                >
                    Copiar JSON
                </button>
            </div>

            {/* {JSON.stringify(attributesDefinitionsBaseList, null, 2)} */}
        </div>
    )
}