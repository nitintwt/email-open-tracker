import express from "express";
import cors from "cors"
import mailRouter from "./routes/mail.route.js";


const app = express()

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials:true,
}))

app.use(express.static('public'));
app.use(express.json({limit:'16kb'})) 
app.use(express.urlencoded({extended: true , limit:"16kb"}))

app.get("/" , (req , res)=>{
  res.status(200).json({message:"Server is running properly"})
})

app.use("/api/v1/mail" , mailRouter )

export default app