// RankingSystem.jsx
import React, { useState, useEffect } from "react";
import { Button, Table, Dropdown, DropdownButton } from 'react-bootstrap';
import ScoreChart from './ScoreChart';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./RankingSystem.css"; 
import SearchBar from './SearchBar';
import Chart from 'chart.js/auto';
import Header from "../Global/Header";
const RankingSystem = ({ userId, allgrades, allSubjects, allTestTypes }) => {
  const [originalRankings, setOriginalRankings] = useState([]);
  const [rankings, setRankings] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("percentage");
  const [showAllRankings, setShowAllRankings] = useState(false);
  const [visibleRanks, setVisibleRanks] = useState(5);
  const [selectedSub, setselectedSub] = useState("DSA"); // Default to "DSA"
  const [selectedType, setselectedType] = useState("ST2"); // Default to "ST1"
  const [searchResults, setSearchResults] = useState("");

  useEffect(() => {
    setOriginalRankings(allgrades);
    setRankings(allgrades);
  }, [allgrades]);

  useEffect(() => {
    const filteredRankings = originalRankings.filter(
      (student) =>
        student.Name.toLowerCase().includes(searchResults.toLowerCase()) ||
        student.clg_id.includes(searchResults.toLowerCase())
    );
    setShowAllRankings(false);
    setRankings(filteredRankings);
  }, [searchResults, originalRankings]);

  const sortedRankings = rankings.sort((a, b) => b[selectedCategory] - a[selectedCategory]);

  const typeFilter = selectedSub === "All" ? sortedRankings : sortedRankings.filter(student => student.subject === selectedSub);

  const filteredRankings = selectedType === "All" ? typeFilter : typeFilter.filter(student => student.testType === selectedType);

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

  const loggedInStudentId = userId;
  const loggedInStudent = originalRankings.find((student) => student.clg_id === userId);
  const loggedInStudentRank = originalRankings.indexOf(loggedInStudent) + 1;

  const handleSeeAll = () => {
    setShowAllRankings(true);
    setselectedSub("DSA"); 
    setselectedType("ST2"); 
  };

  return (
    <div className="container mt-4" style={{ overflow: "auto", height: "80vh" }}>
      <Header title="Student Performance Rankings" subtitle="" />


      <div className="d-flex justify-content-between mb-3">
      <DropdownButton title={`Ranking by ${selectedCategory}`} variant="secondary" style={{ display: 'none' }}>
  <Dropdown.Item onClick={() => setSelectedCategory("percentage")}>Overall Percentage</Dropdown.Item>
  <Dropdown.Item onClick={() => setSelectedCategory("maxMarks")}>Marks</Dropdown.Item>
</DropdownButton>


        <DropdownButton title={`Show ${visibleRanks} Ranks`} variant="secondary">
          <Dropdown.Item onClick={() => handleVisibleRanksChange(5)}>5 Ranks</Dropdown.Item>
          <Dropdown.Item onClick={() => handleVisibleRanksChange(10)}>10 Ranks</Dropdown.Item>
          <Dropdown.Item onClick={() => handleVisibleRanksChange(15)}>15 Ranks</Dropdown.Item>
        </DropdownButton>

        <DropdownButton title={`Filter by Subject: ${selectedSub}`} variant="secondary">
          {allSubjects.map((subject, index) => (
            <Dropdown.Item key={index} onClick={() => handleSubFilter(subject)}>
              {subject}
            </Dropdown.Item>
          ))}
        </DropdownButton>

        {/* Test Types Dropdown */}
        <DropdownButton title={`Filter by Test-Type: ${selectedType}`} variant="secondary">
          {allTestTypes.map((testType, index) => (
            <Dropdown.Item key={index} onClick={() => handleTypeFilter(testType)}>
              {testType}
            </Dropdown.Item>
          ))}
        </DropdownButton>

      </div>

      <SearchBar onSearch={handleSearch} />
      <br />
      <table className="formal-table">
        <thead>
          <tr className="headings">
            <th>Rank</th>
            <th>Student Name</th>
            <th>College ID</th>
            <th>Subject</th>
            <th>Test-Type</th>
            <th>Marks</th>
            <th>Overall Percentage</th>
          </tr>
        </thead>
        <tbody>
        {displayedRankings.map((student, index) => {
  const isCurrentUser = student.clg_id == userId;
  console.log('clg_id:', student.clg_id, 'userId:', userId, 'isCurrentUser:', isCurrentUser);

  return (
    <tr key={index} className={isCurrentUser ? 'highlighted-row' : ''}>
      <td>{index + 1}</td>
      <td>{student.Name}</td>
      <td>{student.clg_id}</td>
      <td>{student.subject}</td>
      <td>{student.testType}</td>
      <td>{student.scoredMarks}</td>
      <td>{student.percentage}</td>
    </tr>
  );
})}

</tbody>
</table>
      <Button variant="primary" onClick={handleSeeAll}>See All</Button>
      <br />
      <ScoreChart rankings={displayedRankings} />
    </div>
  );
};

export default RankingSystem;
