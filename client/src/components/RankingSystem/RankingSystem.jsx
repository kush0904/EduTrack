// RankingSystem.jsx
import React, { useState, useEffect } from "react";
import { Button, Table, Dropdown, DropdownButton } from 'react-bootstrap';
import ScoreChart from './ScoreChart';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./RankingSystem.css"; 
import SearchBar from './SearchBar';
import Chart from 'chart.js/auto';
import Header from "../Global/Header";
import LoggedInStudentInfo from './LoggedInStudentInfo';

const RankingSystem = ({userName , userId}) => {
  
    const [originalRankings, setOriginalRankings] = useState([]); // Maintain original data
    const [rankings, setRankings] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("percentage"); 
    const [showAllRankings, setShowAllRankings] = useState(false);
    const [visibleRanks, setVisibleRanks] = useState(5);
    const [selectedSub, setselectedSub] = useState("All");
    const [selectedType, setselectedType] = useState("All");
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
          student.Name.toLowerCase().includes(searchResults.toLowerCase()) ||
          student.clg_id.includes(searchResults.toLowerCase())
      );
      setShowAllRankings(false); // Reset to show limited ranks
      setRankings(filteredRankings);
    }, [searchResults, originalRankings]);

    const sortedRankings = rankings.sort((a, b) => b[selectedCategory] - a[selectedCategory]);

    const typeFilter = selectedSub === "All"
    ? sortedRankings
    : sortedRankings.filter(student => student.subject === selectedSub);
    
    const filteredRankings = selectedType === "All" ? typeFilter 
    : typeFilter.filter(student => student.testType === selectedType);

    const handleSubFilter = (selectedSub) => {
      setselectedSub(selectedSub);
      setShowAllRankings(false); 
    };
  
    const handleTypeFilter = (selectedType) => {
      setselectedType(selectedType);
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
    
    const loggedInStudentId="GHI101";
    // Find the logged-in student
  const loggedInStudent = originalRankings.find((student) => student.clg_id === loggedInStudentId);

  // Calculate rank or performance of the logged-in student
  const loggedInStudentRank = originalRankings.indexOf(loggedInStudent) + 1;


    return (
<div className="container mt-4" style={{ overflow: "auto", height: "80vh" }}>
      <Header title="Student Performance Rankings" subtitle="" />

      <LoggedInStudentInfo loggedInStudent={loggedInStudent} loggedInStudentRank={loggedInStudentRank}/>

        <div className="d-flex justify-content-between mb-3">
        
        <DropdownButton title={`Ranking by ${selectedCategory}`} variant="secondary">
  <Dropdown.Item onClick={() => setSelectedCategory("percentage")}>Overall Percentage</Dropdown.Item>
  <Dropdown.Item onClick={() => setSelectedCategory("maxMarks")}>Marks</Dropdown.Item>
</DropdownButton>

  
          <DropdownButton title={`Show ${visibleRanks} Ranks`} variant="secondary">
            <Dropdown.Item onClick={() => handleVisibleRanksChange(5)}>5 Ranks</Dropdown.Item>
            <Dropdown.Item onClick={() => handleVisibleRanksChange(10)}>10 Ranks</Dropdown.Item>
            <Dropdown.Item onClick={() => handleVisibleRanksChange(15)}>15 Ranks</Dropdown.Item>
          </DropdownButton>
  
          <DropdownButton title={`Filter by Test-Type: ${selectedType}`} variant="secondary">
            <Dropdown.Item onClick={() => handleTypeFilter("All")}>All</Dropdown.Item>
            <Dropdown.Item onClick={() => handleTypeFilter("ST1")}>ST1</Dropdown.Item>
            <Dropdown.Item onClick={() => handleTypeFilter("ST2")}>ST2</Dropdown.Item>
            <Dropdown.Item onClick={() => handleTypeFilter("ST3")}>ST3</Dropdown.Item>
            <Dropdown.Item onClick={() => handleTypeFilter("END-TERM")}>END-TERM</Dropdown.Item>
          </DropdownButton>

          <DropdownButton title={`Filter by Subject: ${selectedSub}`} variant="secondary">
            <Dropdown.Item onClick={() => handleSubFilter("All")}>All</Dropdown.Item>
            <Dropdown.Item onClick={() => handleSubFilter("DSA")}>DSA</Dropdown.Item>
            <Dropdown.Item onClick={() => handleSubFilter("WDMS")}>WDMS</Dropdown.Item>
            <Dropdown.Item onClick={() => handleSubFilter("NALR")}>NALR</Dropdown.Item>
            <Dropdown.Item onClick={() => handleSubFilter("English")}>English</Dropdown.Item>
          </DropdownButton>
        </div>

        <SearchBar onSearch={handleSearch} />
        <br />
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Student Name</th>
              <th>College ID</th>
              <td>Subject</td>
              <td>Test-Type</td>
              <td>Marks</td>
              <th>Overall Percentage</th>
            </tr>
          </thead>
          <tbody>
            {displayedRankings.map((student, index) => (
              <tr key={index} className={student.clg_id === loggedInStudentId ? 'highlighted-row' : ''}>
                <td>{index + 1}</td>
                <td>{student.Name}</td>
                <td>{student.clg_id}</td>
                <td>{student.subject}</td>
                <td>{student.testType}</td>
                <td>{student.scoredMarks}</td>
                <td>{student.percentage}</td>
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
