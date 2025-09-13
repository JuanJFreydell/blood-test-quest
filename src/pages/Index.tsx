import { useState } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { LabOrderCard } from '@/components/LabOrderCard';
import { mockLabOrders } from '@/data/mockLabOrders';
import { LabOrder } from '@/types/labOrder';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [searchResults, setSearchResults] = useState<LabOrder[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (orderNumber: string) => {
    setIsLoading(true);
    setHasSearched(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const results = mockLabOrders.filter(order => 
        order.orderNumber.toLowerCase().includes(orderNumber.toLowerCase())
      );
      
      setSearchResults(results);
      setIsLoading(false);
      
      if (results.length === 0) {
        toast({
          title: "No Results Found",
          description: `No lab orders found for "${orderNumber}"`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Search Complete",
          description: `Found ${results.length} lab order${results.length > 1 ? 's' : ''}`,
        });
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-primary">Medical Laboratory System</h1>
          <p className="text-muted-foreground">Laboratory Order Management Portal</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="text-center mb-8">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-foreground mb-2">Search Lab Orders</h2>
            <p className="text-muted-foreground">Enter a lab order number to view patient test information</p>
          </div>
          
          <div className="flex justify-center">
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-2 text-muted-foreground">Searching lab orders...</p>
          </div>
        )}

        {/* Results Section */}
        {!isLoading && hasSearched && (
          <div className="space-y-6">
            {searchResults.length > 0 ? (
              <>
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-foreground">
                    Found {searchResults.length} Lab Order{searchResults.length > 1 ? 's' : ''}
                  </h3>
                </div>
                <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                  {searchResults.map((order) => (
                    <LabOrderCard key={order.id} order={order} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No Results Found</h3>
                <p className="text-muted-foreground">Try searching with a different order number</p>
                <div className="mt-4 p-4 bg-muted rounded-lg max-w-md mx-auto">
                  <p className="text-sm text-muted-foreground">
                    <strong>Try these sample order numbers:</strong><br />
                    LAB001234, LAB001235, LAB001236, LAB001237
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Initial State */}
        {!hasSearched && !isLoading && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🧪</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Ready to Search</h3>
            <p className="text-muted-foreground mb-4">Enter a lab order number above to get started</p>
            <div className="p-4 bg-muted rounded-lg max-w-md mx-auto">
              <p className="text-sm text-muted-foreground">
                <strong>Sample order numbers to try:</strong><br />
                LAB001234, LAB001235, LAB001236, LAB001237
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
