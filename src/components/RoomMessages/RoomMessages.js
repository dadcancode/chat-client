import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';
import ReactEmoji from 'react-emoji';

import './RoomMessages.css';

const RoomMessages = (props) => {
    
    
    const randomRGBValue = () => {
        return Math.floor(Math.random() * 256);
    }


    return (
        
            <div className='messagesOuterDiv'>
                <ScrollToBottom>
                    {props.messages.map((val) => {
                        if (val.senderName === props.tempUser.user.username) {
                            return(
                                <div className='messageDiv outgoingMsg'>
                                    <span>{`${val.senderName}: ${ReactEmoji.emojify(val.text)}`}</span>
                                </div>
                            )
                        } else if (val.senderName === 'admin') {
                            return(
                                <div className='messageDiv adminMsg'>
                                    <span>{`${val.senderName}: ${ReactEmoji.emojify(val.text)}`}</span>
                                </div>
                            )
                        } else {
                            return(
                                <div className='messageDiv incomingMsg'>
                                    <span>{`${val.senderName}: ${ReactEmoji.emojify(val.text)}`}</span>
                                </div>
                            )
                        }
                    })}
                </ScrollToBottom>
            </div>
        
    )
}

export default RoomMessages;