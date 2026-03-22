import { supabase } from "@/lib/supabase";
import CreateOrUpdateProduct from "../../create/page";

interface Props {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
  const productId = (await params).id;

  const { data, error } = await supabase
    .from("product")
    .select(`
      id,
      name,
      description,
      type,
      imgUrl,
      attribute(*),
      productUnlockType (
        unlockType(*)
      ),
      seatColor(*),
      productColor(*),
      paymentCondition(*)
    `)
    .eq("id", productId)
    .single();

  if (error) {
    console.error(error)
    return <div>Erro ao carregar produto</div>
  }

  return (
    <CreateOrUpdateProduct product={data} />
  );
}