import { StreamChat } from "stream-chat";

const apiKey = process.env.REACT_APP_API_KEY;
const serverClient = StreamChat.getInstance(apiKey);

export default serverClient;