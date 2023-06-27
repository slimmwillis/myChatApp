const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")
const userRoute = require("./Routes/userRoute")
const app = express();
require("dotenv").config() 
app.use(express.json());
const port = process.env.PORT || 5500;
const uri = process.env.DB_URI

app.use(cors());
app.use("/api", userRoute)
app.listen(port, () => {
  console.log("port is connected");
});

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    console.log('connected successfully')
})
.catch((error)=>{console.log(error)})
