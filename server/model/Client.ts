import mongoose from "mongoose";
import validator from "validator";

const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Client name should be provided"],
  },
  email: {
    type: String,
    validate: {
      validator: validator.isEmail,
      message: "Please enter a valid email address",
    },
    require: [true, "Cient email should be provided"],
  },
  phone: {
    type: String,
    required: [true, "Client contact should be provided"],
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "User should be provided"],
  },
});

export default mongoose.model("Client", ClientSchema);
