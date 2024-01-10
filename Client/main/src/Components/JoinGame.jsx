import React, { useState } from 'react'
import { useChatContext } from 'stream-chat-react';

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
                <h1>Game Started</h1>
            ) :
                (
                    <div>
                        <h4>Create Game</h4>
                        <input
                            placeholder='Username of rival...'
                            onChange={handleItemChange}
                        />
                        <button onClick={createChannel}>Join Game</button>
                    </div>
                )}
        </>

    )
}

export default JoinGame