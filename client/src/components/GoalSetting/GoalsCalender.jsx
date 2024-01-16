import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { Container, Card } from 'react-bootstrap';
import { baseURL } from './constant';

const GoalsCalendar = () => {
  const [goals, setGoals] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const fetchGoals = () => {
    axios.get(`${baseURL}/get`).then((res) => {
      console.log('Fetched Goals:', res.data);
      setGoals(res.data);
    }).catch((err) => console.log('Error fetching goals:', err));
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const shouldHighlightDate = (date) => {
    const shouldHighlightDate = (date) => {
        const formattedDate = date.toISOString().split('T')[0];
        console.log('Formatted Date:', formattedDate);
        console.log('Goals:', goals);
      
        // Check if any goal has a deadline on the selected date
        const highlight = goals.some((goal) => {
          const goalDate = new Date(goal.deadline);
          const goalDateString = goalDate.toISOString().split('T')[0];
          console.log(`Goal Date for "${goal.goal}":`, goalDateString);
          return goalDateString === formattedDate;
        });
      
        console.log('Should Highlight:', highlight);
        return highlight;
      };
      
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Card style={{ width: '400px', padding: '20px' }}>
        <h2 className="text-center">Goals Calendar</h2>
        <Calendar
          onChange={(date) => setSelectedDate(date)}
          value={selectedDate}
          tileClassName={({ date }) => shouldHighlightDate(date) ? 'highlighted' : null}
        />
      </Card>
    </Container>
  );
};

export default GoalsCalendar;
