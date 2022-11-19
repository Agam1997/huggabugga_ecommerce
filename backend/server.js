const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const cloudinary = require('cloudinary')

// uncaught error handler
process.on("uncaughtException", err => {
    console.log(`error : : ${err.message}`,);
    console.log("shutting down server due to uncaught exception");
    process.exit(1);
})

// config
dotenv.config({path:"backend/config/dev.env"});
// console.log(process.env)

// connect db
connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const server = app.listen(process.env.PORT, () => {
    
    console.log("Server running on : ", process.env.port);
})



// unhandled promise rejection
process.on("unhandledRejection", err => {
    console.log(`error : : ${err.message}`,);
    console.log("shutting down server due to unhandled promise rejection");

    server.close(() => {
        process.exit(1);
    })
})