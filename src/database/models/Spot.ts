import { Schema, model } from "mongoose";

const spotSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  openingYear: {
    type: Number,
    required: true,
  },
  spotUse: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isVisited: {
    type: Boolean,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Spot = model("Spot", spotSchema, "spots");

export default Spot;
