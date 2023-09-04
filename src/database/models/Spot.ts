import { Schema } from "mongoose";
import { type SpotStructure } from "../../types";

const spotSchema = new Schema<SpotStructure>({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  opening: {
    type: Number,
    required: true,
  },
  spotUse: {
    type: String,
    required: true,
  },
  visited: {
    type: Boolean,
    required: true,
  },
});

export default spotSchema;
