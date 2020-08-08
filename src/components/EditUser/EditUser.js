import React, {useState} from 'react';

import '../EditUser/EditUser.css';

const EditUser = (props) => {

    const [username, setUsername] = useState(props.tempUser.user.username);

    return (
        <div className='editUserDiv'>
            <div className='editHeadingDiv'>
                <h1 className='editHeading'>Edit Profile</h1>
            </div>
            <form className='editUserForm'>
                <div className='editUserInputDiv'>
                    <input className='editUserInput' type='text' value={username} onChange={(e) => {
                        setUsername(e.target.value)
                    }}/>
                </div>
                <div className='editUserBtnDiv'>
                    <button className='editUserBtn' type='submit'>Save Changes</button>
                </div>
                <div className='editUserBtnDiv'>
                    <button className='editUserBtn'>Delete Profile</button>
                </div>
            </form>
        </div>
    )
}

export default EditUser;