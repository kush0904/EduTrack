

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
  const [goalAdded, setGoalAdded] = useState(false); // Modified line

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
        setGoalAdded(true); // Modified line
        setTimeout(() => setGoalAdded(false), 2000); // Modified line: Hide popup after 3 seconds
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
                 style={{ backgroundColor: '#eaeaea', padding: '5px', color: 'black', width: '30vw'}}
                 placeholder="Enter Goal.."
             />
             <input
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              type="date"
              style={{ backgroundColor: '#eaeaea', padding: '5px' , width: '30vw'}}
              placeholder="Enter deadline"
             />
            <button onClick={saveGoals} style={{backgroundColor: '#eaeaea', marginRight: '10px', border:'2px solid white'}}>ADD</button>

            <br />
            <div className="ml-auto">
              <button className="btn btn-success addGoalsButton2">
                <Nav.Link as={Link} to="/goalsCalender" className="btn">
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
    <Table striped bordered hover responsive>
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
                    <button className="btn btn-primary me-2" onClick={() => updateGoals(element.goal, element._id)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => deleteGoal(element._id)}>Delete</button>
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