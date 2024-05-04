export interface ResponseRowMovements {
  data: Movements[];
  message: string;
  code: number;
}

export interface Movements {
  id: string;
  createdAt: string;
  order_id: string;
  place_id: string;
  place_name: string;
}

export interface MovementsReducer {
  list: Movements[];
}
