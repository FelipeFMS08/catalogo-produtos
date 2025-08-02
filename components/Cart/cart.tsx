"use client";

import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../lib/redux/store";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "@/lib/redux/cart-slice";

export default function Cart() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const totalValue = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 sticky top-8">
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">
        Meu Carrinho
      </h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Seu carrinho está vazio.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-4 p-3 bg-white rounded-lg shadow-sm border border-gray-100"
              >
                <div className="flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-contain rounded-md p-1 bg-white"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p
                    className="font-semibold text-sm text-gray-800 truncate"
                    title={item.title}
                  >
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(item.price)}
                  </p>
                  <div className="flex items-center gap-2 border border-gray-200 rounded-full justify-center ">
                    <button
                      onClick={() => dispatch(decrementQuantity(item.id))}
                      className="w-6 h-6 text-gray-600 hover:text-black transition-colors rounded-full"
                    >
                      -
                    </button>
                    <span className="font-medium text-sm text-center w-4">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => dispatch(incrementQuantity(item.id))}
                      className="w-6 h-6 text-gray-600 hover:text-black transition-colors rounded-full"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <p className="font-bold text-gray-900 text-sm w-20 text-right">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(item.price * item.quantity)}
                  </p>
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    title="Remover item"
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="border-t mt-4 pt-4">
            <p className="text-xl font-bold text-gray-800 flex justify-between">
              <span>Total:</span>
              <span>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(totalValue)}
              </span>
            </p>
          </div>
        </>
      )}
    </div>
  );
}
