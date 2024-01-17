

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table, Dropdown, DropdownButton } from 'react-bootstrap';
import UpdatePopup from './UpdatePopup';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { baseURL } from './constant';
import './goalList.css';
import Header from '../Global/Header';

export default function GoalsList() {
  const [goals, setGoals] = useState([]);
  const [input, setInput] = useState('');
  const [updateUI, setUpdateUI] = useState(false);
  const [deadline, setDeadline] = useState(''); // Added line for deadline
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({});
  const [goalAdded, setGoalAdded] = useState(false); 

  useEffect(() => {
    axios.get(`${baseURL}/get`).then((res) => setGoals(res.data)).catch((err) => console.log(err));
  }, [updateUI]);

  const saveGoals = () => {
    axios
      .post(`${baseURL}/saveGoals`, { goal: input, deadline })
      .then((res) => {
        console.log(res.data);
        setUpdateUI((prevState) => !prevState);
        setInput('');
        setDeadline('');
        setGoalAdded(true); 
        setTimeout(() => setGoalAdded(false), 2000); 
      })
      .catch((err) => console.log(err));
  };

  const deleteGoal = (id) => {
    axios.delete(`${baseURL}/deleteGoals/${id}`).then((res) => {
      console.log(res.data);
      setUpdateUI((prevState) => !prevState);
    });
  };

  const updateGoals = (text, id,deadline) => {
    setPopupContent({ text, id,deadline });
    setShowPopup(true);
  };

  return (
    <>
      <main className="goalContainer m-3" >
        <div>
          <Header title="Keep a track of your goals" subtitle="" /> 
          <div className="input_holder">
            <input 
                value={input}
                 onChange={(e) => setInput(e.target.value)} 
                 type="text" 
                 style={{ backgroundColor: '#eaeaea', padding: '2px', color: 'black', width: '20vw', height:'6vh'}}
                 placeholder="Enter Goal.."
             />
             <label htmlFor="deadlineInput" style={{ marginTop: '10px' }}>
              Enter Deadline:
             </label>
             <input
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              type="date"
              style={{ backgroundColor: '#eaeaea', padding: '2px' ,width: '20vw', height:'6vh'}}
              placeholder="Enter deadline"
             />
            <button onClick={saveGoals} style={{backgroundColor: '#eaeaea', marginRight: '10px', border:'2px solid white', width: '12vw', height:'6vh'}}>ADD</button>

            <br />
            <div className="ml-auto">
              <button className="btn btn-success addGoalsButton2" style={{width: '14vw', height:'6vh'}}>
                <Nav.Link as={Link} to="/goalsCalender" className="btn" >
                  VIEW YOUR CALENDAR
                </Nav.Link>
              </button>
            </div>
          </div>
          
          {/* {goals.length > 0 && 
          <table className="goalTable">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Goal Name</th>
             
                <th>Deadline Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {goals.map((element, index) => (
                <tr key={element._id}>
                  <td>{index + 1}</td>
                  <td>{element.goal}</td>
            
                  <td>{element.deadline}</td> {/* Add this line */}
                  {/* <td>
                    <button className="editBtn" onClick={() => updateGoals(element.goal, element._id)}>Edit</button>
                    <button className="deleteBtn" onClick={() => deleteGoal(element._id)}>Delete</button>
                  </td>
                </tr> */}
              {/* ))} */}
            {/* </tbody>
          </table>} */} 

    {goals.length > 0 &&
    <Table striped bordered hover responsive className='GoalsList'>
          <thead>
            <tr>
                <th>S.No.</th>
                <th>Goal Name</th>
                <th>Deadline Date</th>
                <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {goals.map((element, index) => (
                <tr key={element._id}>
                  <td>{index + 1}</td>
                  <td>{element.goal}</td>
                  <td>{element.deadline}</td>
                  <td>
                    <button className="button-30" onClick={() => updateGoals(element.goal, element._id)}>Edit</button>
                    <button className="button-30" onClick={() => deleteGoal(element._id)}>Delete</button>
                  </td>
              </tr>
            ))}
          </tbody>
        </Table>}

        </div>
       
        {/* conditional rendering of the update popup */}
        {showPopup && <UpdatePopup setShowPopup={setShowPopup} popupContent={popupContent} setUpdateUI={setUpdateUI} />}
        

       
        <div className={`goalAddedPopup ${goalAdded ? 'show' : ''}`}>Goal added successfully!</div>
              
       
      </main>
    </>
  );
}