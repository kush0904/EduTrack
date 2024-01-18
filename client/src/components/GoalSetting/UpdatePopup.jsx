// UpdatePopup.jsx
import React, { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import { baseURL } from './constant';
import axios from 'axios';

const UpdatePopup = ({ setShowPopup, popupContent, setUpdateUI, dateGoals }) => {
  const [updatedInput, setUpdatedInput] = useState(dateGoals && dateGoals.length > 0 ? dateGoals[0].goal : '');
  const [deadline, setDeadline] = useState(dateGoals && dateGoals.length > 0 ? dateGoals[0].deadline : '');

  const updateGoal = () => {
    if (!dateGoals || dateGoals.length === 0) {
      return;
    }
    const currentGoalId = dateGoals[0]._id; // Make sure to get the correct goal ID
    axios
      .put(`${baseURL}/updateGoals/${currentGoalId}`, { goal: updatedInput, deadline })
      .then((res) => {
        console.log(res.data);
        setUpdateUI((prevState) => !prevState);
        setShowPopup(false);
      })
      .catch((error) => {
        console.error(error);
        // Handle error, e.g., show an alert
      });
  };

  return (
    <div className='backdrop'>
      <div className="popup">
        <RxCross1 className='cross' onClick={() => setShowPopup(false)} />
        <h1>Update Goal</h1>
        <div className="popup__input_holder">
          <input
            value={updatedInput}
            onChange={(e) => setUpdatedInput(e.target.value)}
            type="text"
            placeholder="Update Goal.."
            style={{ backgroundColor: '#eaeaea', padding: '5px' }}
          />
          <br />
          <input
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            type="date"
            placeholder="Update Deadline Date.."
            style={{ backgroundColor: '#eaeaea', padding: '5px' }}
          />
          <button onClick={updateGoal} style={{ backgroundColor: '#eaeaea', padding: '5px' }}>Update</button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePopup;
