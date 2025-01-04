import Image from "next/image";

export interface IProduct {
  name: string;
  price: number;
  draft: boolean;
  image: string;
}

export default function ProductCard({
  productData,
}: {
  productData: IProduct;
}) {
  return (
    <div className="border-2 p-4">
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
      {productData.draft && (
        <p className="bg-red-500 rounded-md text-center">UNPUBLISHED</p>
      )}
    </div>
  );
}
