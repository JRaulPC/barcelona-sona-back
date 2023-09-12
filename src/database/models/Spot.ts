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
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Spot = model("Spot", spotSchema, "spots");

export default Spot;
