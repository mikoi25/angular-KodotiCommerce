export interface Order {
  hasItems: boolean;
  items: OrderItem[];
  total: number;
  page: number;
  pages: number;
}

export interface OrderItem {
  orderId?: number;
  orderNumber?: string;
  status?: OrderStatus;
  paymentType: OrderPayment;
  clientId: number;
  items?: DetailsOrderItem[];
  total?: number;
}

export interface DetailsOrderItem {
  orderDetailId?: number;
  productId: number;
  name?: string;
  price: number
  quantity: number;
  total?: number;
}

export enum OrderStatus {
  Cancel,
  Pending,
  Approved,
}

export enum OrderPayment {
  CreditCard,
  PayPal,
  BankTransfer
}

export type orderStatus = 'Cancel' |
  'Pending' |
  'Approved';

export type orderPayment = 'CreditCard' |
  'PayPal' |
  'BankTransfer';




