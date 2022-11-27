"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ProjectSchema = new mongoose_1.default.Schema({
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
        type: mongoose_1.default.Types.ObjectId,
        ref: "Client",
        required: [true, "client must be provided"],
    },
    userId: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "User",
        required: [true, "user must be provided"],
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Project", ProjectSchema);
