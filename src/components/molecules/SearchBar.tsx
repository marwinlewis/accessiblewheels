import React from "react";
import Button from "../atoms/Button";
import SearchInput from "../atoms/SearchInput";

interface SearchBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
  placeholder?: string;
  isLoading?: boolean;
  disabled?: boolean;
  onSuggestionSelect?: (suggestion: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchValue,
  onSearchChange,
  onSearch,
  placeholder = "Enter city name...",
  isLoading = false,
  disabled = false,
}) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading && !disabled) {
      onSearch();
    }
  };

  return (
    <div className="flex gap-2 w-full">
      <SearchInput
        value={searchValue}
        onChange={onSearchChange}
        placeholder={placeholder}
        disabled={disabled || isLoading}
        onKeyPress={handleKeyPress}
        autoFocus={true}
      />
      <Button
        onClick={onSearch}
        disabled={disabled || isLoading || !searchValue.trim()}
        className="whitespace-nowrap"
      >
        {isLoading ? "Searching..." : "Search"}
      </Button>
    </div>
  );
};

export default SearchBar;
