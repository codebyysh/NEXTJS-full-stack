import mongoose from "mongoose";
import { buffer } from "stream/consumers";

const MONGODB_URI = process.env.MONGODB_URI !

if ( !MONGODB_URI ){
    throw new Error ( "Please define mongo_uri in env variables") ; 
}

let cached = global.mongoose

if ( !cached ) {
    cached = global.mongoose = {
        conn: null , promise: null
    }
}

export async function connectToDatabase (){
    if ( cached.conn ){
        return cached.conn 
    }
    else if ( !cached.promise ){

        cached.promise = mongoose.connect(MONGODB_URI).then(() => mongoose.connection);
    }

    try{
        cached.conn = await cached.promise
    }catch ( error ){
        cached.promise = null 
        throw error 
    }
    return cached.conn 
}