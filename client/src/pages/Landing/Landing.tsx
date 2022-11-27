import React, { useState } from "react";
import { FormItem } from "../../components";
import classes from "./Landing.module.css";
import introImg from "../../assets/images/undraw.svg";
import logo from "../../assets/images/logo.svg";

const Landing = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [isExistingUser, setIsExistingUser] = useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((prevValue) => ({ ...prevValue, [name]: value }));
  };

  return (
    <div>
      <nav className={classes.nav}>
        <div className={classes.nav_image}>
          <img src={logo} alt="logo" className="logo" />
        </div>
        <div className={classes.menu_btn}>
          <span className={classes.menu_btn__burger}></span>
        </div>
        <ul className={classes.nav_list}>
          <p
            onClick={() => setIsExistingUser(false)}
            className={`${classes.nav_list_item} ${classes.admin}`}
          >
            Register
          </p>
          <p
            onClick={() => setIsExistingUser(true)}
            className={`${classes.nav_list_item} ${classes.sign_in}`}
          >
            Sign In
          </p>
        </ul>
      </nav>

      <section>
        <div className={classes.intro_container}>
          <div className={classes.intro_img_div}>
            <img src={introImg} alt="asking questions" className="img" />
          </div>
          <div className={classes.intro_text_div}>
            <h2>
              Let's Help{" "}
              <span className={classes.manage_text}>Manage Your Projects</span>{" "}
              In One Place
            </h2>
            <p className={classes.intro_sub_title}>
              Lorem ipsum is placeholder text commonly used in the graphic,
              print, and publishing.
            </p>
            <form className={classes.intro_form}>
              <div className={classes.form_col}>
                <FormItem
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <FormItem
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              {isExistingUser && (
                <FormItem
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                />
              )}
              <button type="submit" className="btn btn-block">
                Get Started
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
