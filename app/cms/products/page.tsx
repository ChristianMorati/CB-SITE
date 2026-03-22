"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { LimitedViewWrapper } from "@/app/_components/Page/LimitedViewWrapper"
import { Product } from "@/app/_components/Product/Types"
import ProductCard from "@/app/_components/Product/Card/ProductCard"

// type Product = {
//   id: string
//   name: string
//   description: string
//   type: string
//   imgUrl: string | null
//   attribute: any[]
//   productUnlockType: {
//     unlockType: any
//   }[]
//   seatColor: {
//     id: string
//     name: string
//     RGB: string
//   }[]
//   productColor: {
//     id: string
//     name: string
//     RGB: string
//   }[]
//   paymentCondition: any[]
// }

export default function Page() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProducts() {
      const { data, error } = await supabase
        .from("product")
        .select(`
      id,
      name,
      description,
      type,
      imgUrl
    `)

      if (error) {
        console.error(error)
        return
      }

      setProducts(data ?? [])
      setLoading(false)
    }

    loadProducts()
  }, [])

  if (loading) {
    return <div>Loading products...</div>
  }

  const list = [
    products[0], products[0], products[0],
    products[0], products[0], products[0],
  ]

  return (
    <LimitedViewWrapper>
      <div className="space-y-6 flex flex-col p-2">
        <div>
          <button className="
          px-4 p-2 bg-sky-700
          ">
            <Link
              href="/cms/products/create"
              className="inline-block px-4 py-2  text-white rounded"
            >
              + Criar Novo Produto
            </Link>
          </button>
        </div>

        <h1 className="
          uppercase
          text-xl
          ">
          Produtos
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
          {list.map((product, idx) => (
            <div key={product.id + idx}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div >
    </LimitedViewWrapper>
  )
}