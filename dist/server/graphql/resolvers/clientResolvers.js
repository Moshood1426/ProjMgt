"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClient = exports.getAllClients = exports.getSingleClient = void 0;
const Client_1 = __importDefault(require("../../model/Client"));
//get single client resolver
const getSingleClient = async (parent, args, req) => {
    let { id: clientId } = args;
    if (!req.isAuth) {
        throw new Error("User not allowed to access this route");
    }
    const userId = req.user.userId;
    if (parent.client) {
        clientId = parent.client;
    }
    const client = await Client_1.default.findOne({ _id: clientId, userId });
    if (!client) {
        throw new Error("Client with id: " + clientId + " not found");
    }
    return {
        id: client._id,
        name: client.name,
        email: client.email,
        phone: client.phone,
        userId: client === null || client === void 0 ? void 0 : client.userId,
    };
};
exports.getSingleClient = getSingleClient;
//get all client resolver
const getAllClients = async (parent, args, req) => {
    if (!req.isAuth) {
        throw new Error("User not allowed to access this route");
    }
    const userId = req.user.userId;
    const clients = await Client_1.default.find({ userId: userId });
    return clients;
};
exports.getAllClients = getAllClients;
//add a new client resolver
const createClient = async (parent, args, req) => {
    const { name, email, phone } = args;
    if (!name || !email || !phone) {
        throw new Error("Kindly input all essential details");
    }
    //req.auth to authenticate user
    if (!req.isAuth) {
        throw new Error("User not allowed to access this route");
    }
    //check if client exist..if yes, return client
    const clientExist = await Client_1.default.findOne({
        email: email,
        userId: req.user.userId,
    });
    if (clientExist) {
        return {
            id: clientExist._id.toString(),
            name: clientExist.name,
            email: clientExist.email,
            phone: clientExist.phone,
            userId: clientExist.userId,
        };
    }
    //add client to DB
    const client = new Client_1.default({ name, email, phone, userId: req.user.userId });
    await client.save();
    //return client
    return {
        id: client._id.toString(),
        name: client.name,
        email: client.email,
        phone: client.phone,
        userId: client.userId,
    };
};
exports.createClient = createClient;
