import { connectToDatabase } from "@/lib/db";
import User from "@/models/Users";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request : NextRequest) {
    try {
        const {email , password} =  await request.json() 

        if ( !email || !password ) {
            return NextResponse.json(
                {email: "Email and password are required"},
                {status : 400}
            )
        }

        await connectToDatabase()

        const existingUser = await User.findOne({email})
        if ( existingUser ) {
            return NextResponse.json(
                {email: "User already registered"},
                {status : 400}
            )
        }

        await User.create({
            email,
            password
        })

        return NextResponse.json(
                {email: "User registered successfully"},
                {status : 400}
            );

    }catch ( error ){
        console.error("Registration error " , error) ;
        return NextResponse.json(
                {email: "Failed to register user "},
                {status : 400}
            );
    }
}