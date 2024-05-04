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
