export interface PlaceItemInterface {
  id: string;
  name: string;
}
export interface PlaceStateInterface {
  list: PlaceItemInterface[];
}

export interface responsePlaceGet {
  data: PlaceItemInterface[];
  code: number;
  message: string;
}
