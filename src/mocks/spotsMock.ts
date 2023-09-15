import mongoose from "mongoose";
import { type UserStructure, type SpotStructure } from "../types";

export const laModeloMockId = "6hg54029hd839jdf";

export const authIdMock = "6efefte65f3fecknn5";

const userIdMongo = new mongoose.Types.ObjectId().toString();
export const userMock: UserStructure = {
  _id: userIdMongo,
  uid: "6efefte65f3fecknn5",
  name: "Juan",
};

export const spotsMock: SpotStructure[] = [
  {
    _id: new mongoose.Types.ObjectId().toString(),
    name: "La modelo",
    imageUrl: "https://modelotesturl/jpg.com",
    openingYear: 1910,
    spotUse: "Jail",
    isVisited: true,
    description: "La modelo es una carcel contruida en el año...",
    user: userIdMongo,
  },
  {
    _id: new mongoose.Types.ObjectId().toString(),
    name: "Sagrada Familia",
    imageUrl: "https://sgradatesturl/jpg.com",
    openingYear: 1810,
    spotUse: "Cathedral",
    isVisited: true,
    description: "La Sagrada Familia es una Catedral diseñada por...",
    user: userIdMongo,
  },
];

export const postSpotMock: Partial<SpotStructure> = {
  name: "La modelo",
  imageUrl: "https://modelotesturl/jpg.com",
  openingYear: 1910,
  spotUse: "Jail",
  isVisited: true,
  user: userIdMongo,
};

export const spotMock: SpotStructure = {
  _id: new mongoose.Types.ObjectId().toString(),
  name: "Sala apolo",
  imageUrl: "https://apolotestul/jpg.com",
  openingYear: 1910,
  spotUse: "club",
  isVisited: true,
  description: "La apolo es una sala contruida en el año...",
  user: userIdMongo,
};
