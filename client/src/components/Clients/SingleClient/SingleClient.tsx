import React from "react";
import { AiFillDelete } from "react-icons/ai";

interface SingleClientProps {
  index: number;
  name: string;
  email: string;
  phone: string;
}

const SingleClient: React.FC<SingleClientProps> = ({
  index,
  name,
  email,
  phone,
}) => {
  return (
    <tr>
      <td data-label="S/N">{index + 1}</td>
      <td data-label="Name">{name}</td>
      <td data-label="Email">{email}</td>
      <td data-label="Phone">{phone}</td>
      <td
        data-label="Delete"
        // onClick={() => getResults(item._id)}
        className="view-details"
      >
        <AiFillDelete />
      </td>
    </tr>
  );
};

export default SingleClient;
