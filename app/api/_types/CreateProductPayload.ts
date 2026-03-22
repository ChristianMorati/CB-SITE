export type CreateProductPayload = {
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