import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  maxQuantity: number;
  onQuantityChange: (quantity: number) => void;
  size?: 'sm' | 'md' | 'lg';
}

export default function QuantitySelector({
  quantity,
  maxQuantity,
  onQuantityChange,
  size = 'md'
}: QuantitySelectorProps) {
  const sizeClasses = {
    sm: {
      button: 'p-1',
      icon: 'h-3 w-3',
      text: 'text-sm w-6'
    },
    md: {
      button: 'p-2',
      icon: 'h-4 w-4',
      text: 'text-base w-8'
    },
    lg: {
      button: 'p-3',
      icon: 'h-5 w-5',
      text: 'text-lg w-10'
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
        disabled={quantity <= 1}
        className={`${sizeClasses[size].button} rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <Minus className={sizeClasses[size].icon} />
      </button>
      <span className={`${sizeClasses[size].text} text-center font-medium`}>
        {quantity}
      </span>
      <button
        onClick={() => onQuantityChange(Math.min(maxQuantity, quantity + 1))}
        disabled={quantity >= maxQuantity}
        className={`${sizeClasses[size].button} rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <Plus className={sizeClasses[size].icon} />
      </button>
    </div>
  );
}