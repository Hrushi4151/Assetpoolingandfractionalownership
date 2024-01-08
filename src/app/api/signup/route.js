import User from "../../../models/User";
import connectDB from "../../../utils/mongoose";
import { NextResponse } from "next/server";
var CryptoJS = require("crypto-js");

export async function POST(req, res) {
  try {
    const body = await req.json();
    const { name, email, password, phone,role="user" } = body;
    if(name!=""|| email!=""||role!=""|| password!=""|| phone!=""){
      const userdata = {
        name,
        phone,
        role,
        email,
        password: CryptoJS.AES.encrypt(password, "secretkey123").toString(),
      };
    await connectDB();
    const user = await User.findOne({ email: email });
    if(!user){await User.create(userdata);
    console.log("account created");
    return NextResponse.json({ status: 200 }, { error: "success" });}
    else{
      throw new Error("Account Already Exist")
    }
  }else{
    throw new Error("Enter All Fields")
  }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 300 , message: error.message });
  }
}
