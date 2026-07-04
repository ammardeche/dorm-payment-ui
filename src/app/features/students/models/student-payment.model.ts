import { PaymentStatus } from '../../payments/enums/payment-status.model';

export interface StudentPaymentModel {
  id: number;

  amount: number;

  paidMonth: string;

  status: PaymentStatus;

  dueDate: string;

  paymentDate: string;
}
