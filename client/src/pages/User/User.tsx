import React from "react";
import classes from "./User.module.css";
import logo from "../../assets/images/logo.svg";
import { IoIosPersonAdd } from "react-icons/io";
import { FcAddDatabase } from "react-icons/fc";
import { AllProjects, AllClients } from "../../components";
import { GrNext, GrPrevious } from "react-icons/gr";

const User = () => {
  return (
    <div>
      <nav className={classes.nav}>
        <div className={classes.nav_image}>
          <img src={logo} alt="logo" className="logo" />
        </div>
        <ul className={classes.nav_list}>
          {" "}
          <p className={`${classes.nav_list_item} ${classes.sign_in}`}>User</p>
        </ul>
      </nav>
      <section className={classes.header}>
        <div className={classes.header_btn}>
          <button className="btn">
            <FcAddDatabase className="btn_icon" />
            Add Project
          </button>
          <button className="btn">
            <IoIosPersonAdd className="btn_icon" />
            Add Client
          </button>
        </div>
      </section>
      <section className={classes.container}>
        <div className={classes.container_title}>
          <h3>Your Projects</h3>
          <div className={classes.btn_div}>
            <button className="btn">
              <GrPrevious className={classes.icon} />
            </button>
            <button className="btn">
              <GrNext className={classes.icon} />
            </button>
          </div>
        </div>

        <AllProjects />
      </section>
      
      <section className={`${classes.container} ${classes.table_container}`}>
        <h3 className={classes.client_list}>Client List</h3>
        <AllClients />
      </section>
    </div>
  );
};

export default User;
