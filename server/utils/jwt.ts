import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const createJWT = (payload: any) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

const verifyJWT = ({ token }: { token: string }) => {
  return jwt.verify(token, process.env.JWT_SECRET!);
};

export { createJWT, verifyJWT };
