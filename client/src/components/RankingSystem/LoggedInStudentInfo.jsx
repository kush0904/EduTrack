import React from 'react';

const LoggedInStudentInfo = ({ loggedInStudent , loggedInStudentRank}) => {
  return (
    <div className="mb-3 ">
      {loggedInStudent && (
        <p className="text-center" style={{color:"red"}}>
          <strong>Name : {loggedInStudent.Name}</strong> |
         <strong> Roll No. : {loggedInStudent.clg_id} </strong>|
         <strong> Your Rank: {loggedInStudentRank}</strong>
        </p>
      )}
    </div>
  );
};

export default LoggedInStudentInfo;
