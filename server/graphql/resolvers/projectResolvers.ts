import Client from "../../model/Client";
import Project from "../../model/Projects";

//create project resolver
const createProject = async (parent: any, args: any, req: any) => {
  const { name, description, status, clientId } = args;

  if (!name || !description || !status || !clientId) {
    throw new Error("Kindly input all necessary details");
  }

  if (!req.isAuth) {
    throw new Error("User not allowed to access this route");
  }

  const userId = req.user.userId;

  const clientExists = await Client.findOne({
    _id: clientId,
    user: req.user.userId,
  });
  if (!clientExists) {
    throw new Error("Kindly input valid clientId");
  }

  const project = new Project({
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

//update project resolver
const updateProject = async (parent: any, args: any, req: any) => {
  const { name, description, status, projectId } = args;

  if (!name || !description || !status) {
    throw new Error("Kindly input all necessary details");
  }

  if (!req.isAuth) {
    throw new Error("User not allowed to access this route");
  }

  const userId = req.user.userId;

  const project = await Project.findOne({ _id: projectId });
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

const deleteProject = async (parent: any, args: any, req: any) => {
  let { id: projectId } = args;

  if (!req.isAuth) {
    throw new Error("User not allowed to access this route");
  }

  const userId = req.user.userId;

  const project = await Project.findOne({ _id: projectId, userId });

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

const getSingleProject = async (parent: any, args: any, req: any) => {
  let { id: projectId } = args;

  if (!req.isAuth) {
    throw new Error("User not allowed to access this route");
  }

  const userId = req.user.userId;

  const project = await Project.findOne({ _id: projectId, userId });

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

const getAllProjects = async (parent: any, args: any, req: any) => {
  if (!req.isAuth) {
    throw new Error("User not allowed to access this route");
  }

  const userId = req.user.userId;

  const projects = await Project.find({ userId: userId });

  return projects.map((project) => ({
    id: project._id.toString(),
    name: project.name,
    description: project.description,
    status: project.status,
    client: project.clientId,
    user: project.userId,
  }));
};

export {
  createProject,
  updateProject,
  deleteProject,
  getAllProjects,
  getSingleProject,
};
