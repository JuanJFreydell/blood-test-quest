import { LabOrder } from '@/types/labOrder';

export const mockLabOrders: LabOrder[] = [
  {
    id: '1',
    orderNumber: 'LAB001234',
    patientName: 'Sarah Johnson',
    patientId: 'PT001234',
    dateOfBirth: '1985-03-15',
    orderDate: '2024-01-15',
    priority: 'routine',
    status: 'pending',
    physician: 'Dr. Michael Chen',
    tests: [
      {
        id: 't1',
        name: 'Complete Blood Count',
        code: 'CBC',
        category: 'hematology',
        status: 'pending',
        normalRange: 'WBC: 4.5-11.0 K/uL'
      },
      {
        id: 't2',
        name: 'Basic Metabolic Panel',
        code: 'BMP',
        category: 'chemistry',
        status: 'pending',
        normalRange: 'Glucose: 70-100 mg/dL'
      }
    ],
    notes: 'Fasting labs required'
  },
  {
    id: '2',
    orderNumber: 'LAB001235',
    patientName: 'Robert Martinez',
    patientId: 'PT001235',
    dateOfBirth: '1972-08-22',
    orderDate: '2024-01-15',
    priority: 'urgent',
    status: 'in-progress',
    physician: 'Dr. Lisa Park',
    tests: [
      {
        id: 't3',
        name: 'Troponin I',
        code: 'TROP',
        category: 'chemistry',
        status: 'collected',
        normalRange: '<0.04 ng/mL'
      },
      {
        id: 't4',
        name: 'D-Dimer',
        code: 'DDIMER',
        category: 'hematology',
        status: 'analyzed',
        normalRange: '<0.50 mg/L FEU',
        result: '0.35 mg/L FEU'
      }
    ]
  },
  {
    id: '3',
    orderNumber: 'LAB001236',
    patientName: 'Emily Davis',
    patientId: 'PT001236',
    dateOfBirth: '1990-12-08',
    orderDate: '2024-01-14',
    priority: 'stat',
    status: 'completed',
    physician: 'Dr. James Wilson',
    tests: [
      {
        id: 't5',
        name: 'Blood Glucose',
        code: 'GLUC',
        category: 'chemistry',
        status: 'completed',
        normalRange: '70-100 mg/dL',
        result: '95 mg/dL'
      },
      {
        id: 't6',
        name: 'Hemoglobin A1C',
        code: 'HBA1C',
        category: 'chemistry',
        status: 'completed',
        normalRange: '<5.7%',
        result: '5.4%'
      }
    ]
  },
  {
    id: '4',
    orderNumber: 'LAB001237',
    patientName: 'Michael Thompson',
    patientId: 'PT001237',
    dateOfBirth: '1988-06-30',
    orderDate: '2024-01-15',
    priority: 'routine',
    status: 'pending',
    physician: 'Dr. Anna Rodriguez',
    tests: [
      {
        id: 't7',
        name: 'Lipid Panel',
        code: 'LIPID',
        category: 'chemistry',
        status: 'pending',
        normalRange: 'Total Chol: <200 mg/dL'
      },
      {
        id: 't8',
        name: 'Thyroid Function Panel',
        code: 'TSH',
        category: 'immunology',
        status: 'pending',
        normalRange: 'TSH: 0.4-4.5 mIU/L'
      }
    ],
    notes: 'Patient on thyroid medication'
  }
];