import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { Container, Card, Modal, Button } from 'react-bootstrap'; // Assuming you have Bootstrap for the modal
import { baseURL } from './constant';

const GoalsCalendar = () => {
  const [goals, setGoals] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [deadlineDates, setDeadlineDates] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState(null);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const response = await axios.get(`${baseURL}/get`);
      setGoals(response.data);

      // Extract and store deadline dates in the state
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
    const selectedGoal = goals.find((goal) => isSameDay(new Date(goal.deadline), date));
    setSelectedGoal(selectedGoal);
  };

  const handleClose = () => {
    setSelectedGoal(null);
  };

   // Define an array of motivational quotes
   const motivationalQuotes = [
    "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
    "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt",
    "Believe you can and you're halfway there. - Theodore Roosevelt",
    "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
    "Your time is limited, don't waste it living someone else's life. - Steve Jobs"
    // Add more quotes as needed
  ];

  // Function to get a random motivational quote
  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    return motivationalQuotes[randomIndex];
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
          className="glow-calendar" // Add custom class for glow effect
          style={{ width: '100%', height: '400px' }} // Adjust the size of the calendar
        />

        <Modal show={!!selectedGoal} onHide={handleClose}>
          <Modal.Header  style={{ background: 'linear-gradient(to right, #363636, #7F7F7F)' }}>
            <Modal.Title style={{ color: '#FFFFFF' }}>Goal Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedGoal && (
              <>
                <p><strong>Goal Name:</strong> {selectedGoal.goal}</p>
                <p><strong>Deadline:</strong> {selectedGoal.deadline}</p>
                <hr />
                <p><em>"{getRandomQuote()}"</em></p>
              </>
            )}
          </Modal.Body>
          <Modal.Footer style={{ background: 'linear-gradient(to right,#7F7F7F,#363636)' }}>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Card>

      {/* Add the enhanced highlighted class styles */}
      <style>
        {`
          
          .highlighted {
            background-color: red; /* Dark green for background color */
            color: #FFFFFF; /* White for text color */
            border-radius: 20%; /* Rounded shape */
            padding: 8px; /* Adjust padding for spacing */
            font-weight: bold; /* Bold text */
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.3); /* Add a subtle shadow */
            transition: background-color 0.3s; /* Smooth transition for background color */
          }

          .highlighted:hover {
            background: linear-gradient(to right, red, yellow); /* Gradient background on hover with teal colors */
            color: black; /* White text color on hover */
          }
          .modal-content {
            background-color: #f8f9fa;
            color: #000000; /* Change text color to black for better visibility */
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
            background-color: #DC3545; /* Red color for close button on hover */
          }
        `}
      </style>
    </Container>
  );
};

export default GoalsCalendar;
