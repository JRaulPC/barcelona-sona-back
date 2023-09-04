export interface UserStructure {
  authId: string;
  name: string;
}

export interface SpotStructure {
  _id: string;
  name: string;
  imageUrl: string;
  opening: number;
  spotUse: string;
  visited: boolean;
}
