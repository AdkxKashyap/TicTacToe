import express from 'express';
import cors from 'cors';
import signupRoute from './src/Routes/SignupRoute.js';
import loginRouter from './src/Routes/LoginRoute.js';

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3000;

app.use(signupRoute);
app.use(loginRouter);

app.listen(port, () => {
    console.log('Server is running on port: ', port);
})
