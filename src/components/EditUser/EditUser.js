import React, {useState} from 'react';

const EditUser = (props) => {

    const [username, setUsername] = useState(props.tempUser.user.username);

    return (
        <div className='editUserDiv'>
            <div className='headingDiv'>
                <h1 className='heading'>Edit Profile</h1>
            </div>
            <form className='editUserForm'>
                <div className='editUserInputDiv'>
                    <input type='text' value={username} onChange={(e) => {
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