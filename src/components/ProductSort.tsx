import React from 'react';
import { ChevronDown } from 'lucide-react';

interface SortOption {
  id: string;
  name: string;
  value: string;
}

interface ProductSortProps {
  options: SortOption[];
  currentSort: string;
  onSortChange: (value: string) => void;
}

export default function ProductSort({ options, currentSort, onSortChange }: ProductSortProps) {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-700">Sort by:</span>
      <div className="relative">
        <select
          value={currentSort}
          onChange={(e) => onSortChange(e.target.value)}
          className="appearance-none rounded-md border border-gray-300 pl-3 pr-10 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
        >
          {options.map((option) => (
            <option key={option.id} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
}