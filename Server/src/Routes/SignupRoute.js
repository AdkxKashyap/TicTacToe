import express from 'express';
import { v4 as uuidv4 } from "uuid";
import bcrypt from 'bcrypt';
import streamClient from '../StreamClient.js';
import { isUserExist } from '../util/CheckUser.js';

const signupRouter = new express.Router();
signupRouter.post("/signup", async (req, res) => {
    try {
        const { firstName, lastName, userName, password } = req.body || {};
        const userExist = await isUserExist(streamClient, userName);
        if (userExist) {
            res.status(401).json({ error: 'Username already exists' });
        }
        const userId = uuidv4();
        const hashedPassword = await bcrypt.hash(password, 10);
        const token = streamClient.createToken(userId);
        res.json({ token, userId, firstName, lastName, userName, hashedPassword });
    } catch (error) {
        res.json(error);
    }
})

export default signupRouter;