import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onSearch: (orderNumber: string) => void;
  isLoading?: boolean;
}

export const SearchBar = ({ onSearch, isLoading = false }: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      onSearch(searchValue.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchValue.trim()) {
      onSearch(searchValue.trim());
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="relative">
        <Input
          type="text"
          placeholder="Enter lab order number..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyPress={handleKeyPress}
          className="pr-12 h-12 text-lg shadow-lg border-0 focus:ring-2 focus:ring-primary"
          disabled={isLoading}
        />
        <Button
          type="submit"
          size="sm"
          className="absolute right-2 top-2 h-8 w-8 p-0"
          disabled={isLoading || !searchValue.trim()}
        >
          <Search className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};