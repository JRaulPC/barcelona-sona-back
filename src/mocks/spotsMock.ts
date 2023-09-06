import mongoose from "mongoose";
import { type UserStructure, type SpotStructure } from "../types";

const userIdMongo = new mongoose.Types.ObjectId().toString();
export const authIdMock = new mongoose.Types.ObjectId().toString();

export const userMock: UserStructure = {
  _id: userIdMongo,
  uid: authIdMock,
  name: "Juan",
};

export const spotsMock: SpotStructure[] = [
  {
    _id: new mongoose.Types.ObjectId().toString(),
    name: "La modelo",
    imageUrl: "https://modelotesturl/jpg.com",
    opening: 1910,
    spotUse: "Jail",
    visited: true,
    description: "La modelo es una carcel contruida en el año...",
    user: userIdMongo,
  },
  {
    _id: new mongoose.Types.ObjectId().toString(),
    name: "Sagrada Familia",
    imageUrl: "https://sgradatesturl/jpg.com",
    opening: 1810,
    spotUse: "Cathedral",
    visited: true,
    description: "La Sagrada Familia es una Catedral diseñada por...",
    user: userIdMongo,
  },
];
