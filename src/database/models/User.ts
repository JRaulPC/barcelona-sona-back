import { Schema, model } from "mongoose";
import { type UserStructure } from "../../types";

const userSchema = new Schema<UserStructure>({
  authId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const User = model("User", userSchema, "users");

export default User;
