// GradeTracker.jsxAdd
import'./GradeTracker.css'
import UserImage from '../../assets/User.png';
import UniImage from '../../assets/university.png';
import degree from '../../assets/degree.png';
import id from '../../assets/Id.png';
import React, { useState, useEffect } from 'react';
import axios, { all } from 'axios';
import Modal from 'react-modal';
import { Box } from '@mui/material';
import Header from '../Global/Header';

function GradeTracker({userName,userId,setallGrades,setAllTestTypes,setAllSubjects}) {
  const [grades, setGrades] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGrade, setNewGrade] = useState({
    subject: '',
    testType: '',
    maxMarks: 0,
    scoredMarks: 0,
  });

  const [isRemoveMode, setIsRemoveMode] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState('Subject');
  const [sortOrder, setSortOrder] = useState('ASC');


  
  const fetchGrades = () => {
    axios.get('http://localhost:4001/getGrades')
      .then(response => {
        setGrades(response.data);
        })
      .catch(err => console.log(err));
  }; 
useEffect(() => {
  fetchGrades(); 
}, []); 
const fetchRanksData = () => {
  axios.get('http://localhost:4001/getRanksData')
  .then(response => {
    const grades = response.data.grades;
    const subjects = response.data.subjects;
    const tests=response.data.tests;
    setallGrades(grades);
    setAllSubjects(subjects);
    setAllTestTypes(tests);


  })
    .catch(err => console.log(err));
}; 
useEffect(() => {
  fetchRanksData(); 
}, []); 

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
    axios.post('http://localhost:4001/sortGrades', { selectedOption, currentSortOrder })
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
      
      axios.get('http://localhost:4001/getGrades')
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
      axios.post('http://localhost:4001/filterGrades', {
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
    axios.post('http://localhost:4001/removeGrade', { _id: id })
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
        axios.post('http://localhost:4001/addGrade', newGrade)
          .then(response => {
            setGrades(prevGrades => [...prevGrades, response.data]);
            setIsModalOpen(false);
            setNewGrade({
              subject: '',
              testType: '',
              maxMarks: 0,
              scoredMarks: 0,

            
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };

  return (
    
    <Box m="20px"  style={{ overflow: "auto", height: "80vh" }}x>
    <Header title = "Grades Tracker" subtitle="Look!! Where you stand" />
    <div className="Grade-container">
      <div className="Grade-Box1">
        <div className='Grade-UserInfo'>
          <img src={UserImage} alt="User" className="Grade-user-image" /> 
          <span className="Grade-username">{userName} </span>
          <img src={UniImage} alt="User" className="Grade-user-image" />
          <span className="Grade-username">Chitkara University</span>
          <img src={degree} alt="User" className="Grade-user-image" />
          <span className="Grade-username">Computer Science</span>
          <img src={id} alt="User" className="Grade-user-image" />
          <span className="Grade-username">{userId}</span>
        </div>
      </div>
      <div className="Grade-Box2">
        <div className='Grade-Heading'>
        <button className='button-30' onClick={openModal}>Add Data</button>
        <button className="button-30" role="button"  onClick={toggleRemoveMode}>
          {isRemoveMode ? 'Cancel ' : 'Remove Data '}
        </button>
      
          <div>
          <label htmlFor="filterDropdown" className='Grade-label'></label>
            <select
              id="filterDropdown"
              className="button-30"
              value={selectedFilterOption}
              onChange={handleFilterChange}
            >
              <option value="None">Filter [none]</option>
              <option value="subject">Filter by Subject</option>
              <option value="testType">Filter by Test</option>
              <option value="maxMarks">Filter by Max</option>
              <option value="scoredMarks">Filter by Scored</option>
            </select>
          
          <Modal
          isOpen={isFilterModalOpen} 
          onRequestClose={closeFilterModal}
          contentLabel="Filter Modal"
          className="Grade-filter-modal" 
        >
          <h2 className='Grade-h2'>Filter by {selectedFilterOption}</h2>
          <form className='Grade-form'>
            <div className="Grade-form-group">
              <label htmlFor="filterValue" className='Grade-label'>Enter {selectedFilterOption}:</label>
              <input
              className='Grade-input'
                type="text"
                id="filterValue"
                name="filterValue"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
              />
            </div>
            
            <button type="Btn1" onClick={applyFilter}>Apply Filter</button>
          </form>
        </Modal>
        </div>
          <div>
          <label htmlFor="sortDropdown" className='Grade-label'></label>
        <select
          id="sortDropdown"
          className="button-30"
          value={selectedSortOption}
          onChange={handleSortChange}
        >
          <option value="Subject">Sort By Subject</option>
          <option value="Test-type">Sort By Test</option>
          <option value="Max-Marks">Sort By Max</option>
          <option value="Scored Marks">Sort By Scored </option>
        </select>
        <button onClick={toggleSortOrder} className='button-30'>{sortOrder}</button>
        </div>
        </div>
        <hr style={{ height: '2px', border: 'none', backgroundColor: 'hsl( 196.18deg 100% 52.75% )', marginLeft: '8px', marginRight: '8px' }} />      
        <div className='Grade-Grades'>
          <table className='Grade-table'>
            <thead>
              <tr className='Grade-Titles'>
                <th>Sr.No</th>
                <th>Subject</th>
                <th>Test-Type</th>
                <th>Max-Marks</th>
                <th>Scored-Marks</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>

              {grades.map((grade, index) => (
                
                <tr key={index} className='Grade.sr'>
                  <td className='Grade-srn'> {isRemoveMode && (
                    
                      <button onClick={() => handleRemoveGrade(grade._id)} className='Grade-removeBtn'>X</button>
                    )} {index + 1}</td>
                    
                  <td>{grade.subject}</td>
                  <td>{grade.testType}</td>
                  <td>{grade.maxMarks}</td>
                  <td>{grade.scoredMarks}</td>
                  <td>{calculatePercentage(grade.maxMarks,grade.scoredMarks)}%</td>
                </tr>
              ))}
            </tbody>
          </table>  
        </div>
        <hr style={{ height: '3px', border: 'none', backgroundColor: 'hsl( 196.18deg 100% 52.75% )', marginLeft: '8px', marginRight: '8px', }} />      
        <Modal className={'Grade-addModal'}
  isOpen={isModalOpen}
  onRequestClose={closeModal}
  contentLabel="Add Grade Modal"
>
  <h2 className='Grade-h2'>Add Grade</h2>
  <form className='Grade-form'>
    <div className="Grade-form-group">
      <label htmlFor="subject" className='Grade-label'>Subject:</label>
      <select
        className='Grade-input'
        id="subject"
        name="subject"
        value={newGrade.subject}
        onChange={handleInputChange}
      >
        <option value="">Select Subject</option> {/* Default "Select" option */}
        <option value="DSA">DSA</option>
        <option value="JAVA">JAVA</option>
        <option value="NALR">NALR</option>
        <option value="ENGLISH">ENGLISH</option>
        <option value="WDMS">WDMS</option>
      </select>
    </div>
    <div className="Grade-form-group">
      <label htmlFor="testType" className='Grade-label'>Test Type:</label>
      <select
        id="testType"
        name="testType"
        value={newGrade.testType}
        onChange={handleInputChange}
        className='Grade-input'
      >
        <option value="">Select Test Type</option> {/* Default "Select" option */}
        <option value="ST1">ST1</option>
        <option value="ST2">ST2</option>
        <option value="ST3">ST3</option>
        <option value="ETE">ETE</option>
        <option value="FA1">FA1</option>
        <option value="FA2">FA2</option>
      </select>
    </div>
    
    <div className="Grade-form-group">
      <label htmlFor="maxMarks" className='Grade-label'>Max Marks:</label>
      <input
        className='Grade-input'
        type="number"
        id="maxMarks"
        name="maxMarks"
        value={newGrade.maxMarks}
        onChange={handleInputChange}
      />
    </div>
    <div className="Grade-form-group">
      <label htmlFor="scoredMarks" className='Grade-label'>Scored Marks:</label>
      <input
        className='Grade-input'
        type="number"
        id="scoredMarks"
        name="scoredMarks"
        value={newGrade.scoredMarks}
        onChange={handleInputChange}
      />
    </div>
    <button type="button" className='Grade-add' onClick={handleAddGrade}>Add Grade</button>
  </form>
</Modal>

      </div>
      
    </div>
    </Box>
  );
}

export default GradeTracker;