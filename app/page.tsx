"use client";

import Cart from "../components/Cart/cart";
import ProductCard from "../components/ProductCard.tsx/product-card.component";
import SearchBar from "../components/SearchBar/search-bar.component";
import type { RootState } from "../lib/redux/store";
import { ProductService } from "../services/product.service";
import type { Product } from "../types/product";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const productsService = new ProductService();

  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalItemsInCart = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    const fetchProducts = async () => {
      const initialProducts = await productsService.getProducs();
      setProducts(initialProducts);
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Catálogo de Produtos
        </h1>
        <div className="text-lg font-semibold text-gray-700">
          🛒 Carrinho: {totalItemsInCart}{" "}
          {totalItemsInCart === 1 ? "item" : "itens"}
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))
              ) : (
                <p className="col-span-full text-center text-gray-500">
                  Nenhum produto encontrado.
                </p>
              )}
            </div>
          </div>

          <div className="md:col-span-1">
            <Cart />
          </div>
        </div>
      </main>
    </div>
  );
}
