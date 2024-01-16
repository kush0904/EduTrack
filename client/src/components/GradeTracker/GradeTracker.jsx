// GradeTracker.jsxAdd
import'./GradeTracker.css'
import UserImage from '../../assets/User.png';
import UniImage from '../../assets/university.png';
import degree from '../../assets/degree.png';
import id from '../../assets/Id.png';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import userId from './userIdStore';
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

  const fetchGrades = () => {
    axios.get('http://localhost:4001/getGrades')
      .then(response => {
        setGrades(response.data);
      })
      .catch(err => console.log(err));
  };
    const handleSortChange = (event) => { 
    const selectedOption = event.target.value;
    setSelectedSortOption(selectedOption);
    sortGrades(selectedOption, sortOrder);
  };

  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === 'ASC' ? 'DSC' : 'ASC';
    setSortOrder(newSortOrder);
    sortGrades(selectedSortOption, newSortOrder);
    fetchGrades();  

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
    fetchGrades();  
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
    fetchGrades();  

  };
  const openModal = () => {
    setIsModalOpen(true);
    fetchGrades();  

  };
 
  const closeModal = () => {
    setIsModalOpen(false);
    fetchGrades();  

  };
  const toggleRemoveMode = () => {
    setIsRemoveMode(!isRemoveMode);
    fetchGrades();  

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
              date: '',
              maxMarks: 0,
              scoredMarks: 0,

            
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="Grade-container">
      <div className="Grade-Box1">
        <div className='Grade-UserInfo'>
          <img src={UserImage} alt="User" className="Grade-user-image" /> 
          <span className="Grade-username">Gaurav Thakur</span>
          <img src={UniImage} alt="User" className="Grade-user-image" />
          <span className="Grade-username">Chitkra University</span>
          <img src={degree} alt="User" className="Grade-user-image" />
          <span className="Grade-username">Computer Science</span>
          <img src={id} alt="User" className="Grade-user-image" />
          <span className="Grade-username">{userId}</span>
        </div>
      </div>
      <div className="Grade-Box2">
        <div className='Grade-Heading'>
        <button className='Grade-Btn1' onClick={openModal}>Add</button>
        <button className='Grade-Btn2' onClick={toggleRemoveMode}>
            {isRemoveMode ? 'Cancel ' : 'Remove '}
          </button>
          <h1>Grades Tracker</h1>          
          <div>
          <label htmlFor="filterDropdown" className='Grade-label'>Filter:</label>
            <select
              id="filterDropdown"
              className="Grade-Btn2"
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
          <label htmlFor="sortDropdown" className='Grade-label'>Sort:</label>
        <select
          id="sortDropdown"
          className="Grade-Btn2"
          value={selectedSortOption}
          onChange={handleSortChange}
        >
          <option value="Subject">Subject</option>
          <option value="Test-type">Test</option>
          <option value="Max-Marks">Max</option>
          <option value="Scored Marks">Scored </option>
        </select>
        <button onClick={toggleSortOrder} className='Grade-removeBtn'>{sortOrder}</button>
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
                <th>Date</th>
                <th>Max-Marks</th>
                <th>Scored-Marks</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((grade, index) => (
                
                <tr key={index}>
                  <td className='Grade-srn'> {isRemoveMode && (
                    
                      <button onClick={() => handleRemoveGrade(grade._id)} className='Grade-removeBtn'>X</button>
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
      <input
      className='Grade-input'

        type="text"
        id="subject"
        name="subject"
        value={newGrade.subject}
        onChange={handleInputChange}
      />
    </div>
    <div className="Grade-form-group">
      <label htmlFor="testType" className='Grade-label'>Test Type:</label>
      <input
        type="text"
        id="testType"
        name="testType"
        value={newGrade.testType}
        onChange={handleInputChange}
      />
    </div>
    <div className="Grade-form-group">
      <label htmlFor="date" className='Grade-label'>Date:</label>
      <input
      className='Grade-input'

        type="date"
        id="date"
        name="date"
        value={newGrade.date}
        onChange={handleInputChange}
      />
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
    <button type="button"  className='Grade-add' onClick={handleAddGrade}>Add Grade</button>
  </form>
</Modal>
       
      </div>
      
    </div>
  );
}

export default GradeTracker;
