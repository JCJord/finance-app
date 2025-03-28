
export interface Client {
  id: number;
  name: string;
  salary: number;
  companyValuation: number;
  createdAt: string;  // You can change this to Date if you prefer
  updatedAt: string;  // You can change this to Date if you prefer
}

export interface ClientMetaData {
  clients: Client[];
  totalPages: number;
  currentPage: number;
}