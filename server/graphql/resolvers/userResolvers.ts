import ClientType from "../types/ClientType";
import ProjectType from "../types/ProjectType";
import UserType from "../types/UserType";
import User from "../../model/User";
import { createJWT } from "../../utils/jwt";
import AuthType from "../types/AuthType";

//register resolver
const registerUser = async (parent: any, args: any) => {
  const { email, name, password } = args;

  if (!email || !name || !password) {
    throw Error("Kindly input all details");
  }

  const user = new User({ email, name, password });

  await user.save();

  const token = createJWT({ email: user.email, userId: user._id });

  return {
    id: user._id.toString(),
    token: token,
  };
};

//login resolver
const loginUser = async (parent: any, args: any) => {
  const { email, password } = args;

  if (!email || !password) {
    throw Error("Email and password cannot be empty");
  }

  const user = await User.findOne({ email: email });
  if (!user) {
    throw Error("Invalid Credentials. Kindly input valid email and password");
  }

  //@ts-ignore
  const passwordIsValid = await user.comparePassword(password);
  if (!passwordIsValid) {
    throw Error("Invalid Credentials. Kindly input valid email and password");
  }

  const token = createJWT({ email: user.email, userId: user._id });

  return {
    id: user._id.toString(),
    token: token,
  };
};

//get single user resolver
const getSingleUser = async (parent: any, args: any, req: any) => {
  const { id } = args;

  if (!req.isAuth) {
    throw new Error("User not allowed to access this route");
  }

  const userId = parent.user || req.user.userId
  console.log(parent.user)
  const user = await User.findById(userId);
  if (!user) {
    throw Error("User with id: " + id + " does not exist");
  }

  return { name: user.name, email: user.email, id: user._id.toString() };
};

export { registerUser, loginUser, getSingleUser };
