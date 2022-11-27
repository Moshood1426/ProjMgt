"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_graphql_1 = require("express-graphql");
const schema_1 = __importDefault(require("./graphql/schema"));
const connectDB_1 = __importDefault(require("./config/connectDB"));
const cors_1 = __importDefault(require("cors"));
const authUser_1 = __importDefault(require("./middleware/authUser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use((0, cors_1.default)());
//@ts-ignore
app.use(authUser_1.default);
app.use("/graphql", (0, express_graphql_1.graphqlHTTP)({
    schema: schema_1.default,
    graphiql: process.env.NODE_ENV === "development" ? true : false,
}));
const start = async () => {
    try {
        await (0, connectDB_1.default)(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
    catch (error) {
        console.log(error);
    }
};
start();
