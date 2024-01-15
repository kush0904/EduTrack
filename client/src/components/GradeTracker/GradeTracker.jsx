// GradeTracker.jsx
import './GradeTracker.css';
import UserImage from '../../assets/User.png';
import UniImage from '../../assets/university.png';
import degree from '../../assets/degree.png';
import id from '../../assets/Id.png';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

function GradeTracker() {
  const [grades, setGrades] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGrade, setNewGrade] = useState({
    subject: '',
    testType: '',
    date: '',
    maxMarks: 0,
    scoredMarks: 0,
  });
  const [isRemoveMode, setIsRemoveMode] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState('Subject');
  const [sortOrder, setSortOrder] = useState('ASC');
  const handleSortChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedSortOption(selectedOption);
    sortGrades(selectedOption, sortOrder);
  };

  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === 'ASC' ? 'DSC' : 'ASC';
    setSortOrder(newSortOrder);
    sortGrades(selectedSortOption, newSortOrder);
  };

  const sortGrades = (selectedOption, currentSortOrder) => {
    axios.post('http://localhost:3001/sortGrades', { selectedOption, currentSortOrder })
      .then(response => {
        setGrades(response.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    sortGrades(selectedSortOption, sortOrder);
  }, [selectedSortOption, sortOrder]);

  const [selectedFilterOption, setSelectedFilterOption] = useState('None');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filterValue, setFilterValue] = useState('');

  const handleFilterChange = (event) => {
    const selectedOption = event.target.value;

    if (selectedOption !== 'None') {
      setSelectedFilterOption(selectedOption);
      setIsFilterModalOpen(true);
    } else {
      setSelectedFilterOption('None');
      
      axios.get('http://localhost:3001/getGrades')
        .then(response => {
          setGrades(response.data);
        })
        .catch(err => console.log(err));
    }
  };

  const closeFilterModal = () => {
    setIsFilterModalOpen(false);
    setFilterValue(''); 
  };

  
  const applyFilter = () => {
    if (selectedFilterOption !== 'None') {
      axios.post('http://localhost:3001/filterGrades', {
        filterOption: selectedFilterOption,
        filterValue: filterValue,
      })
        .then(response => {
          console.log('Filtered data from server:', response.data);
          setGrades(response.data);
        })
        .catch(err => console.log(err));
    }
  
    closeFilterModal();
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
 
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const toggleRemoveMode = () => {
    setIsRemoveMode(!isRemoveMode);
  };

  const handleRemoveGrade = (id) => {
    axios.post('http://localhost:3001/removeGrade', { _id: id })
      .then(response => {
        console.log('Grade removed successfully:', response.data);
        setGrades(prevGrades => prevGrades.filter(grade => grade._id !== id));
      })
      .catch(err => console.log(err));
  };


  const calculatePercentage = (maxMarks, scoredMarks) => {
    if (maxMarks === 0) {
      return 0;
    }
    const percentage = (scoredMarks / maxMarks) * 100;
    return parseFloat(percentage.toFixed(2));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGrade(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddGrade = () => {
    axios.post('http://localhost:3001/addGrade', newGrade)
      .then(response => {
        setGrades(prevGrades => [...prevGrades, response.data]);
        setIsModalOpen(false);
        setNewGrade({
          subject: '',
          testType: '',
          date: '',
          maxMarks: 0,
          scoredMarks: 0,
        });
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="container">
      <div className="Box1">
        <div className='UserInfo'>
          <img src={UserImage} alt="User" className="user-image" /> 
          <span className="username">Gaurav Thakur</span>
          <img src={UniImage} alt="User" className="user-image" />
          <span className="username">Chitkra University</span>
          <img src={degree} alt="User" className="user-image" />
          <span className="username">Computer Science</span>
          <img src={id} alt="User" className="user-image" />
          <span className="username">2111981291</span>
        </div>
      </div>
      <div className="Box2">
        <div className='Heading'>
        <button className='Btn1' onClick={openModal}>Add Grades</button>
        <button className='Btn2' onClick={toggleRemoveMode}>
            {isRemoveMode ? 'Cancel Remove' : 'Remove Grades'}
          </button>
          <h1>Grades Tracker</h1>          
          <div>
          <label htmlFor="filterDropdown">Filter:</label>
            <select
              id="filterDropdown"
              className="Btn2"
              value={selectedFilterOption}
              onChange={handleFilterChange}
            >
              <option value="None">None</option>
              <option value="subject">Subject</option>
              <option value="testType">Test</option>
              <option value="maxMarks">Max</option>
              <option value="scoredMarks">Scored</option>
            </select>
          
          <Modal
          isOpen={isFilterModalOpen} 
          onRequestClose={closeFilterModal}
          contentLabel="Filter Modal"
          className="filter-modal" 
        >
          <h2>Filter by {selectedFilterOption}</h2>
          <form>
            <div className="form-group">
              <label htmlFor="filterValue">Enter {selectedFilterOption}:</label>
              <input
                type="text"
                id="filterValue"
                name="filterValue"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
              />
            </div>
            
            <button type="button" onClick={applyFilter}>Apply Filter</button>
          </form>
        </Modal>
        </div>
          <div>
          <label htmlFor="sortDropdown">Sort:</label>
        <select
          id="sortDropdown"
          className="Btn2"
          value={selectedSortOption}
          onChange={handleSortChange}
        >
          <option value="Subject">Subject</option>
          <option value="Test-type">Test</option>
          <option value="Max-Marks">Max</option>
          <option value="Scored Marks">Scored </option>
        </select>
        <button onClick={toggleSortOrder} className='removeBtn'>{sortOrder}</button>
        </div>
        </div>
        <hr style={{ height: '4px', border: 'none', backgroundColor: 'black', marginLeft: '8px', marginRight: '8px' }} />      
        <div className='Grades'>
          <table className='table'>
            <thead>
              <tr>
                <th>Sr.No</th>
                <th>Subject</th>
                <th>Test-Type</th>
                <th>Date</th>
                <th>Max-Marks</th>
                <th>Scored-Marks</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((grade, index) => (
                
                <tr key={index}>
                  <td className='srn'> {isRemoveMode && (
                    
                      <button onClick={() => handleRemoveGrade(grade._id)} className='removeBtn'>X</button>
                    )} {index + 1}</td>
                  <td>{grade.subject}</td>
                  <td>{grade.testType}</td>
                  <td>{grade.Date}</td>
                  <td>{grade.maxMarks}</td>
                  <td>{grade.scoredMarks}</td>
                  <td>{calculatePercentage(grade.maxMarks,grade.scoredMarks)}%</td>
                </tr>
              ))}
            </tbody>
          </table>  
        </div>
        <hr style={{ height: '4px', border: 'none', backgroundColor: 'black', marginLeft: '8px', marginRight: '8px' }} />      
        
          <Modal
  isOpen={isModalOpen}
  onRequestClose={closeModal}
  contentLabel="Add Grade Modal"
>
  <h2>Add Grade</h2>
  <form>
    <div className="form-group">
      <label htmlFor="subject">Subject:</label>
      <input
        type="text"
        id="subject"
        name="subject"
        value={newGrade.subject}
        onChange={handleInputChange}
      />
    </div>
    <div className="form-group">
      <label htmlFor="testType">Test Type:</label>
      <input
        type="text"
        id="testType"
        name="testType"
        value={newGrade.testType}
        onChange={handleInputChange}
      />
    </div>
    <div className="form-group">
      <label htmlFor="date">Date:</label>
      <input
        type="date"
        id="date"
        name="date"
        value={newGrade.date}
        onChange={handleInputChange}
      />
    </div>
    <div className="form-group">
      <label htmlFor="maxMarks">Max Marks:</label>
      <input
        type="number"
        id="maxMarks"
        name="maxMarks"
        value={newGrade.maxMarks}
        onChange={handleInputChange}
      />
    </div>
    <div className="form-group">
      <label htmlFor="scoredMarks">Scored Marks:</label>
      <input
        type="number"
        id="scoredMarks"
        name="scoredMarks"
        value={newGrade.scoredMarks}
        onChange={handleInputChange}
      />
    </div>
    <button type="button"  className='add' onClick={handleAddGrade}>Add Grade</button>
  </form>
</Modal>
       
      </div>
      
    </div>
  );
}

export default GradeTracker;
