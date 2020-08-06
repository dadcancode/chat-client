import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import SideNav from '../SideNav/SideNav';
import ChatInput from '../ChatInput/ChatInput';
import RoomMessages from '../RoomMessages/RoomMessages';

import './ChatRoom.css';


let socket;

const ChatRoom = (props) => {
    
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [rooms, setRooms] = useState({});
    const [room, setRoom] = useState(props.tempUser.room);
    const [newRoom, setNewRoom] = useState('');
    const [socketIds, setSocketIds] = useState([]);

    const ENDPOINT = 'localhost:5000';

    useEffect(() => {
        socket = io(ENDPOINT);

        socket.emit('join', props.tempUser);
        //socket.emit('getRooms');

    }, [ENDPOINT]);

    useEffect(() => {
        socket.on('message', (message) => {
            if(message.text) {
                setMessages([...messages, message])
            } else {
                setMessages([...messages, ...message])
            }
        })
    }, [messages])

    useEffect(() => {
        socket.on('theRooms', (data) => {
            // console.log(`raw room data:${JSON.stringify(data)}`)
            // console.log(`rooms received: ${Object.keys(data)}`);
            setRooms({
                ...data
            })
            // console.log('=====================');
            // console.log(`rooms: ${rooms}`)
        })
    }, [rooms]);

    useEffect(() => {
        socket.on('newId', (data) => {
            console.log(data)
            let arr = [];
            data.map((val) => {
                setSocketIds([...socketIds, val])
                arr.push(val)
                console.log(`arr: ${arr}`)
                setSocketIds([...arr])
                console.log(`val: ${val}, type: ${typeof(val)}`)
                console.log(`socketIds: ${JSON.stringify(socketIds)}`)
            })
        })
    }, []);

    useEffect(() => {
        socket.on('testData', (data) => {
            console.log(data)
        })
    }, [])

    const getRoomMsgs = (room) => {
        setMessages([]);
        console.log(`getRoomMsgs ran`);
        console.log(`props.tempUser.room: ${props.tempUser.room}`)
        fetch(`http://localhost:5000/messages/${room}/${props.tempUser.signIn}`)
        .then(resp => resp.json())
        .then((json) => {
            console.log(json)
            socket.emit('roomMessages', json)
            switchRoom(room)
            updateTempUserRoom(room)
        })
    }


    const sendMessage = (event) => {
        event.preventDefault();

        if (message.length > 0) {
            fetch(`http://localhost:5000/messages`, {
                body: JSON.stringify({
                    senderId: props.tempUser.user._id,
                    senderName: props.tempUser.user.username,
                    text: message,
                    room: props.tempUser.room
                }),
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            })
            .then(resp => resp.json())
            .then(json => {
                // console.log(json)
                setMessage('');
                socket.emit('sendMessage', json)
            })
        }
    }

    const getRooms = () => {
        // fetch('http://localhost:5000/getRooms')
        // .then(resp => resp.json())
        // .then(json => console.log(json))
        socket.emit('getRooms')
    }



    const createRoom = (event) => {
        event.preventDefault();
        updateTempUserRoom(newRoom);
        let data = {
            oldRoom: props.tempUser.room,
            newRoom: newRoom,
            user: props.tempUser.user
        }

        socket.emit('switchRoom', data)
        // setRooms([...rooms, newRoom]);
        setNewRoom('');
    }

    const switchRoom = (room) => {
        // updateTempUserRoom(event.target.value)
        let data = {
            oldRoom: props.tempUser.room,
            newRoom: room,
            user: props.tempUser.user
        }

        socket.emit('switchRoom', data);
    }

    const updateTempUserRoom = (room) => {
        console.log('updatedTempUserRoom ran')
        console.log(`room param: ${room}`)
        let temp = {
            ...props.tempUser
        }
        temp.room = room;
        props.setTempUser({
            ...temp
        })
        console.log(`tempUser room after update: ${props.tempUser.room}`)
        // getRoomMsgs(room);
    }
    
    // console.log(message, messages);

    return (
        <div className='chatRoomOuterDiv'>
            <SideNav rooms={rooms} createRoom={createRoom} setNewRoom={setNewRoom} newRoom={newRoom} switchRoom={switchRoom} currentRoom={props.tempUser.room} updateTempUserRoom={updateTempUserRoom} getRoomMsgs={getRoomMsgs}/>
            <RoomMessages messages={messages} />
            {/* <button onClick={() => getRoomMsgs()}>Push</button> */}
            <ChatInput sendMessage={sendMessage} setMessage={setMessage} message={message}/>
            {/* <input type='text' value={message} onChange={(e) => setMessage(e.target.value)} onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null}/> */}
        </div>
    )
}

export default ChatRoom;