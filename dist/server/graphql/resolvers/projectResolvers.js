"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleProject = exports.getAllProjects = exports.deleteProject = exports.updateProject = exports.createProject = void 0;
const Client_1 = __importDefault(require("../../model/Client"));
const Projects_1 = __importDefault(require("../../model/Projects"));
//create project resolver
const createProject = async (parent, args, req) => {
    const { name, description, status, clientId } = args;
    if (!name || !description || !status || !clientId) {
        throw new Error("Kindly input all necessary details");
    }
    if (!req.isAuth) {
        throw new Error("User not allowed to access this route");
    }
    const userId = req.user.userId;
    const clientExists = await Client_1.default.findOne({
        _id: clientId,
        user: req.user.userId,
    });
    if (!clientExists) {
        throw new Error("Kindly input valid clientId");
    }
    const project = new Projects_1.default({
        name,
        description,
        status,
        clientId,
        userId,
    });
    await project.save();
    return {
        id: project._id.toString(),
        name: project.name,
        description: project.description,
        status: project.status,
        client: project.clientId,
        user: project.userId,
    };
};
exports.createProject = createProject;
//update project resolver
const updateProject = async (parent, args, req) => {
    const { name, description, status, projectId } = args;
    if (!name || !description || !status) {
        throw new Error("Kindly input all necessary details");
    }
    if (!req.isAuth) {
        throw new Error("User not allowed to access this route");
    }
    const userId = req.user.userId;
    const project = await Projects_1.default.findOne({ _id: projectId });
    if (!project) {
        throw new Error("Project cannot be found");
    }
    if (project.userId !== userId) {
        throw new Error("User not authorized to edit project");
    }
    project.name = name;
    project.description = description;
    project.status = status;
    await project.save();
    return {
        id: project._id.toString(),
        name: project.name,
        description: project.description,
        status: project.status,
        client: project.clientId,
        user: project.userId,
    };
};
exports.updateProject = updateProject;
const deleteProject = async (parent, args, req) => {
    let { id: projectId } = args;
    if (!req.isAuth) {
        throw new Error("User not allowed to access this route");
    }
    const userId = req.user.userId;
    const project = await Projects_1.default.findOne({ _id: projectId, userId });
    if (!project) {
        throw new Error("Project with id: " + projectId + " not found");
    }
    await project.remove();
    return {
        id: project._id.toString(),
        name: project.name,
        description: project.description,
        status: project.status,
        client: project.clientId,
        user: project.userId,
    };
};
exports.deleteProject = deleteProject;
const getSingleProject = async (parent, args, req) => {
    let { id: projectId } = args;
    if (!req.isAuth) {
        throw new Error("User not allowed to access this route");
    }
    const userId = req.user.userId;
    const project = await Projects_1.default.findOne({ _id: projectId, userId });
    if (!project) {
        throw new Error("Project with id: " + projectId + " not found");
    }
    return {
        id: project._id.toString(),
        name: project.name,
        description: project.description,
        status: project.status,
        client: project.clientId,
        user: project.userId,
    };
};
exports.getSingleProject = getSingleProject;
const getAllProjects = async (parent, args, req) => {
    if (!req.isAuth) {
        throw new Error("User not allowed to access this route");
    }
    const userId = req.user.userId;
    const projects = await Projects_1.default.find({ userId: userId });
    return projects.map((project) => ({
        id: project._id.toString(),
        name: project.name,
        description: project.description,
        status: project.status,
        client: project.clientId,
        user: project.userId,
    }));
};
exports.getAllProjects = getAllProjects;
