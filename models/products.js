const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'product name must be provided']   // first elem suggests if required is true or not, second elem suggests the error to be thrown if vlaue of the key not provided
    },
    price: {
        type: Number,
        required: [true, 'product price must be provided']
    },
    featured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 4.5
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    company: {
        type: String,
        enum: {         // limits the possible values for this property
            values: ['ikea', 'liddy', 'caressa', 'marcos'],
            message: '{VALUE} is not supported'     // message to be throw if value is not in the provided list
        }
    }
});

module.exports = mongoose.model('Products', productsSchema);