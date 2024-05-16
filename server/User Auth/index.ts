import express from "express"
import cors from 'cors'
import AuthRoutes from './routes/authRoutes'

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors());

app.use("/api",AuthRoutes)

app.listen(8000,() =>{
    console.log("Listening on PORT : 8000");
})
