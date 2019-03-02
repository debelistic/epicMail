import dotenv from 'dotenv';

const port = process.env.PORT;
console.log(`Your port is ${port}`);

dotenv.config();
console.log(process.env.PORT);
