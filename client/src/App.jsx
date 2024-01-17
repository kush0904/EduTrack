import React, { useEffect, useState } from 'react';
import { ColorModeContext, useMode } from './components/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import './App.css';
import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom';

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

function App() {
  const [theme, colorMode] = useMode();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  if (!loggedIn) {
    return (
        <Router>
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <div className="app">
                        <Routes>
                            <Route path="/Login" element={<Login setLoggedIn={setLoggedIn} />} />
                            <Route path="/" element={<Login setLoggedIn={setLoggedIn} />} />
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
          <SideBars userName={userName} setUserName={setUserName} />
            <main className="content">
              <TopBar />
              <Routes>
                <Route path="/DashBoard" element={<DashBoard />} />
                <Route path="/UserForm" element={<UserForm />} />
                <Route path="/MarksForm" element={<MarksForm />} />
                <Route path="/team" element={<Team />} />
                <Route path="/GradeTracker" element={<GradeTracker setUserName={setUserName}/>}  />
                <Route path="/RankingSystem" element={<RankingSystem />} />
                <Route path="/GoalSetting" element={<GoalSetting />} />
                <Route path="/GoalsList" element={<GoalsList />} />
                <Route path="/goalsCalender" element={<GoalsCalendar />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Router>
  );
}

export default App;