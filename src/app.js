const express =require('express')
const hbs=require('hbs')
const route=require('./routers/main')
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const session=require('express-session');
const fileUpload = require('express-fileupload');
const { handlebars } = require('hbs');
require("./handlebar")
const app=express();
app.use(fileUpload())
app.use(session({
    secret:"restorent_datails"
}))
app.use(bodyParser.urlencoded({
    extended:true
}))

app.use('',route)
//static folder
app.use("/static",express.static("public"));
//template engine
app.set("view engine",'hbs')
app.set("views",'views')
//app.set("views","")
hbs.registerPartials('views/partials')





// mongoose.connect("mongodb://localhost/restorent",()=>{
//     console.log("Server connected..");
// })
mongoose.connect("mongodb://0.0.0.0/restorent", {
    connectTimeoutMS: 30000, // Set to a higher value (e.g., 30 seconds)
    useNewUrlParser: true, // Use the new URL parser
    useUnifiedTopology: true, // Use the new Server Discover and Monitoring engine
}, (err) => {
    if (err) {
        console.error("Error connecting to MongoDB:", err);
    } else {
        console.log("Server connected..");
    }
});

app.listen(5656,()=>{
    console.log('server is start..')
})