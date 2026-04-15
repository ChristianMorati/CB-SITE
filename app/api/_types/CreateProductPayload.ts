import { AttributeDefinition } from "@/app/cms/products/create/_Inputs/Attribute"

export type ProductAttribute = {
  id: string
  productId: string
  attributeDefinitionId: string
  attributeDefinition: AttributeDefinition
  value: string
}


export type CreateProductPayload = {
  id?: string
  name: string
  description?: string
  type: string
  imgUrl: string

  attribute: {
    label: string
    value: string | number | boolean
  }[]

  productUnlockType: {
    unlockType: {
      type: string
    }
  }[]

  seatColor: {
    name: string
    RGB: string
  }[]

  productColor: ProductColor[]

  productAttributes: [
    ProductAttribute
  ]

  paymentCondition: {
    type: string
    label: string
    value: number
    numberOfInstallments: number
    installmentsValue: number
    descountPercent: number
  }[]
}

export type ProductColor = {
  id?: string
  productId?: string
  RGB: string
  product_color_type: "predominant" | "assistant"
}