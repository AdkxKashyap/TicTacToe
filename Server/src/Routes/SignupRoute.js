import express from 'express';
import { v4 as uuidv4 } from "uuid";
import bcrypt from 'bcrypt';
import serverClient from '../StreamClient.js';

const signupRouter = new express.Router();
signupRouter.post("/signup", async (req, res) => {
    try {
        const { firstName, lastName, userName, password } = req.body || {};
        const userId = uuidv4();
        const hashedPassword = await bcrypt.hash(password, 10);
        const token = serverClient.createToken(userId);
        res.json({ token, userId, firstName, lastName, userName, hashedPassword });
    } catch (error) {
        res.json(error);
    }
})

export default signupRouter;