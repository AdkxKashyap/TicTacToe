import express from 'express';
import { v4 as uuidv4 } from "uuid";
import bcrypt from 'bcrypt';
import streamClient from '../StreamClient.js';
import { isStringEmpty } from '../util/CommonUtils.js';

const loginRouter = new express.Router();
loginRouter.post("/login", async (req, res) => {
    try {
        const { userName, password } = req.body || {};
        if (isStringEmpty(userName) || isStringEmpty(password)) {
            return res.status(401).json({ error: 'Username and password is required' });
        }
        const { users } = await streamClient.queryUsers({ name: userName });
        if (users.length === 0) return res.status(404).json({ error: 'User not found' });
        const hashedPw = users[0].hashedPassword;
        if (isStringEmpty(hashedPw)) return res.status(501).json({ error: 'Something went wrong' })
        const isValidPassword = await bcrypt.compare(password, users[0].hashedPassword);
        if (!isValidPassword) return res.status(401).json({ error: 'Wrong Password' });
        const token = streamClient.createToken(users[0].id);
        return res.status(200).json({
            token,
            userId: users[0].id,
            firstName: users[0].firstName,
            lastName: users[0].lastName,
            userName: users[0].name,
            hashedPassword: users[0].hashedPassword,
        });
    } catch (error) {
        res.json(error);
    }
})

export default loginRouter;