import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Project name should be provided"],
  },
  description: {
    type: String,
    required: [true, "Project description should not be empty"],
  },
  status: {
    type: String,
    enum: ["not started", 'in progress', 'completed'],
  },
  clientId: {
    type: mongoose.Types.ObjectId,
    ref: "Client",
    required: [true, "client must be provided"],
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "user must be provided"],
  },
}, { timestamps: true });

export default mongoose.model("Project", ProjectSchema);
