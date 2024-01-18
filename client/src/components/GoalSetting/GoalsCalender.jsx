import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { Container, Card, Modal, Button } from 'react-bootstrap';
import { baseURL } from './constant';

const GoalsCalendar = ({ userId }) => {
  const [goals, setGoals] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [deadlineDates, setDeadlineDates] = useState([]);
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [selectedGoalIndex, setSelectedGoalIndex] = useState(0);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const response = await axios.post(`${baseURL}/get`, { uid: userId });
      setGoals(response.data);
      const dates = response.data.map((goal) => new Date(goal.deadline));
      setDeadlineDates(dates);
    } catch (err) {
      console.error('Error fetching goals:', err);
    }
  };

  const shouldHighlightDate = (date) => {
    return (
      deadlineDates.some((deadline) => isSameDay(deadline, date)) &&
      !isSameDay(selectedDate, date)
    );
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const handleClick = (date) => {
    const selectedGoals = goals.filter((goal) => isSameDay(new Date(goal.deadline), date));
    setSelectedGoals(selectedGoals);
    setSelectedGoalIndex(0);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
      <Card style={{ width: '400px', padding: '20px' }}>
        <h2 className="text-center">Goals Calendar</h2>
        <Calendar
  onChange={(date) => setSelectedDate(date)}
  value={selectedDate}
  tileClassName={({ date }) => shouldHighlightDate(date) ? 'highlighted' : null}
  onClickDay={(date) => handleClick(date)}
  className="glow-calendar"
/>

        <Modal show={selectedGoals.length > 0} onHide={() => setSelectedGoals([])}>
          <Modal.Header style={{ background: 'linear-gradient(to right, #363636, #7F7F7F)' }}>
            <Modal.Title style={{ color: '#FFFFFF' }}>Goals Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedGoals.length > 0 && (
              <>
                <h5>Goals for {selectedDate.toDateString()}:</h5>
                <ul>
                  {selectedGoals.map((goal, index) => (
                    <li key={index}>
                      <strong>Goal:</strong> {goal.goal} <br />
                      <strong>Deadline:</strong> {goal.deadline} <br />
                      <hr />
                    </li>
                  ))}
                </ul>
                
              </>
            )}
          </Modal.Body>
          <Modal.Footer style={{ background: 'linear-gradient(to right,#7F7F7F,#363636)' }}>
            <Button variant="secondary" onClick={() => setSelectedGoals([])}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Card>

      <style>
        {`
        .glow-calendar{
          height:50vh;
          width:1500px;
          font-size:20px;
        }
          .highlighted {
            background-color: red;
            color: #FFFFFF;
            border-radius: 20%;
            padding: 8px;
            font-weight: bold;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
            transition: background-color 0.3s;
          }

          .highlighted:hover {
            background: linear-gradient(to right, red, yellow);
            color: black;
          }

          .modal-content {
            background-color: #f8f9fa;
            color: #000000;
          }

          .modal-header {
            background-color: #007BFF;
            color: #FFFFFF;
          }

          .modal-footer {
            background-color: #007BFF;
            color: #FFFFFF;
          }

          .modal-footer .btn-secondary:hover {
            background-color: #DC3545;
          }
        `}
      </style>
    </Container>
  );
};

export default GoalsCalendar;
