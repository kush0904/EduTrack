// RankingSystem.jsx
import React, { useState, useEffect } from "react";
import { Button, Table, Dropdown, DropdownButton } from 'react-bootstrap';
import ScoreChart from './ScoreChart';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./RankingSystem.css"; 
import SearchBar from './SearchBar';
import Chart from 'chart.js/auto';

const RankingSystem = () => {
  
    const [originalRankings, setOriginalRankings] = useState([]); // Maintain original data
    const [rankings, setRankings] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("score"); 
    const [showAllRankings, setShowAllRankings] = useState(false);
    const [visibleRanks, setVisibleRanks] = useState(5);
    const [selectedClass, setSelectedClass] = useState("All");
    const [searchResults, setSearchResults] = useState("");

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:3001/api/rankings');
          const data = await response.json();
          setOriginalRankings(data);
          setRankings(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }, []);

    useEffect(() => {
      // Filter rankings based on search term
      const filteredRankings = originalRankings.filter(
        (student) =>
          student.studentName.toLowerCase().includes(searchResults.toLowerCase()) ||
          student.class.toLowerCase().includes(searchResults.toLowerCase()) ||
          student.roll_no.toString().includes(searchResults)
      );
      setShowAllRankings(false); // Reset to show limited ranks
      setRankings(filteredRankings);
    }, [searchResults, originalRankings]);

    const sortedRankings = rankings.sort((a, b) => b[selectedCategory] - a[selectedCategory]);

    const filteredRankings = selectedClass === "All"
    ? sortedRankings
    : sortedRankings.filter(student => student.class === selectedClass);

    const handleClassFilter = (selectedClass) => {
      setSelectedClass(selectedClass);
      setShowAllRankings(false); 
    };
  
    const handleVisibleRanksChange = (value) => {
      setVisibleRanks(value);
      setShowAllRankings(false); 
    };

    const displayedRankings = showAllRankings ? filteredRankings : filteredRankings.slice(0, visibleRanks);

    const handleSearch = (term) => {
      setSearchResults(term);
    };
    

    return (
      <div className="container mt-4">
        <h1 className="text-center mb-4">Ranking System</h1>

        <div className="d-flex justify-content-between mb-3">
          <DropdownButton title={`Ranking by ${selectedCategory}`} variant="secondary">
            <Dropdown.Item onClick={() => setSelectedCategory("score")}>Score</Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedCategory("attendance")}>Attendance</Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedCategory("behavior")}>Behavior</Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedCategory("extracurricular")}>Extracurricular</Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedCategory("homework")}>Homework Completion</Dropdown.Item>
          </DropdownButton>
  
          <DropdownButton title={`Show ${visibleRanks} Ranks`} variant="secondary">
            <Dropdown.Item onClick={() => handleVisibleRanksChange(5)}>5 Ranks</Dropdown.Item>
            <Dropdown.Item onClick={() => handleVisibleRanksChange(10)}>10 Ranks</Dropdown.Item>
            <Dropdown.Item onClick={() => handleVisibleRanksChange(15)}>15 Ranks</Dropdown.Item>
          </DropdownButton>
  
          <DropdownButton title={`Filter by Class: ${selectedClass}`} variant="secondary">
            <Dropdown.Item onClick={() => handleClassFilter("All")}>All Classes</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClassFilter("10A")}>Class 10A</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClassFilter("10B")}>Class 10B</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClassFilter("10C")}>Class 10C</Dropdown.Item>
          </DropdownButton>
        </div>
  
        <SearchBar onSearch={handleSearch} />
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Student Name</th>
              <th>Roll No.</th>
              <th>Class</th>
              <th>Score</th>
              <th>Attendance</th>
              <th>Behavior</th>
              <th>ExtraCurricular</th>
              <th>Homework</th>
            </tr>
          </thead>
          <tbody>
            {displayedRankings.map((student, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{student.studentName}</td>
                <td>{student.roll_no}</td>
                <td>{student.class}</td>
                <td>{student.score}%</td>
                <td>{student.attendance}%</td>
                <td>{student.behavior}%</td>
                <td>{student.extracurricular}%</td>
                <td>{student.homework}%</td>
              </tr>
            ))}
          </tbody>
        </Table>
              
        <Button variant="primary" onClick={()=>{setShowAllRankings(true)}}>See All</Button>


        <br/>
        <ScoreChart rankings={displayedRankings}/>
      </div>
    );
  };
  
export default RankingSystem;
