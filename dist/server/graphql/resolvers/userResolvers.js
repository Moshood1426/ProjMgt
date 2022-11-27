"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleUser = exports.loginUser = exports.registerUser = void 0;
const User_1 = __importDefault(require("../../model/User"));
const jwt_1 = require("../../utils/jwt");
//register resolver
const registerUser = async (parent, args) => {
    const { email, name, password } = args;
    if (!email || !name || !password) {
        throw Error("Kindly input all details");
    }
    const user = new User_1.default({ email, name, password });
    await user.save();
    const token = (0, jwt_1.createJWT)({ email: user.email, userId: user._id });
    return {
        id: user._id.toString(),
        token: token,
    };
};
exports.registerUser = registerUser;
//login resolver
const loginUser = async (parent, args) => {
    const { email, password } = args;
    if (!email || !password) {
        throw Error("Email and password cannot be empty");
    }
    const user = await User_1.default.findOne({ email: email });
    if (!user) {
        throw Error("Invalid Credentials. Kindly input valid email and password");
    }
    //@ts-ignore
    const passwordIsValid = await user.comparePassword(password);
    if (!passwordIsValid) {
        throw Error("Invalid Credentials. Kindly input valid email and password");
    }
    const token = (0, jwt_1.createJWT)({ email: user.email, userId: user._id });
    return {
        id: user._id.toString(),
        token: token,
    };
};
exports.loginUser = loginUser;
//get single user resolver
const getSingleUser = async (parent, args, req) => {
    const { id } = args;
    if (!req.isAuth) {
        throw new Error("User not allowed to access this route");
    }
    const userId = parent.user || req.user.userId;
    console.log(parent.user);
    const user = await User_1.default.findById(userId);
    if (!user) {
        throw Error("User with id: " + id + " does not exist");
    }
    return { name: user.name, email: user.email, id: user._id.toString() };
};
exports.getSingleUser = getSingleUser;
