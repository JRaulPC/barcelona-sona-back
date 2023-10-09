import { Schema, model } from "mongoose";
import { type UserStructure } from "../../types";

const userSchema = new Schema<UserStructure>({
  uid: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
});

const User = model("User", userSchema, "users");

export default User;
