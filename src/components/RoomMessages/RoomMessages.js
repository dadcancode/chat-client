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
                        // const msgDivRandom = {
                        //     backgroundColor: `rgb(${randomRGBValue()}, ${randomRGBValue()}, ${randomRGBValue()})`
                        // }
                        return(
                            <div className='messageDiv'>
                                <span>{`${val.senderName}: ${ReactEmoji.emojify(val.text)}`}</span>
                            </div>
                        )
                    })}
                </ScrollToBottom>
            </div>
        
    )
}

export default RoomMessages;