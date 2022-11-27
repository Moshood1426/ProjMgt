import { NextFunction } from "express";
import { verifyJWT } from "../utils/jwt";

export interface AuthUserRequest extends Request {
  isAuth?: boolean;
  user?: { email: string; userId: string };
}

const authenticateUser = (
  req: AuthUserRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers as unknown as { authorization: string };

  let token = authHeader.authorization;

  if (!token || !token.startsWith("Bearer ")) {
    req.isAuth = false;
    next();
    return;
  }

  if (token && token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  }

  try {
    const { email, userId } = verifyJWT({ token }) as {
      email: string;
      userId: string;
    };
    req.isAuth = true
    req.user = { email, userId };
    next();
  } catch (error) {
    req.isAuth = false
    next()
  }
};

export default authenticateUser
