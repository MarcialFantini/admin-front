export interface ProductFormInterface {
  name: string;
  description: string;

  stock: number;
  category_id: string;
  place_id: string;
  price: number;
}

export interface ProductItemList {
  id: string;
  name: string;
  description: string;
  stock: number;
  category_id: string;
  place_id: string;
  price: number;
}

export interface InitialStateProductsRedux {
  list: ProductItemList[];
}

export interface ProductResponseGetInterface {
  code: number;
  data: ProductItemList[];
  message: string;
}
