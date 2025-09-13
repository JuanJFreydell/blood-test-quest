export interface LabOrder {
  id: string;
  orderNumber: string;
  patientName: string;
  patientId: string;
  dateOfBirth: string;
  orderDate: string;
  priority: 'routine' | 'urgent' | 'stat';
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  tests: LabTest[];
  physician: string;
  notes?: string;
}

export interface LabTest {
  id: string;
  name: string;
  code: string;
  category: 'hematology' | 'chemistry' | 'immunology' | 'microbiology';
  status: 'pending' | 'collected' | 'analyzed' | 'completed';
  normalRange?: string;
  result?: string;
}