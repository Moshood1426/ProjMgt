import React, { useState } from "react";
import SingleProject from "../SingleProject/SingleProject";
import classes from "./AllProjects.module.css";

const AllProjects = () => {
  const [projects, setProjects] = useState([
    { name: "Quizzal Project", status: "completed" },
    { name: "Quizzal Project", status: "completed" },
    { name: "Quizzal Project", status: "completed" },
    { name: "Quizzal Project", status: "completed" },
  ]);

  return (
    <div className={classes.container}>
      {projects.map((item, index) => (
        <SingleProject key={index} name={item.name} status={item.status} />
      ))}
    </div>
  );
};

export default AllProjects;
