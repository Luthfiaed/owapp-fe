"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export interface IProduct {
  id: number;
  name: string;
  price: number;
  isDraft: boolean;
  image: string;
}

export default function ProductCard({
  productData,
}: {
  productData: IProduct;
}) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/products/${productData.id}`)}
      className="border-2 p-4 bg-[var(--navbar)] rounded-md"
    >
      <Image
        src={productData.image}
        alt={`image of ${productData.name}`}
        width={200}
        height={200}
        className="mb-4"
      />
      <div className="flex justify-between">
        <h2>{productData.name}</h2>
        <p>${productData.price}</p>
      </div>
      {productData.isDraft && (
        <p className="bg-red-500 rounded-md text-center">UNPUBLISHED</p>
      )}
    </div>
  );
}
