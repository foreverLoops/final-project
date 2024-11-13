import React from 'react';
import { Star } from 'lucide-react';

interface RatingProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  onChange?: (value: number) => void;
}

export default function Rating({ 
  value, 
  max = 5, 
  size = 'md', 
  showValue = false,
  onChange 
}: RatingProps) {
  const stars = Array.from({ length: max }, (_, i) => i + 1);
  
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };

  return (
    <div className="flex items-center">
      <div className="flex">
        {stars.map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange?.(star)}
            className={`${onChange ? 'cursor-pointer' : 'cursor-default'} p-0.5`}
          >
            <Star
              className={`${sizeClasses[size]} ${
                star <= value
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
      {showValue && (
        <span className="ml-2 text-sm text-gray-600">
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
}