// import React from 'react'
// import {AiFillEdit} from "react-icons/ai";
// import axios from "axios"; 
// import {RxCross1} from "react-icons/rx";
// import { baseURL } from './constant';

// const ToDo = ({text,id,setUpdateUI,setShowPopup,setPopupContent}) => {

//     const deleteGoal=()=>{
//         axios.delete(`${baseURL}/deleteGoals/${id}`)
//         .then(res=>{
//             console.log(res.data);
//             setUpdateUI((prevState)=>!prevState);
//         })
//     }

//     const updateGoals=()=>{
//         setPopupContent({text,id});
//         setShowPopup(true);
//     };
//   return (
//     <div className='toDo'>
//         {text}
//         <div className='icons'>
//             <AiFillEdit className='icon' onClick={updateGoals}/>
            
//             <RxCross1 className='icon' onClick={deleteGoal}/>
//          </div>
//     </div>
//   )
// }

// export default ToDo
import React from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { RxCross1 } from 'react-icons/rx';
import axios from 'axios';
import { baseURL } from './constant';

const ToDo = ({ text, deadline,id, setUpdateUI, setShowPopup, setPopupContent }) => {
  const deleteGoal = () => {
    axios.delete(`${baseURL}/deleteGoals/${id}`).then((res) => {
      console.log(res.data);
      setUpdateUI((prevState) => !prevState);
    });
  };

  const updateGoals = () => {
    setPopupContent({ text, id });
    setShowPopup(true);
  };
  

  return (
    <tr>
      <td>{/* Serial Number Placeholder */}</td>
      <td>{text}</td>
      <td>{deadline}</td>
      <td>
        <button onClick={updateGoals}>Edit</button>
        <button onClick={deleteGoal}>Delete</button>
      </td>
    </tr>
  );
};

export default ToDo;