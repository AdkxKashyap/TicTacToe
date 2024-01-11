import React, { useState } from 'react'
import { useChatContext, Channel } from 'stream-chat-react';
import Game from './Game';
import CustomInput from './CustomInput';
import { isStringEmpty } from '../utils/Common';
import ErrorMessage from './ErrorMessage';

const formFieldClasses = "mt-2 p-1.5 w-6/12 rounded-md py-2 bg-purple-200 hover:bg-purple-300 focus:bg-purple-300 px-3 focus:outline-none focus:border-indigo-500 transition duration-300 ease-in-out";
const buttonClasses = "bg-purple-500 p-2 w-4/12 shadow-lg hover:shadow-purple-500/50 rounded-md mt-1.5 transition ease-in duration-300";
const headerClasses = "text-5xl font-extrabold leading-tight";

const JoinGame = () => {
    const [rivalUsername, setRivalUsername] = useState("");
    const [channel, setChannel] = useState(null);
    const [invalidUsername, setInvalidUsername] = useState(false);
    const { client } = useChatContext();//this can only be used becoz this comp is a child of <Chat/> component.
    const handleItemChange = (event) => {
        const { value } = event.target;
        if (value === client.user.name) {
            setInvalidUsername(true);
        } else {
            setInvalidUsername(false);
        }
        setRivalUsername(event.target.value);
    }
    const errorMessage = "Cannot set own username";
    //this method creates a room bw the two players
    const createChannel = async () => {
        const res = await client.queryUsers({ name: { $eq: rivalUsername } });
        if (res == null || res.users.length === 0) {
            alert('rival user not found');
            return;
        }
        const newChannel = await await client.channel("messaging", { members: [client.userID, res.users[0].id] });
        await newChannel.watch();
        setChannel(newChannel);
    }
    return (
        <>
            {channel ? (
                <Channel channel={channel} Input={CustomInput}>
                    <Game
                        channel={channel}
                        setChannel={setChannel}
                    />
                </Channel>
            ) :
                (
                    <div className="createGameContainer">
                        <h4 className={headerClasses}>Create Game</h4>
                        <input
                            placeholder='Username of rival...'
                            onChange={handleItemChange}
                            className={formFieldClasses}
                        />
                        {invalidUsername ? <ErrorMessage errorMsg={errorMessage} /> : null}
                        <button
                            disabled={invalidUsername || isStringEmpty(rivalUsername)}
                            className={buttonClasses}
                            onClick={createChannel}
                        >
                            Join Game
                        </button>
                    </div>
                )}
        </>

    )
}

export default JoinGame