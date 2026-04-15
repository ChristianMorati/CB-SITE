import { supabase } from "@/lib/supabase";
import EditAttributesForm from "../../test/page";

interface Props {
    params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
    const productId = "6559805b-ce9a-44ef-a2d2-89291c617862"
    // (await params).id;

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

    return (
        <EditAttributesForm product={product} />
    )
}