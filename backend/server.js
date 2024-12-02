import express from 'express';
import cors from 'cors';
import 'dotenv/config';

// configurimi i app
const app = express();
const port = process.env.PORT || 4000;

// middlewares
app.use(express.json());
app.use(cors());

// api endpoints
app.get('/', (req, res) => {
    res.send("API eshte duke punuar");
});

// start server
app.listen(port, () => console.log("Server ka filluar ne portin: " + port));