import prisma from "../config/db.config";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import { constants } from "../constants";

class UserController {

    static async register(req:any,res:any){
        try {
            const {username,email,password,rePass} = req.body
            
            if(!username || !email || !password || !rePass){
                return res.status(401).json({msg:"Please enter all fields"})
            }

            const userExists = await prisma.user.findFirst({
                where : {email:email}
                }
            )
            console.log("User already exists : ",userExists);

            if(userExists){
                return res.status(400).json({msg:"User already exists!"})
            }

            if(password !== rePass){
                return res.status(400).json({msg:"Wrong password! Re-enter again"})
            }

            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            console.log(hash);
            

            const newUser = await prisma.user.create({
                data:{
                    email: email,
                    name: username,
                    password : hash
                }
            })

            if(!newUser){
                return res.status(400).json({msg:"Error occured!....User not created!"})
            }
            console.log("User Successfully created! ");
            
        
        return res.status(200).json({msg:"User Sucessfully Created"})
        } catch (error) {
            console.log(error);
        }
    }

    static async login (req:any,res:any){
        try {
            const {email,password} = req.body;

            if(!email || !password){
                return res.status(401).json({msg:"Enter all details"})
            }
            const user = await prisma.user.findFirst({
                where : {email:email}
            })

            if(!user){
                return res.status(404).json({msg:"User not found"})
            }
            const isMatch = await bcrypt.compare(password,user.password);
            if(!isMatch){
                return res.status(400).json({msg:"Wrong password!"})
            }
            
            const payload = {
                id : user.id,
                name : user.name,
                email : user.email,
            }
            const token = jwt.sign(payload,constants.Jwtsecret,{expiresIn:"12h"})
            
            return res.status(200).json({msg:"Login Successful",token:token})

        } catch (error) {
            console.log(error);
        }
    }
}

export  default UserController