export enum status {
  normal = "normal",
  pending = "pending",
  completed = "completed",
}

export interface initialStateCategory {
  categories: string[];
  status: status;
}
