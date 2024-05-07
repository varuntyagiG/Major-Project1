const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./models/listing.js');
const path = require('path');     
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,'public')));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlast');
}

main().then((res)=>{
    console.log("Database connected");
}).catch((err)=>{
    console.log(err);
});


let port = 8080;

app.listen(port,(req,res)=>{
    console.log("Server Listen along the port : 8080");
});
app.get('/',(req,res)=>{
    res.send("Server Work");
});

app.get('/testListing',async (req,res)=>{
    let samplelisting = new Listing({
        title :'My New Villa',
        description : 'By the beach',   // document creaated..
        price : 1200,
        location : "Goa",
        Country : 'India'
    });
    await samplelisting.save().then((res)=>{
        console.log(res);
    }).catch((err)=>{
        console.log(err);
    });
    res.send("document Saved");
});
  

// index route
app.get('/listings',async (req,res)=>{
    let lists = await Listing.find();
    res.render('list/app.ejs',{lists});     // line ka mtlb h list folder k under app.ejs file h
});

// show route
app.get('/lists/:id',async (req,res)=>{
    let{id} = req.params;
    let allData = await Listing.findById(id);
    res.render('list/show.ejs',{allData});
});
  
// new route

app.get('/listings/new',(req,res)=>{
    res.render('list/new.ejs');
});

//create route
app.post('/listings',async (req,res)=>{
    let{title,description,image,price,location,country} = req.body;
    let newListDb = new Listing({
        title : title,
        description : description,
        image : image,
        price : price,
        location : location,
        country : country
    });
    await newListDb.save().then((res)=>{
        console.log(res);
    }).catch((err)=>{
        console.log(err);
    });
    res.redirect('/listings');
});

// edit route

app.get('/listings/:id/edit',async (req,res)=>{
    let{id} = req.params;
    let singleData = await Listing.findById(id);
    res.render('list/edit.ejs',{singleData});
});

//update route

app.put('/listings/:id', async (req,res)=>{
    let { id } = req.params;
    let{title : title ,description: description  ,image :image,price :price,location : location,country : country} = req.body;

    let updatedvalue = await Listing.findByIdAndUpdate(id,{
        title: title,
        description : description,
        image : image,
        price : price,
        location : location,
        country : country
    },{runValidators : true , new : true});
    res.redirect('/listings');
});


// Delete route

app.delete('/listings/:id/delete', async(req,res)=>{
    let {id} = req.params;
    let deleteElement = await Listing.findByIdAndDelete(id);
    res.redirect('/listings');
});





