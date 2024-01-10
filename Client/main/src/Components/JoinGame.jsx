import React, { useState } from 'react'
import { useChatContext, Channel } from 'stream-chat-react';
import Game from './Game';

const formFieldClasses = "mt-2 p-1.5 w-6/12 bg-purple-600 border  border-blue-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500 transition duration-300 ease-in-out";
const buttonClasses = "bg-cyan-500 p-2 w-4/12 shadow-lg hover:shadow-cyan-500/50 rounded-md mt-1.5 transition ease-in duration-300";
const headerClasses = "text-5xl font-extrabold leading-tight";
const JoinGame = () => {
    const [rivalUsername, setRivalUsername] = useState("");
    const [channel, setChannel] = useState(null);
    const { client } = useChatContext();//this can only be used becoz this comp is a child of <Chat/> component.
    const handleItemChange = (event) => {
        setRivalUsername(event.target.value);
    }
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
                <Channel channel={channel}>
                    <Game channel={channel} />
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
                        <button className={buttonClasses} onClick={createChannel}>Join Game</button>
                    </div>
                )}
        </>

    )
}

export default JoinGame