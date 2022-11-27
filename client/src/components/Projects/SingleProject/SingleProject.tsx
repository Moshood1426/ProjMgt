import React from "react";
import classes from "./SingleProject.module.css";

interface SingleProjectProps {
  name: string;
  status: string;
}

const SingleProject: React.FC<SingleProjectProps> = ({ name, status }) => {
  return (
    <div className={classes.single_project}>
      <div>
        <h5 className={classes.single_project_title}>{name}</h5>
        <p className={classes.single_project_subtitle}>
          status: <span className={classes.status}>{status}</span>
        </p>
      </div>
      <button className={`btn ${classes.single_project_btn}`}>View</button>
    </div>
  );
};

export default SingleProject;
