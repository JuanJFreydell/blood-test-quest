import { LabOrder } from '@/types/labOrder';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, User, FileText, AlertCircle } from 'lucide-react';

interface LabOrderCardProps {
  order: LabOrder;
}

export const LabOrderCard = ({ order }: LabOrderCardProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'stat':
        return 'bg-medical-urgent text-white';
      case 'urgent':
        return 'bg-medical-warning text-white';
      default:
        return 'bg-medical-success text-white';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-medical-success text-white';
      case 'in-progress':
        return 'bg-medical-warning text-white';
      case 'cancelled':
        return 'bg-medical-urgent text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="w-full shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-primary">
            Order #{order.orderNumber}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge className={getPriorityColor(order.priority)}>
              {order.priority.toUpperCase()}
            </Badge>
            <Badge className={getStatusColor(order.status)}>
              {order.status.replace('-', ' ').toUpperCase()}
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
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            Tests Ordered ({order.tests.length})
          </h4>
          <div className="grid gap-2">
            {order.tests.map((test) => (
              <div key={test.id} className="flex items-center justify-between p-2 bg-accent rounded-md">
                <div>
                  <span className="font-medium">{test.name}</span>
                  <span className="text-sm text-muted-foreground ml-2">({test.code})</span>
                </div>
                <Badge variant="outline" className={getStatusColor(test.status)}>
                  {test.status.replace('-', ' ')}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {order.notes && (
          <div className="p-3 bg-medical-light-blue rounded-md">
            <p className="text-sm"><strong>Notes:</strong> {order.notes}</p>
          </div>
        )}

        <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
          <Button variant="outline" size="sm" className="text-xs">
            Pending Sample Collection
          </Button>
          <Button variant="outline" size="sm" className="text-xs">
            Sent for Processing
          </Button>
          <Button variant="outline" size="sm" className="text-xs">
            Submitted
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};