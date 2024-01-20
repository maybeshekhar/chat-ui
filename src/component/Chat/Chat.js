import React, { useEffect, useState } from 'react';
import { user } from '../Join/Join'; // Adjust the import statement
import socketIo from "socket.io-client";
import './Chat.css';
import send1 from '../../assets/send.png';
import close1 from '../../assets/close.png';
import Message from '../message/message';
import ReactScrollToBottom from 'react-scroll-to-bottom';

let socket;

const ENDPOINT = "https://chatserver-4ym4.onrender.com/";

const Chat = () => {
    /* const { user } = Join; */ // Destructure user from the imported module

    const [id, setid] = useState("");
    const [messages, setMessages] = useState([])

    const send = () => {
 


       const message = document.getElementById('chatInput').value;
        socket.emit('message', {message, id});
        document.getElementById('chatInput').value = "";
    }

    useEffect(() => {
        socket = socketIo(ENDPOINT, { transports: ['websocket'] });

        socket.on('connect', () => {
            alert('Connected');
            setid(socket.id);
        });

        console.log(socket);
        socket.emit('joined', { user });

        socket.on('welcome', (data) => {
            setMessages([...messages,data]);
            console.log(data.user, data.message);
        });

        socket.on('userJoined', (data) => {
            setMessages([...messages,data]);
            console.log(data.user, data.message);
        });

        socket.on('leave', (data) => {
            setMessages([...messages,data]);
            console.log(data.user, data.message);
        });

        // No need to manually emit 'disconnect' or call socket.off() for 'disconnect'
        // The socket will handle disconnection automatically when the component is unmounted

        return () => {
            // You can perform cleanup here if necessary
            console.log('Cleaning up...');
        };
    }, [user]);


    useEffect(() => {
        socket.on('sendMessage', (data) => {
            setMessages([...messages,data]);
          console.log(data.user, data.message, data.id);
        })
      
        return () => {
          socket.off();
        }
      }, [messages])


    return (
        <div className='chatPage'>
            <div className='chatContainer'>
                <div className='header'>
                    <h2>texteasy</h2>
                   <a href="/"><img src={close1} alt="" /></a> 
                </div>
                <ReactScrollToBottom className='chatBox'>
                    {messages.map((item, i)=> <Message user={item.id===id?'':item.user} message={item.message} classs={item.id===id?'right':'left'} />)}
                </ReactScrollToBottom>
                <div className='inputBox'>
                    <input placeholder='type here..' onKeyPress={(event) => event.key === 'Enter' ? send() : null } type="text" id='chatInput' />
                    <button onClick={send} className='sendBtn'><img src={send1} alt="" /></button>
                </div>
            </div>
        </div>
    );
}

export default Chat;