import Link from "next/link"
import { Product } from "../Types"
import Image from "next/image"

type ProductCardProps = {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="border space-y-2 rounded-xs overflow-hidden">

            <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
                <Image
                    src={product.imgUrl || "/placeholder.png"}
                    alt={product.name ?? "Product image"}
                    fill
                    sizes="(max-width: 768px) 100vw, 200px"
                    className="object-cover"
                />
            </div>

            <div className="p-2 pt-0">
                <h2 className="font-semibold text-md">{product.name}</h2>

                <p className="text-sm text-gray-600 line-clamp-2">
                    {product.description}
                </p>

                <div className="text-sm">
                    {product.type}
                </div>

                <Link
                    href={`/cms/products/${product.id}`}
                    className="text-blue-600 text-sm underline"
                >
                    Ver produto
                </Link>
            </div>
        </div>
    )
}