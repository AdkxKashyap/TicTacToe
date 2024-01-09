import express from 'express';
import { v4 as uuidv4 } from "uuid";
import bcrypt from 'bcrypt';
import { StreamChat } from "stream-chat";

//ToDO: move to env
const apiKey = "d4h63w6jw82h";
const apiSecret = "h2vfnm9sevurvu4tu2e6wybnafjewtwfm8jfs5t7tq3eftf84qtm3f9ptv8sgayc";
const serverClient = new StreamChat.getInstance(apiKey, apiSecret);

const router = new express.Router();
router.post("/signup", async (req, res) => {
    try {
        const { firstName, lastName, username, password } = req.body || {};
        const userId = uuidv4();
        const hashedPassword = await bcrypt.hash(password, 10);
        const token = serverClient.createToken(userId);
        res.json({ token, userId, firstName, lastName, username, hashedPassword });
    } catch (error) {
        
    }


})