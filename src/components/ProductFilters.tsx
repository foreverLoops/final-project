import React from 'react';
import { ChevronDown } from 'lucide-react';

interface FilterOption {
  id: string;
  name: string;
  checked: boolean;
}

interface FilterSection {
  id: string;
  name: string;
  options: FilterOption[];
}

interface ProductFiltersProps {
  filters: FilterSection[];
  onFilterChange: (sectionId: string, optionId: string) => void;
}

export default function ProductFilters({ filters, onFilterChange }: ProductFiltersProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Filters</h2>
      <div className="space-y-6">
        {filters.map((section) => (
          <div key={section.id} className="border-t border-gray-200 pt-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-900">{section.name}</h3>
              <ChevronDown className="h-5 w-5 text-gray-500" />
            </div>
            <div className="space-y-2">
              {section.options.map((option) => (
                <div key={option.id} className="flex items-center">
                  <input
                    id={`filter-${section.id}-${option.id}`}
                    type="checkbox"
                    checked={option.checked}
                    onChange={() => onFilterChange(section.id, option.id)}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor={`filter-${section.id}-${option.id}`}
                    className="ml-3 text-sm text-gray-600"
                  >
                    {option.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}