import {app} from './app.js'
import cloudinary from 'cloudinary'
import Stripe from 'stripe';
import { connectDB } from './data/database.js';

connectDB()

export const stripe= new Stripe(process.env.STRIPE_API_SECRET)

// import http from 'http'
// const server = http.createServer(app);
// import {server} from 'socket.io'

// const io = server()

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

app.listen(process.env.PORT, ()=>{
    console.log(`Server listening on port ${process.env.PORT}, in ${process.env.NODE_ENV}`);
});