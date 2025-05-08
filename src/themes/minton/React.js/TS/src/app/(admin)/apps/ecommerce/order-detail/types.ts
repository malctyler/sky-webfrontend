

export interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  size: string;
  image: string;
  price: string;
  total: string;
}

export interface ShippingAddress {
  provider: string;
  address: string;
  phone: string;
  mobile: string;
}

export interface Billing {
  type: string;
  provider: string;
  valid: string;
}

export interface Delivery {
  provider: string;
  order_id: string;
  payment_mode: string;
}

export interface OrderDetailsType {
  id: string;
  tracking_id: string;
  billing_name?: string;
  order_status?: string;
  order_date: string;
  order_time: string;
  items: OrderItem[];
  sub_total: string;
  shipping_charge: string;
  tax: string;
  net_total: string;
  shipping: ShippingAddress;
  billing: Billing;
  delivery: Delivery;
}
