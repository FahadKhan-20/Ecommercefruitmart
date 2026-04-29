'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/product';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: string, quantity: number) => Promise<void>;
  showRating?: boolean;
  showBenefits?: boolean;
}

export default function ProductCard({
  product,
  onAddToCart,
  showRating = true,
  showBenefits = false,
}: ProductCardProps) {
  const [quantity, setQuantity] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = async () => {
    try {
      setIsAdding(true);
      setError(null);

      if (onAddToCart) {
        await onAddToCart(product.id, 1);
      } else {
        // Default API call
        const response = await fetch('/api/cart/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId: product.id, quantity: 1 }),
        });

        if (!response.ok) {
          throw new Error('Failed to add to cart');
        }
      }

      setQuantity((prev) => prev + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error adding to cart');
    } finally {
      setIsAdding(false);
    }
  };

  const getStockStatus = () => {
    if (product.status === 'Out of Stock' || product.stock === 0) return { label: 'Out of Stock', color: 'text-red-600' };
    if (product.stock < 10) return { label: 'Low Stock', color: 'text-orange-600' };
    return { label: null, color: '' };
  };

  const stockStatus = getStockStatus();
  const imageSrc = product.image;
  const isOutOfStock = product.status === 'Out of Stock' || product.stock === 0;

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group h-full flex flex-col">
      {/* Image Container */}
      <div className="relative h-40 md:h-48 bg-gray-100 overflow-hidden">
        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold z-10">
            -{discount}%
          </div>
        )}

        {/* Stock Status Badge */}
        {stockStatus.label && (
          <div className={`absolute top-3 right-3 ${stockStatus.color} px-2 py-1 rounded-full text-xs font-bold z-10`}>
            {stockStatus.label}
          </div>
        )}

        {/* Product Image */}
        <Link href={`/products/${product.id}`} className="block relative w-full h-full">
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300 cursor-pointer"
          />
        </Link>
      </div>

      {/* Product Info */}
      <div className="p-3 md:p-4 flex flex-col flex-grow">
        {/* Category Tag */}
        <span className="text-xs text-green-600 font-medium mb-1">{product.category}</span>

        {/* Product Name */}
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-gray-900 text-sm md:text-base hover:text-green-600 transition-colors line-clamp-2 mb-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        {showRating && product.rating && (
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.round(product.rating!) ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            {product.reviews && <span className="text-xs text-gray-500">({product.reviews})</span>}
          </div>
        )}

        {/* Price Section */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg md:text-xl font-bold text-gray-900">₹{product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
          )}
        </div>

        {/* Unit */}
        <span className="text-xs text-gray-600 mb-3">per {product.unit}</span>

        {/* Benefits (Optional) */}
        {showBenefits && product.benefits && product.benefits.length > 0 && (
          <div className="mb-3">
            <p className="text-xs text-gray-600 line-clamp-2">
              {product.benefits.slice(0, 2).join(' • ')}
            </p>
          </div>
        )}

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isAdding || isOutOfStock}
          className={`w-full mt-auto py-2 font-semibold rounded-lg transition-colors duration-200 text-sm md:text-base flex items-center justify-center gap-2 ${
            isOutOfStock
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : isAdding
              ? 'bg-green-500 text-white'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          {isAdding ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Adding...
            </>
          ) : isOutOfStock ? (
            'Out of Stock'
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Add to Cart
            </>
          )}
        </button>

        {/* Error Message */}
        {error && <p className="text-xs text-red-600 mt-2">{error}</p>}

        {/* Added to Cart Indicator */}
        {quantity > 0 && !error && (
          <p className="text-xs text-green-600 mt-2 text-center">✓ {quantity} added to cart</p>
        )}
      </div>
    </div>
  );
}
