import { LimitedViewWrapper } from "@/app/_components/Page/LimitedViewWrapper";
import { PageWrapper } from "@/app/_components/Page/PageWrapper";
import { ProductDetailedCard } from "@/app/_components/Product/Card/ProductDetailedCard";
import { ProductNotFounded } from "@/app/_components/Product/ProductNotFounded";
import { supabase } from "@/lib/supabase";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

// testRoute: http://localhost:3000/cms/products/02434c55-97d2-4ad5-89d6-ed99e9b7c161

export default async function ProductPage({ params }: Props) {
  const productId = (await params).id as string;

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

  console.log(data)

  if (error) {
    return <>
      <PageWrapper>
        <LimitedViewWrapper>
          <ProductNotFounded searchedId={productId} />
        </LimitedViewWrapper>
      </PageWrapper>
    </>
  }

  return <ProductDetailedCard product={data} />
}