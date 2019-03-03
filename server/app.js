import express from 'express';


const app = express();


app.get('/', (req, res) => {
  res.send('welcome');
});

const port = 5000 || process.env.PORT;

app.listen(port);
