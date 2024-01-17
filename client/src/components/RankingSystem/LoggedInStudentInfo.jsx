import React from 'react';

const LoggedInStudentInfo = ({ loggedInStudent , loggedInStudentRank}) => {
  return (
    <div className="mb-3 ">
      {loggedInStudent && (
        <p className="text-center" style={{color:"red"}}>
          <strong>Name : {loggedInStudent.studentName}</strong> |
          Roll No. : {loggedInStudent.roll_no} |
          Class : {loggedInStudent.class} |
           Your Rank: <strong>{loggedInStudentRank}</strong>
        </p>
      )}
    </div>
  );
};

export default LoggedInStudentInfo;
