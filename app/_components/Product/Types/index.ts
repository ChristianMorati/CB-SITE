type ProductType =
  | "electric-bike"
  | "scooter"
  | "triciclo"
  | "patinete"
  | "bike";

interface Attribute {
  id: string;
  name: string;
  value: string;
}

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

export interface Product {
  id: string;
  name: string;
  description: string | null;
  type: ProductType;
  imgUrl: string;
  attribute: Attribute[];
  productUnlockType: ProductUnlockType[];
  seatColor: Color[];
  productColor: Color[];
  paymentCondition: PaymentCondition[];
}