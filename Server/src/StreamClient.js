import { StreamChat } from "stream-chat";

const apiKey = process.env.API_KEY;
const apiSecret = process.env.API_SECRET;
const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export default streamClient;