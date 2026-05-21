import { supabase } from "@/lib/supabase"
import { CreateOrUpdateProduct } from "./CreateOrUpdateProduct"

export const productTypes = [
  "bike",
  "electric-bike",
  "motorcycle",
] as const

export type ProductType = typeof productTypes[number]

export async function createProduct(payload: any) {
  const res = await fetch("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    throw new Error("Failed to create product")
  }

  return res.json()
}

export type ProductColorItem = {
  id?: string
  productId?: string
  RGB: string
  product_color_type: "predominant" | "assistant"
}

export default async function Page({ productId = "6559805b-ce9a-44ef-a2d2-89291c617862" }) {

  const { data: product, error } = await supabase
    .from("product")
    .select(`
      id,
      name,
      description,
      type,
      imgUrl,
      productAttributes(*,
      attributeDefinition(*)
      ),
      productUnlockType (
        unlockType(*)
      ),
      seatColor(*),
      productColor(*),
      paymentCondition(*)
    `)
    .eq("id", productId)
    .single();

  return <CreateOrUpdateProduct product={product} />
}
