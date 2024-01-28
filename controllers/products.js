const Product = require('./../models/products');

const getAllProductsStatic = async (req, res) => {
    const products = await Product.find({});

    res.status(200).json({
        msg: 'products testing route',
        nbHits: products.length,
        products
    });
}

const getAllProducts = async (req, res) => {
    const { featured, company, name, sort } = req.query;
    const queryObject = {};

    if(featured) {
        queryObject.featured = featured === 'true' ? true : false;
    }
    if(company){
        queryObject.company = company;
    }
    if(name){
        queryObject.name = {    // in case of name search, we can find all the results that match the pattern in the variable = name
            $regex: name,       // this is for matching the search pattern
            $options: 'i'       // is for case insensitive search
        };
    }

    // const queryObj = Product.find(queryObject); ==> now awaiting this query will give the query object.
    // const result = await queryObj; ==> we can await the queryObj afterwards to get the result

    let queryObj = Product.find(queryObject);

    // we can use this functionality to chain the queryObj to use other filtering and sorting options

    if(sort) {
        let sortList = sort.split(',').join(' ');
        queryObj.sort(sortList);
    }
    // else {
    //     queryObj.sort('createdAt');
    // }
    console.log("queryObj = ", queryObj);
    const products = await queryObj;

    res.status(200).send({
        msg: 'products route',
        nbHits: products.length,
        products
    });
}

module.exports = {
    getAllProducts,
    getAllProductsStatic
}