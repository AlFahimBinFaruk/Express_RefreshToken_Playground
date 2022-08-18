require("dotenv").config();
const express=require("express")
const sequelize=require("./config")
const errorHandler=require("./middlewares/errorHandler")
const app=express()

const middlewares=[
    express.json(),
    express.urlencoded({extended:true})
]

app.use(middlewares)

app.get("/health",(req,res)=>{
    res.status(200).json({msg:"API Working!!"})
})

app.use("/api/blog",require("./routes/blog"))
app.use("/api/user",require("./routes/user"))

// initialize error handler
app.use(errorHandler)

const PORT=8000

// initialize sequelize and listen for app
sequelize.sync().then(()=>{
    app.listen(PORT,()=>console.log("Server is running on port =>",PORT))
}).catch((err)=>{
    console.error(err)
})