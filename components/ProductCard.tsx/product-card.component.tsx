// components/ProductCard.tsx

'use client';

import { addToCart } from '../../lib/redux/cart-slice';
import type { Product } from '../../types/product';
import { useDispatch } from 'react-redux';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch();

  return (
    <div className="border border-gray-200 rounded-lg p-4 flex flex-col justify-between shadow-lg bg-white transform transition-transform hover:scale-105">
      <div>
        <div className="w-full h-48 flex items-center justify-center mb-4">
          <img src={product.image} alt={product.title} className="max-h-full max-w-full object-contain" />
        </div>
        <h2 className="text-lg font-semibold text-gray-800 truncate" title={product.title}>
          {product.title}
        </h2>
        <p className="text-xl font-bold text-zinc-500 mt-2">
          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
        </p>
      </div>

      <button
        onClick={() => dispatch(addToCart(product))}
        className="mt-4 w-full bg-zinc-900 text-white py-2 rounded-lg font-semibold hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-opacity-50"
      >
        Adicionar ao Carrinho
      </button>
    </div>
  );
}