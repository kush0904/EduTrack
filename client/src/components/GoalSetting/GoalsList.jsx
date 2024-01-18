import React, { useState, useEffect } from 'react';
import GoalsCalendar from './GoalsCalender';
import { Table, Modal, Button } from 'react-bootstrap';
import UpdatePopup from './UpdatePopup';
import { baseURL } from './constant';
import './goalList.css';
import Header from '../Global/Header';
import ConfettiEffect from './ConfettiEffect';
import axios from 'axios';
export default function GoalsList({ userId }) {
  const [goals, setGoals] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [dateGoalsMap, setDateGoalsMap] = useState(new Map());
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({});
  const [goalAdded, setGoalAdded] = useState(false);
  const [goalCompleted, setGoalCompleted] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [achievedGoals, setAchievedGoals] = useState([]); 
  const [showAchievedGoals, setShowAchievedGoals] = useState(false); 

  useEffect(() => {
    axios
      .post(`${baseURL}/get`, { uid: userId })
      .then((res) => {
        const goalsMap = new Map();
        res.data.forEach((goal) => {
          const deadline = new Date(goal.deadline).toISOString().split("T")[0];
          if (!goalsMap.has(deadline)) {
            goalsMap.set(deadline, []);
          }
          goalsMap.get(deadline).push(goal);
        });
        setGoals(res.data);
        setDateGoalsMap(goalsMap);
      })
      .catch((err) => console.log(err));
  }, [updateUI]);

  const [input, setInput] = useState("");
  const [deadline, setDeadline] = useState("");

  const saveGoals = () => {
    const selectedDate = new Date(deadline);
    const currentDate = new Date();
  
    if (selectedDate < currentDate) {
      alert("Too late! Please select a future deadline.");
      return; 
    }
  
    axios
      .post(`${baseURL}/saveGoals`, { goal: input, deadline, id: userId })
      .then((res) => {
        console.log(res.data);
        setUpdateUI((prevState) => !prevState);
        setInput("");
        setDeadline("");
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

  const updateGoals = (text, id, deadline) => {
    setPopupContent({ text, id, deadline });
    setShowPopup(true);
  };

  const markAsCompleted = (goalId) => {
    axios.post(`${baseURL}/markAsCompleted`, { id: goalId }).then((res) => {
      console.log(res.data);
      setUpdateUI((prevState) => !prevState);
      setGoalCompleted(true);
      setTimeout(() => setGoalCompleted(false), 5000); 
    });
  };
  const fetchAchievedGoals = () => {
    if (showAchievedGoals) {
      setShowAchievedGoals(false);
    } else {
      axios.get(`${baseURL}/getCompletedGoals/${userId}`).then((res) => {
        console.log(res.data);
        setAchievedGoals(res.data);
        setShowAchievedGoals(true);
      });
    }
  };
  return (
    <>
      <main className="goalContainer m-3">
        <div>
          <Header title="Keep a track of your goals" subtitle="" />
          <div className="input_holder">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              style={{
                backgroundColor: "#eaeaea",
                padding: "2px",
                color: "black",
                width: "20vw",
                height: "6vh",
              }}
              placeholder="Enter Goal.."
            />
            <label htmlFor="deadlineInput" style={{ marginTop: "10px" }}>
              Enter Deadline:
            </label>
            <input
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              type="date"
              style={{
                backgroundColor: "#eaeaea",
                padding: "2px",
                width: "20vw",
                height: "6vh",
              }}
              placeholder="Enter deadline"
            />
            <button
              onClick={saveGoals}
              style={{
                backgroundColor: "#eaeaea",
                marginRight: "10px",
                border: "2px solid white",
                width: "12vw",
                height: "6vh",
              }}
            >
              ADD
            </button>

            <br />
            <div className="ml-auto">
            <Button
          className="btn btn-success addGoalsButton2"
          style={{ width: '14vw', height: '6vh' }}
          onClick={() => setShowCalendarModal(true)}
        >
          VIEW YOUR CALENDAR
        </Button>
            </div>
          </div>

          {goals.length > 0 && (
            <Table striped bordered hover responsive className="GoalsList">
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
                    <button
  className="button-30"
  onClick={() => updateGoals(element.goal, element._id, element.deadline)}
>
  Edit
</button>
                      <button
                        className="button-30"
                        onClick={() => deleteGoal(element._id)}
                      >
                        Delete
                      </button>
                      <button
                        className="button-30"
                        onClick={() => markAsCompleted(element._id)}
                      >
                        Task Completed
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
        {showPopup && (
          <UpdatePopup
            setShowPopup={setShowPopup}
            popupContent={popupContent}
            setUpdateUI={setUpdateUI}
            dateGoals={dateGoalsMap.get(popupContent.deadline)}
          />
        )}
        <div className={`goalAddedPopup ${goalAdded ? "show" : ""}`}>
          Goal added successfully!
        </div>
        <button onClick={fetchAchievedGoals} className="btn btn-success addGoalsButton2">
        {showAchievedGoals ? "Hide Achieved Goals" : "Show Achieved Goals"}
      </button>
      {showAchievedGoals && (
  <div className="achieved-goals-section">
   
   <Table striped bordered hover responsive className="GoalsAchieved">
  <thead>
    <tr>
      <th colSpan="3">Achieved Goals</th>
    </tr>
  </thead>
  <tbody>
    {achievedGoals.map((goal, index) => (
      index % 3 === 0 ? (
        <tr key={index}>
          <td>{achievedGoals[index]?.goal}</td>
          <td>{achievedGoals[index + 1]?.goal}</td>
          <td>{achievedGoals[index + 2]?.goal}</td>
        </tr>
      ) : null
    ))}
  </tbody>
</Table>
  </div>
)}

<Modal show={showCalendarModal} onHide={() => setShowCalendarModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Goals Calendar</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <GoalsCalendar userId={userId} />
          </Modal.Body>
        </Modal>
      {goalCompleted && <ConfettiEffect message="Well Done!" />}
      </main>
    </>
  );
}
