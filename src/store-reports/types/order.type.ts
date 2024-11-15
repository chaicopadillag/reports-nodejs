export type OrderDetailsType = {
  order_id: number;
  customer_id: number;
  order_date: Date;
  customers: Customers;
  order_details: OrderDetail[];
};

type Customers = {
  customer_id: number;
  customer_name: string;
  contact_name: string;
  address: string;
  city: string;
  postal_code: string;
  country: string;
};

type OrderDetail = {
  order_detail_id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  products: Products;
};

type Products = {
  product_id: number;
  product_name: string;
  category_id: number;
  unit: string;
  price: string;
};
