export interface OrdersDetiailItem {
  id: string;
  order_id: string;
  product_id: string;
  unit_price: number;
}

export interface OrdersInterface {
  id: string;
  client_id: string;
  operation_id: string;
}

export interface OrdersCar {
  product_id: string;
  amount: number;
}

export interface OrdersCarName {
  product_id: string;
  amount: number;
  name: string;
}

export interface InitialStateOrderInterface {
  list: OrdersInterface[];
  newOrder: OrdersCarName[];
  orderSelected: OrderAndDetail;
}

export interface CreateOrderThunkReques {
  orders: OrdersCar[];
  place_id: string;
}

export interface OrderResponse {
  id: string;
  client_id: string;
  operation_id: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetOrdersThunkResponse {
  data: OrderResponse[];
  message: string;
  code: number;
}

export interface GetOrderResponseDetails {
  data: OrderAndDetail;
  message: string;
  code: number;
}

export interface OrderAndDetail {
  id: string;
  client_id: string;
  operation_id: string;
  place: string;

  details: OrderDetail[];
}

export interface OrderDetail {
  id: string;
  name: string;
  amount: number;
  price: number;
}

export const normalIdUser = "472015e7-e97e-41b8-a40f-3549ad2896d4";
