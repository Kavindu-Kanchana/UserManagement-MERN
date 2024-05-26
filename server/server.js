import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect from './database/conn.js';
import router from './router/route.js';

import adminRoutes from './router/adminRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

//const userRoutes = require("./router/userRoutes")
//const adminRoutes = require("./router/adminRoutes")

/** middlewares */
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by');


const port = 8080;

/** HTTP GET Request */
app.get('/', (req, res) => {
    res.status(201).json("Home GET Request");
});


/** api routes */
app.use('/api', router)

//app.use('/api/users',userRoutes)
app.use('/api/admin', adminRoutes)

/** start server only when we have valid connection */
connect().then(() => {
    try {
        app.listen(port, () => {
            console.log(`Server connected to http://localhost:${port}`);
        })
    } catch (error) {
        console.log('Cannot connect to the server')
    }
}).catch(error => {
    console.log("Invalid database connection...!");
})

