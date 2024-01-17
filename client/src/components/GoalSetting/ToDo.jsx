
import React from 'react';

import axios from 'axios';
import { baseURL } from './constant';

const ToDo = ({ text, deadline,id, setUpdateUI, setShowPopup, setPopupContent }) => {
  const deleteGoal = () => {
    axios.delete(`${baseURL}/deleteGoals/${id}`).then((res) => {
      console.log(res.data);
      setUpdateUI((prevState) => !prevState);
    });
  };

  const updateGoals = () => {
    setPopupContent({ text, id });
    setShowPopup(true);
  };
  

  return (
    <tr>
      <td>{/* Serial Number Placeholder */}</td>
      <td>{text}</td>
      <td>{deadline}</td>
      <td>
        <button onClick={updateGoals}>Edit</button>
        <button onClick={deleteGoal}>Delete</button>
      </td>
    </tr>
  );
};

export default ToDo;