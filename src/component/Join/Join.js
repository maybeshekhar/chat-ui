import React, { useState } from 'react';
import './Join.css';
import logo from "../../assets/logo.png"
import { Link } from 'react-router-dom';

let user;

const Join = () => {

    const [name, setName] = useState("");


    const sendUser=()=> {
        user = document.getElementById('joinInput').value;
        document.getElementById('joinInput').value = "";
    }

  return (
    <div className='JoinPage'>
     <div className='JoinContainer' >
     <img src={logo} alt="" />
     <h1>texteasy</h1>
     <input onChange={(e) => setName(e.target.value)} type="text" placeholder='Enter your name' id='joinInput' />
    <Link onClick={(e)=> !name ?e.preventDefault():null} to="/chat">
     <button onClick={sendUser} className='joinbtn'>Login</button>
     </Link>
     </div>
    </div>
  )
}

export default Join;
export {user}