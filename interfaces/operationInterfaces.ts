export interface OperationReducer {
  list: Operation[];
}

export interface OperationCreate {
  data: Operation;
  message: string;
  code: number;
}

export interface OperationGet {
  data: Operation[];
  message: string;
  code: number;
}

export interface Operation {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OperationDelete {
  message: string;
  code: number;
}
