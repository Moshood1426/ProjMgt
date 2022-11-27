"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const ClientSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Client name should be provided"],
    },
    email: {
        type: String,
        validate: {
            validator: validator_1.default.isEmail,
            message: "Please enter a valid email address",
        },
        require: [true, "Cient email should be provided"],
    },
    phone: {
        type: String,
        required: [true, "Client contact should be provided"],
    },
    userId: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "User",
        required: [true, "User should be provided"],
    },
});
exports.default = mongoose_1.default.model("Client", ClientSchema);
