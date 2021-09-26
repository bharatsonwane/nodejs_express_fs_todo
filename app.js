// nodejs inbuild library--------------------------------------------
const path = require('path');

// nodejs external library---------------------------------------------
const express = require('express');
const bodyParser = require('body-parser');

// import from other files----------------------------------------------
const swagger = require('./server/utils/swagger/swagger.routes');
const taskRoutes = require('./server/routes/task.routes');
const authRoutes = require('./server/routes/authJWT.routes');
const employeeRoutes = require("./server/routes/employee.routes")
const feedbackRoutes = require('./server/routes/feedback.routes');

// define constants -----------------------------------------------------
const app = express();


// add middleware---------------------------------------------------------
// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // application/json
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

// set static folder ==> public folder---------------------------------------
app.use(express.static(path.join(__dirname, 'server', 'public')));




// Route-----------------------------------------------------------------------
app.use('/todo', taskRoutes);
app.use('/authJWT', authRoutes);
app.use("/employee", employeeRoutes)
app.use('/feedback', feedbackRoutes);



// Swagger Route--------------------------------------------------------------
app.use('/', swagger);

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
app.listen(8080);