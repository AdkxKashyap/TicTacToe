import express from 'express';
import cors from 'cors';
import signupRoute from './src/Routes/SignupRoute.js';

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3000;

app.use(signupRoute);

app.listen(port, () => {
    console.log('Server is running on port: ', port);
})
