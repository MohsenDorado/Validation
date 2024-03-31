import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { toast } from "react-hot-toast";
import jwt from "jsonwebtoken";


connect();




export async function POST(request:NextRequest) {
    try {
      const reqBody= await request.json();
     const {email,password}= reqBody;
     console.log(reqBody);
     //!if user exists
     const user= await User.findOne({email})
     if (!user) {
      return NextResponse.json({error:"User doesn't exists"},{status:400})
      
     }
          //!  if pass correct
          const validPass=await bcryptjs.compare(password,user.password) 
        if (!validPass) {
          return NextResponse.json({error:"i wont be doing that"},{status:500})
          
        }
        // create jwt data
        const tokenData={
          id:user._id,
          username:user.username,
          email:user.email

        }
        //create jwt
        const token =await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:"1d"})

        const response=NextResponse.json({message:"Login successfuly", success:true,})
        response.cookies.set("token",token,{httpOnly:true,})
        
        return response;


     


    } catch (error:any) {
      return NextResponse.json({error:error.message},
        {status:500})
    }
    
}