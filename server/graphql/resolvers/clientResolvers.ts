import Client from "../../model/Client";
import User from "../../model/User";
import ClientType from "../types/ClientType";
import ProjectType from "../types/ProjectType";
import UserType from "../types/UserType";

//get single client resolver
const getSingleClient = async (parent: any, args: any, req: any) => {
  let { id: clientId } = args;

  if (!req.isAuth) {
    throw new Error("User not allowed to access this route");
  }

  const userId = req.user.userId;

  if (parent.client) {
    clientId = parent.client;
  }

  const client = await Client.findOne({ _id: clientId, userId });

  if (!client) {
    throw new Error("Client with id: " + clientId + " not found");
  }

  return {
    id: client._id,
    name: client.name,
    email: client.email,
    phone: client.phone,
    userId: client?.userId,
  };
};

//get all client resolver
const getAllClients = async (parent: any, args: any, req: any) => {
  if (!req.isAuth) {
    throw new Error("User not allowed to access this route");
  }

  const userId = req.user.userId

  const clients = await Client.find({userId: userId})

  return clients
};

//add a new client resolver
const createClient = async (parent: any, args: any, req: any) => {
  const { name, email, phone } = args;

  if (!name || !email || !phone) {
    throw new Error("Kindly input all essential details");
  }

  //req.auth to authenticate user
  if (!req.isAuth) {
    throw new Error("User not allowed to access this route");
  }
  //check if client exist..if yes, return client
  const clientExist = await Client.findOne({
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
  const client = new Client({ name, email, phone, userId: req.user.userId });

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

export { getSingleClient, getAllClients, createClient };
