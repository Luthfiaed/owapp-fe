"use client";

import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import ProductCard, { IProduct } from "../ui/product-card";
import Accordion from "../ui/accordion";
import { fetchProduct } from "../lib/query";
import Toast from "../ui/toast";
import { useCookies } from "react-cookie";

const vdata = [
  {
    title: "SQL Injection",
    content:
      "Try passing this query to the search bar: test' OR '1'='1. It will display unpublished products on this page. This is because the query is not sanitized on the backend.",
  },
];

export default function ProductsPage() {
  const [productData, setProductData] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // eslint-disable-next-line
  const [authToken, setCookie, removeCookie] = useCookies(["access_token"]);

  const getProduct = async (name?: string) => {
    setIsLoading(true);
    const res = await fetchProduct(authToken.access_token, name);
    if (res.error !== "") {
      setError(res.error);
      setProductData([]);
    } else {
      setError("");
      setProductData(res.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getProduct();
  }, []);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      getProduct(searchTerm);
    }
  };

  return (
    <main className="justify-items-center">
      <div className="grid gap-8 p-8 w-max">
        <Accordion items={vdata}></Accordion>
        <div className="relative flex w-full">
          <input
            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 text-gray-500"
            placeholder="Search for product..."
            onChange={handleInput}
            onKeyDown={handleSearch}
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
        <div>
          <h1 className="mb-4 text-center text-xl">Our Products</h1>
          <p className="mb-4 text-center text-lg">Click for Details</p>
          {isLoading && <p>Loading...</p>}
          {error !== "" && (
            <Toast type="error" title="Fetch Product Failed">
              {error}
            </Toast>
          )}
          <div className="grid grid-cols-3 gap-8">
            {productData.length > 0 &&
              productData.map((product) => {
                return <ProductCard key={product.name} productData={product} />;
              })}
          </div>
        </div>
      </div>
    </main>
  );
}
