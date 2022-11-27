"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("../utils/jwt");
const authenticateUser = (req, res, next) => {
    const authHeader = req.headers;
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
        const { email, userId } = (0, jwt_1.verifyJWT)({ token });
        req.isAuth = true;
        req.user = { email, userId };
        next();
    }
    catch (error) {
        req.isAuth = false;
        next();
    }
};
exports.default = authenticateUser;
