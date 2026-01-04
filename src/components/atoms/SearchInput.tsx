import React from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  autoFocus?: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onKeyPress,
  placeholder = "Search...",
  disabled = false,
  className = "",
  autoFocus = false,
}) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyPress={onKeyPress}
      placeholder={placeholder}
      disabled={disabled}
      autoFocus={autoFocus}
      className={`w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${
        disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"
      } ${className}`}
    />
  );
};

export default SearchInput;
