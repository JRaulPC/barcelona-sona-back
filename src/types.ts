export interface UserStructure {
  _id: string;
  uid: string;
  name: string;
}

export interface SpotStructure {
  _id: string;
  name: string;
  imageUrl: string;
  opening: number;
  spotUse: string;
  visited: boolean;
  description: string;
  user: string;
}
