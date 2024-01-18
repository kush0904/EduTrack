import React, { useEffect, useState } from 'react';
import { ColorModeContext, useMode } from './components/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import './App.css';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

import SideBars from './components/Global/SideBar.jsx';
import TopBar from './components/Global/TopBar.jsx';
import DashBoard from './components/Dashboard/Dashboard.jsx';
import Login from './components/Authorization/Login.jsx';
import Register from './components/Authorization/Register.jsx';
import UserForm from './components/UserForm/UserForm.jsx';
import MarksForm from './components/MarksForm/MarksForm.jsx';
import Team from './components/Team/Team.jsx';
import GradeTracker from './components/GradeTracker/GradeTracker';
import RankingSystem from './components/RankingSystem/RankingSystem.jsx';
import GoalSetting from './components/GoalSetting/GoalSetting.jsx';
import GoalsList from './components/GoalSetting/GoalsList';
import GoalsCalendar from './components/GoalSetting/GoalsCalender.jsx';
import BooksResourcePage from './components/ResourceLibrary/ResourceLibrary.jsx';
import Faq from './components/Faq/Faq.jsx';

function App() {
  const [theme, colorMode] = useMode();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState(0);
  const [allgrades, setallGrades] = useState([]);
  const [allSubjects, setAllSubjects] = useState([]); 
  const [allTestTypes, setAllTestTypes] = useState([]);
  console.log(userId,allgrades,allSubjects,allTestTypes);
  useEffect(() => {
    const storedLoggedIn = localStorage.getItem('loggedIn');
    const storedUserName = localStorage.getItem('userName');
    const storedUserId = localStorage.getItem('userId');

    if (storedLoggedIn && storedUserName && storedUserId) {
      setLoggedIn(true);
      setUserName(storedUserName);
      setUserId(Number(storedUserId));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('loggedIn', loggedIn);
    localStorage.setItem('userName', userName);
    localStorage.setItem('userId', userId);
  }, [loggedIn, userName, userId]);

  
  if (!loggedIn) {
    return (
      <Router>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="app">
              <Routes>
                <Route
                  path="/Login"
                  element={<Login setLoggedIn={setLoggedIn} setUserName={setUserName} setUserId={setUserId}/>}
                />
                <Route path="/" element={<Login setLoggedIn={setLoggedIn} setUserName={setUserName} setUserId={setUserId}/>} />
                <Route path="/Register" element={<Register />} />

              </Routes>
            </div>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </Router>
    );
  }

  return (
    <Router>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <SideBars userName={userName} />
            <main className="content">
              <TopBar  />
              <Routes>
                <Route path="/" element={<DashBoard userName={userName} userId={userId} />} />
                <Route path="/UserForm" element={<UserForm />} />
                <Route path="/MarksForm" element={<MarksForm  />} />
                <Route path="/team" element={<Team  />} />
                <Route path="/GradeTracker" element={<GradeTracker userName={userName} userId={userId} setallGrades={setallGrades} setAllSubjects={setAllSubjects} setAllTestTypes={setAllTestTypes}/>} />
                <Route path="/RankingSystem" element={<RankingSystem userId={userId} allgrades={allgrades} allSubjects={allSubjects} allTestTypes={allTestTypes} />} />
                <Route path="/GoalSetting" element={<GoalSetting userName={userName} userId={userId}/>} />
                <Route path="/GoalsList" element={<GoalsList userName={userName} userId={userId}/>} />
                <Route path="/goalsCalender" element={<GoalsCalendar userName={userName} userId={userId} />} />
                <Route path="/ResourceLibrary" element={<BooksResourcePage userName={userName} userId={userId} />} />
                <Route path="/Faq" element={<Faq userName={userName} userId={userId} />} />


              </Routes> 
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Router>
  );

  
}

export default App;






















  

