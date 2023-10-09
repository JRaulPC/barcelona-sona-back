export interface UserStructure {
  _id: string;
  uid?: string;
  name: string;
  password?: string;
  email?: string;
}

export interface SpotStructure {
  _id?: string;
  name: string;
  imageUrl: string;
  openingYear: number;
  spotUse: string;
  isVisited: boolean;
  description?: string;
  user: string;
}
