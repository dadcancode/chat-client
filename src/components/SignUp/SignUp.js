import React, { useState, useEffect } from 'react';



const SignUp = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('')
    const [room, setRoom] = useState('Global');
    const [sysMsg, setSysMsg] = useState('');

    const onSubmit = (event) => {
        console.log('signup submit ran')
        event.preventDefault();


        if ( username === '' || password === '' || confirmPass === '') {
            setSysMsg('All fields are required');
        } else {
            fetch(`${props.dbUrl}signUp`, {
                body: JSON.stringify({
                    username: username,
                    password: password,
                    password2: confirmPass
                }),
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            })
            // .then(resp => console.log(resp))
            .then(resp => resp.json())
            .then(json => {
                console.log(`here is the json: ${Object.entries(json)}`)
                if (json.errors) {
                    alert('there was an error')
                } else {
                    props.setTempUser(json)
                    props.setView('ChatRoom');
                }
            })
        }
    }

    return(
        <div>
            <div>
                <h1>Sign Up</h1>
            </div>
            <form onSubmit={(event) => {
                if (password === confirmPass) {
                    onSubmit(event)
                } else {
                    setSysMsg('passwords do not match');
                }
            }}>
                <div>
                    <input type='text' placeholder='Username' onChange={(event) => setUsername(event.target.value)}/>
                </div>
                <div>
                    <input type='text' placeholder='Password' onChange={(event) => setPassword(event.target.value)}/>
                </div>
                <div>
                    <input type='text' placeholder='Confirm Password' onChange={(event) => setConfirmPass(event.target.value)}/>
                </div>
                <div>
                    <button type='submit'>Sign Up!</button>
                </div>
            </form>
        </div>
    )
}

export default SignUp;