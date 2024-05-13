export enum status {
  normal = "normal",
  pending = "pending",
  completed = "completed",
}

export interface CategoriesInterface {
  id: string;
  name: string;
}

export interface initialStateCategory {
  categories: CategoriesInterface[];
  status: status;
  CategoriesHome: CategoriesHome[];
}

export interface CategoriesResponseInterface {
  message: string;
  data: any;
  code: number;
}

export interface CategoriesColumns {
  id: string;
  name: string;
}

export interface CategoryUpdate {
  name: string;
}

export interface CategoriesHomeResponse {
  data: CategoriesHome[];
  message: string;
  code: number;
}

export interface CategoriesHome {
  id: string;
  category: string;
  total_products: number;
}
