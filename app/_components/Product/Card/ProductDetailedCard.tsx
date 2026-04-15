import Image from "next/image";
import { showPriceAsReal } from "@/app/utils/ProductsUtilsFunctions";
import { CardTitle } from "./CardTitle";
import { Product } from "../Types";
import productDetailedCardStyles from "./ProductDetailedCard.module.css";
import { ColorCircle } from "../ColorCircle";

interface Props {
  product: Product;
}

export type ProductColorItem = {
  id: string
  RGB: string
  product_color_type: "predominant" | "assistant"
  productId?: string
}

export type SeatColorItem = {
  id: string
  RGB: string
  productId?: string
}

export function ProductDetailedCard({ product }: Props) {
  const productColors = product.productColor
  const productSeatColors = product.seatColor

  return (
    <div className="max-w-[1200px] mx-auto shadow-lg overflow-hidden normalText
    flex flex-col gap-2 p-2
    ">
      {/* Product Attributes */}
      <CardTitle title="Caracteristicas" />
      <div className="flex flex-col gap-2">
        <table className="">
          <thead className="">
            <tr>
              <th className="text-left p-2 border-b">Atributo</th>
              <th className="text-left p-2 border-b">Valor</th>
            </tr>
          </thead>

          <tbody>
            {product.productAttributes.map((attribute) => (
              <tr key={attribute.id} className="border-b last:border-0">
                <td className="p-2 font-medium">
                  {attribute.attributeDefinition.label}
                </td>
                <td className="p-2">
                  {attribute.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h1
        className="
        text-lg uppercase
      "
      >{product.name} - Características</h1>
      {/* Image */}
      <div className="relative w-[300px] h-[300px] bg-zinc-900">
        <Image
          src={product.imgUrl ?? ""}
          alt={product.name ?? "Product image"}
          fill
          className={`object-contain ${productDetailedCardStyles.blend}`}
        />
      </div>

      {/* Content */}
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <span className="text-sm">{product.type}</span>
          <p className="text-sm text-gray-600">
            {product.description || "Sem descrição disponível."}
          </p>
        </div>

        <hr />
        {/* Payment Conditions */}
        <ul>
          {product.paymentCondition.map((condition, index) => {
            const numberOfInstallmentsGTOne = condition.numberOfInstallments > 1;
            const haveDiscount = condition.descountPercent > 0;
            const betterPriceTextSizeClass = numberOfInstallmentsGTOne ? "text-md" : "text-xl"

            return (
              <li key={condition.id}>
                <p className="flex items-center gap-2">
                  {condition.label}:

                  <span className={`
                    ${betterPriceTextSizeClass}
                  `}>
                    {showPriceAsReal(condition.value)}
                  </span>
                  -
                  {numberOfInstallmentsGTOne ? (
                    <span className={`
                    ${betterPriceTextSizeClass}
                  `}>
                      {condition.numberOfInstallments}x {showPriceAsReal(condition.installmentsValue)}
                    </span>
                  ) : (
                    <span>à vista</span>
                  )}

                  {haveDiscount && (
                    <span className="text-green-400">
                      ({condition.descountPercent}% OFF)
                    </span>
                  )}
                </p>
              </li>
            )
          })}
          <li className="ml-2 underline">ou</li>
          <div className="text-sm">
            <li className="mt-2">Cartão em até 21X;</li>
            <li>Carnê - Financeira em até 24X;</li>
            <li>Consulte condições e valores em nosso <span className="text-blue-400 underline">WhatsApp.</span></li>
          </ div>
        </ul>

        <hr />
        {/* Product Colors */}
        <CardTitle title="Cores" />
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-center gap-2">
            <h1>Produto</h1>
            <ColorCircle colors={productColors} />
          </div>

          {/* Seat Colors */}
          <div className={`flex flex-col items-center gap-2`}>
            <h1>Banco</h1>
            <ColorCircle
              colors={productSeatColors}
            />
          </div>
        </div>

        <hr />
        {/* Unlock Types */}
        <div className="flex flex-col gap-2">
          <CardTitle title="Tipos de Desbloqueio" />
          <div className="grid grid-cols-3 gap-2 text-sm">
            {product.productUnlockType.map((unlock) => (
              <Spec
                key={unlock.unlockType.id}
                label="Desbloqueio"
                value={unlock.unlockType.type}
              />
            ))}
          </div>
        </div>

        <hr />
        <CardTitle title="Outras Cores Disponíves" />
        <h1>Produto</h1>
        <div>
          fetch other products
        </div>

        <hr />


        {/* <pre>
          {JSON.stringify(product, null, 2)}
        </pre> */}

        <div className="py-5" />
      </div>
    </div>
  );
}

function Spec({ label, value }: {
  label: string;
  value: string
}) {
  return (
    <div className="text-white bg-zinc-800 p-2 rounded-lg">
      <p className="text-gray-500 text-xs">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}

interface Props {
  params: Promise<{
    id: string;
  }>;
}