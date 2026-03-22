import { supabase } from "@/lib/supabase"
import { ProductCard } from "../cms/products/[id]/page"

export default async function Page() {
    const productId = "02434c55-97d2-4ad5-89d6-ed99e9b7c161"
    const { data, error } = await supabase
        .from("product")
        .select(`
            id,
            name,
            description,
            type,
            imgUrl,
            productAttribute (
                attribute (*)
            ),
            productUnlockType (
                unlockType(*)
            ),
            seatColor(
                id,
                name,
                RGB
            ),
            productColor(
                id,
                name,
                RGB
            ),
            paymentCondition(*)
        `)
        .eq("id", productId)
        .single();

    if (error) {
        return <pre
            className="overflow-hidden"
        >{JSON.stringify(error, null, 2)}</pre>
    }

    return (
        <>
            <div className="overflow-hidden">
                <img src={data.imgUrl} alt="" className="size-[300px]" />
                <pre>
                    {JSON.stringify(data, null, 2)}
                </pre>

                <ProductCard product={data[0]}/>
            </div>
        </>
    )
}