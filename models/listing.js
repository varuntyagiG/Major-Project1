const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title : {
        type : String,
        required : true,
    },
    description : {
        type : String
    },
    image : {
        default : 'https://unsplash.com/photos/person-holding-light-bulb-fIq0tET6llw?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash',
        type : String,
        set : (v) => v === ''? 'https://unsplash.com/photos/person-holding-light-bulb-fIq0tET6llw?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash' : v,
    },
    price : {
        type :Number
    },
    location : {
        type : String
    },
    country : {
        type : String
    }
});

const Listing = mongoose.model('Listing',listingSchema);

module.exports = Listing;

