require('dotenv').config();


const connectDB = require('./db/connect');
const ProductModel = require('./models/products');

const jsonProducts = require('./products.json');


(async() => {
    try{
        await connectDB(process.env.MONGO_URI);
        console.log("******************** MONGO CONNECTED ********************");

        await ProductModel.deleteMany(); // just to delete any trash you had in the collection
        await ProductModel.create(jsonProducts);

        console.log("Succesfully added all the products into the collection");

        /*
            this is used to turn off the execution of this file once all the products 
            are added successfully. 0 is passed to notify that every thing went well 
            and there were no errors.
        */
        process.exit(0);
    }
    catch(error){
        console.log("********* ERROR while connecting to Mongo ********");
        console.log(error);
        process.exit(1); // 1 is passed to notify that an error occured
    }
})();

