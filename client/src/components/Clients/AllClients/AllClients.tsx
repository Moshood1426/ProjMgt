import React, { useState } from "react";
import SingleClient from "../SingleClient/SingleClient";
import classes from "./AllClients.module.css";

const AllClients = () => {
  const [data, setData] = useState([
    {
      name: "Harbdoul",
      email: "harbdoul.yemi10@gmail.com",
      phone: "6788276631",
    },
    {
      name: "Harbdoul",
      email: "harbdoul.yemi10@gmail.com",
      phone: "6788276631",
    },
    {
      name: "Harbdoul",
      email: "harbdoul.yemi10@gmail.com",
      phone: "6788276631",
    },
  ]);

  return (
    <table className={classes.table}>
      <thead className={classes.table_thead}>
        <th>S/N</th>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Delete</th>
      </thead>
      <tbody className={classes.table_tbody}>
        {data.map((item, index) => (
          <SingleClient key={index} {...item} index={index} />
        ))}
      </tbody>
    </table>
  );
};

export default AllClients;
