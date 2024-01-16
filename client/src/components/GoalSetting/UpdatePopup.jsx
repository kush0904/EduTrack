import React, { useState } from 'react'
import { RxCross1 } from 'react-icons/rx'
import { baseURL } from './constant';
import axios from "axios";
const UpdatePopup = ({setShowPopup,popupContent,setUpdateUI}) => {

    const[input,setInput]=useState(popupContent.text);
    const [deadline, setDeadline] = useState(popupContent.deadline || ''); // Add this line

    const updateGoal=()=>{
        axios
        .put(`${baseURL}/updateGoals/${popupContent.id}`,{goal:input,deadline})
        .then((res)=>{
            console.log(res.data);
            setUpdateUI((prevState)=>!prevState);
            setShowPopup(false);
        })
    }

  return (
    <div className='backdrop'>
       <div className="popup">
        <RxCross1 className='cross' onClick={()=>setShowPopup(false)}/>
        <h1>Update Goal</h1>
        <div className="popup__input_holder">
             <input
                value={input}
                onChange={(e)=>setInput(e.target.value)}
                type="text"
                placeholder="Update Goal.."
                style={{ backgroundColor: '#eaeaea', padding: '5px' }}
              />
              <br></br>
              <input
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              type="date"
              placeholder="Update Deadline Date.." // Add this line
              style={{ backgroundColor: '#eaeaea', padding: '5px' }}
             />
            <button onClick={updateGoal}  style={{ backgroundColor: '#eaeaea', padding: '5px' }}>Update</button>
        </div>
       </div>
    </div>
  )
}

export default UpdatePopup