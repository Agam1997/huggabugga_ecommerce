const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
const app = express();
const dotenv = require("dotenv");
const path = require('path');

app.use(express.json())
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}))
app.use(fileUpload());

const errorMiddleware = require("./middleware/error");
// config
dotenv.config({path:"backend/config/dev.env"});

// Route imports

const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);
app.get("/api/test", (req, res) => {
    res.send("test")
})

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", function(_, res) {
    res.sendFile(
        path.join(__dirname, "../frontend/build/index.html"),
        function (err) {
            if(err) {
                res.status(500).send(err)
            }
        }
    )
})
// error middleware

app.use(errorMiddleware)

module.exports = app