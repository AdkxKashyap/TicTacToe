import express from 'express';
import { v4 as uuidv4 } from "uuid";
import bcrypt from 'bcrypt';
import serverClient from '../StreamClient.js';

const loginRouter = new express.Router();
loginRouter.post("/login", async (req, res) => {
    try {
        console.log("user: ");
        console.log("pw: ");
        const { userName, password } = req.body || {};
        const { users } = await serverClient.queryUsers({ name: userName });
        if (users.length === 0) return res.status(404).json({ error: 'User not found' });
        console.log("user: ", users[0]);
        console.log("pw: ", password);
        const isValidPassword = await bcrypt.compare(password, users[0].hashedPassword);
        if (!isValidPassword) return res.status(401).json({ error: 'Wrong Password' });
        const token = serverClient.createToken(users[0].id);
        return res.status(200).json({
            token,
            userId: users[0].id,
            firstName: users[0].firstName,
            lastName: users[0].lastName,
            userName: users[0].name
        });
    } catch (error) {
        res.json(error);
    }
})

export default loginRouter;