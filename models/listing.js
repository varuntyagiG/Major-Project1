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
        default : "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dmlsbGF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
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

