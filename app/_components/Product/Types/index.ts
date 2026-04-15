type ProductType =
  | "electric-bike"
  | "scooter"
  | "triciclo"
  | "patinete"
  | "bike";

interface UnlockType {
  id: string;
  type: string;
}

interface ProductUnlockType {
  unlockType: UnlockType;
}

interface Color {
  id: string;
  name: string;
  RGB: string;
}

interface PaymentCondition {
  id: string;
  productId: string;
  type: string;
  label: string;
  value: number;
  descountPercent: number;
  installmentsValue: number;
  numberOfInstallments: number;
}

interface AttributeDefintion {
  id: string;
  type: string;
  label: string;
  metadata: any;
}

interface ProductAttribute {
  id: string,
  value: string,
  attributeDefinition: AttributeDefintion
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  type: ProductType;
  imgUrl: string;
  productAttributes: ProductAttribute[];
  productUnlockType: ProductUnlockType[];
  seatColor: Color[];
  productColor: Color[];
  paymentCondition: PaymentCondition[];
}