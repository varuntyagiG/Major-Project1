const mongoose = require('mongoose');
const initData = require('./database.js');
const Listing = require('../models/listing.js');

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlast');
}

main().then((res)=>{
    console.log("Database connected");
}).catch((err)=>{
    console.log(err);
});

const initDB = async ()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log('Data intilized');
}

initDB();

