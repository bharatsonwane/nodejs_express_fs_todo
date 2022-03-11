// nodejs inbuild library--------------------------------------------
const path = require('path');


// nodejs external library---------------------------------------------
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')

// swagger -----------------------------------------------------------
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./server/utils/documentation/swagger");

// import from other files----------------------------------------------
const baseUrl = require('./server/helper/config/baseURLconfig');
const routes = require('./server/routes/routes')
// define constants -----------------------------------------------------
const app = express();


// add middleware---------------------------------------------------------
// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // application/json
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
//     next()
// })
app.use(cors())

// set static folder ==> public folder---------------------------------------
app.use(express.static(path.join(__dirname, 'server', 'public')));




// Route --------------------------------------------------------------------------
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use("/test", function (req, res, next) {
    res.send(`<html><body><h1><em>nodejs_express_fs project testing.</em></h1></body></html>`)
})
app.use("/", routes); // App Main Routes



app.use((req, res, next) => {
    const err = new Error("Url not found");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    let status = err.statusCode || 500;
    let message = err.message;
    let data = err.data;
    res.status(status).send({ message: message, data: data })
})


// API URL -------------------------------------------------------------------
app.listen(baseUrl.handleGetApiBaseURL(), () => {
    console.log(`Server is listening on port '${baseUrl.handleGetApiBaseURL()}'`);
});