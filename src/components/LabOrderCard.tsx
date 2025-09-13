import { LabOrder } from '@/types/labOrder';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, User, FileText, AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface LabOrderCardProps {
  order: LabOrder;
  onSelect?: (order: LabOrder) => void;
}

export const LabOrderCard = ({ order, onSelect }: LabOrderCardProps) => {
  const [selectedTests, setSelectedTests] = useState<string[]>([]);
  
  const getDynamicStatus = () => {
    if (order.tests.length === 0) return { status: 'NOT STARTED', color: 'bg-red-600 text-white' };
    
    const allAnalyzed = order.tests.every(test => test.status === 'analyzed' || test.status === 'completed');
    const hasCollected = order.tests.some(test => test.status === 'collected');
    
    if (allAnalyzed) {
      return { status: 'COMPLETE', color: 'bg-green-600 text-white' };
    } else if (hasCollected) {
      return { status: 'PENDING', color: 'bg-yellow-600 text-white' };
    } else {
      return { status: 'NOT STARTED', color: 'bg-red-600 text-white' };
    }
  };

  const dynamicStatus = getDynamicStatus();

  const getTestStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'analyzed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'collected':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'pending':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleTestSelect = (testId: string, checked: boolean) => {
    setSelectedTests(prev => 
      checked 
        ? [...prev, testId]
        : prev.filter(id => id !== testId)
    );
  };

  const handleStatusChange = (newStatus: string) => {
    // In a real app, this would update the backend
    // For now, we'll just clear the selection
    console.log(`Updating tests ${selectedTests.join(', ')} to status: ${newStatus}`);
    setSelectedTests([]);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent card selection when clicking on checkboxes or select
    if ((e.target as Element).closest('[data-prevent-selection]')) {
      return;
    }
    onSelect?.(order);
  };

  return (
    <Card 
      className="w-full shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      onClick={handleCardClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-primary">
            Order #{order.orderNumber}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge className={dynamicStatus.color}>
              {dynamicStatus.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="font-medium">{order.patientName}</p>
              <p className="text-sm text-muted-foreground">ID: {order.patientId}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="font-medium">DOB: {order.dateOfBirth}</p>
              <p className="text-sm text-muted-foreground">Ordered: {order.orderDate}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">Physician:</span>
          <span>{order.physician}</span>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Tests Ordered ({order.tests.length})
            </h4>
            {selectedTests.length > 0 && (
              <div className="flex items-center gap-2" data-prevent-selection>
                <span className="text-sm text-muted-foreground">
                  {selectedTests.length} selected
                </span>
                <Select onValueChange={handleStatusChange}>
                  <SelectTrigger className="w-36 h-8">
                    <SelectValue placeholder="Update status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Not Collected</SelectItem>
                    <SelectItem value="collected">Collected</SelectItem>
                    <SelectItem value="analyzed">Analyzed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <div className="grid gap-2">
            {order.tests.map((test) => (
              <div key={test.id} className="flex items-center gap-3 p-2 bg-accent rounded-md">
                <Checkbox
                  checked={selectedTests.includes(test.id)}
                  onCheckedChange={(checked) => handleTestSelect(test.id, !!checked)}
                  data-prevent-selection
                />
                <div className="flex-1 flex items-center justify-between">
                  <div>
                    <span className="font-medium">{test.name}</span>
                    <span className="text-sm text-muted-foreground ml-2">({test.code})</span>
                  </div>
                  <Badge variant="outline" className={getTestStatusColor(test.status)}>
                    {test.status.replace('-', ' ')}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {order.notes && (
          <div className="p-3 bg-accent rounded-md">
            <p className="text-sm"><strong>Notes:</strong> {order.notes}</p>
          </div>
        )}

        <div className="pt-2 border-t border-border flex justify-end">
          <Button 
            size="sm" 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            disabled={dynamicStatus.status !== 'COMPLETE'}
          >
            Send For Medical Review
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};