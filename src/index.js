import app from "./app.js";
import dotenv from 'dotenv'
import connectDB from './db/index.js'

const PORT = 4000

dotenv.config({
  path:'./.env'
})

connectDB()
.then(()=>{
  app.listen(PORT, ()=>{
    console.log(`Server is running at port : ${PORT}`)
  })
})
.catch((err)=>{
  console.log("MONGODB CONNECTION FAILED !!!" , err)
})