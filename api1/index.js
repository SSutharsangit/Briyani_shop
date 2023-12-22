const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const app=express()
const authRoutes=require("./routes/auth")
const itemRoutes=require("./routes/items")
const orderRoutes=require("./routes/order")

//DB connection
mongoose.connect("mongodb+srv://suthusutharsan2:1234@cluster0.ld7y5xz.mongodb.net/")
.then(()=>{
console.log("DB connected successfuly");
app.listen(5000,()=>{
    console.log("sever running on port 5000");
})
})
.catch((err)=>{
console.log(err.message);
})


app.use(express.json());
app.use(cors());


//login signup route
app.use("/auth", authRoutes)
//item route
app.use("/item",itemRoutes)
//order route 
app.use("/order",orderRoutes)


