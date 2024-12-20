import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import lidhjaDB from './config/mongodb.js';
import lidhjaCloudinary from './config/cloudinary.js';
import perdoruesiRouter from './routes/perdoruesiRoute.js';
import produktRouter from './routes/produktRoute.js';
import karrocaRouter from './routes/karrocaRoute.js';
import porosiaRouter from './routes/porosiaRoute.js';

// configurimi i app
const app = express();
const port = process.env.PORT || 4000;
lidhjaDB();
lidhjaCloudinary();

// middlewares
app.use(express.json());
app.use(cors());

// api endpoints
app.use('/api/perdoruesi', perdoruesiRouter);
app.use('/api/produkti', produktRouter);
app.use('/api/karroca', karrocaRouter);
app.use('/api/porosia', porosiaRouter);
app.get('/', (req, res) => {
    res.send("API eshte duke punuar");
});

// start server
app.listen(port, () => console.log("Server ka filluar ne portin: " + port));