import { StreamChat } from "stream-chat";

const apiKey = process.env.API_KEY;
const apiSecret = process.env.API_SECRET;
const serverClient = StreamChat.getInstance(apiKey, apiSecret);

export default serverClient;