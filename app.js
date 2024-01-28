require('dotenv').config();
require('express-async-errors');

// async errors



const express = require('express');
const app = express();

const connectMongo = require('./db/connect');
const productsRouter = require('./routes/router-products');

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');



// middlewares
app.use(express.json());


// routes

app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">Show all products</a>');
});

// products route
app.use('/api/v1/products', productsRouter);


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);



// connect to server

const port = process.env.PORT || 5000;

(async function(){
    try {
        // initialize database connections
            
            //connect to mongo db
            await connectMongo(process.env.MONGO_URI);
            console.log("######################  Mongo connected  ######################");

        // connect to express server
        app.listen(port, ()=> {
            console.log("######################  Express connected  ######################");
            console.log("Server Listening on PORT ", port, "...");
        });
    }
    catch (error) {
        console.log("error connecting to the server ############ ", error);
    }
})();