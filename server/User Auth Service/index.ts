import express from "express"
import cors from 'cors'
import AuthRoutes from './routes/authRoutes'
import 'dotenv/config'

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors());
const port = process.env.PORT || 8001;

app.use("/",AuthRoutes)

app.listen(port,() =>{
    console.log("Listening on PORT : 8001");
})
