import mongoose from "mongoose";
import { type SpotStructure } from "../types";

export const spotsMock: SpotStructure[] = [
  {
    _id: new mongoose.Types.ObjectId().toString(),
    name: "La modelo",
    imageUrl: "https://modelotesturl/jpg.com",
    opening: 1910,
    spotUse: "Jail",
    visited: true,
  },
  {
    _id: new mongoose.Types.ObjectId().toString(),
    name: "Sagrada Familia",
    imageUrl: "https://sgradatesturl/jpg.com",
    opening: 1810,
    spotUse: "Cathedral",
    visited: true,
  },
];
