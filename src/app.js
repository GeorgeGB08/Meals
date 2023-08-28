const cors = require("cors")
const helmet = require('helmet');
const hpp = require('hpp'); 
const morgan = require('morgan'); 
const rateLimit = require('express-rate-limit');
const xss = require("xss-clean")


const express = require("express");
const { db } = require("./utils/database");

const routes = {
  users: "/api/v1/users",
  restorants: "/api/v1/restorants"

}


const  Ordersrouters  = require("./routes/orders.routes");
const  restorantRoutes  = require("./routes/restorant.routes");
const  globalErrorHandler  = require("./controllers/error.controller");
const  Mealsrouters  = require("./routes/meals.routes");
const  AppError  = require("./utils/appError");


const userRoutes = require("./routes/user.routes")

const app = express();
const limiter = rateLimit({
    max: 100000,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in one hour',
  });

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }


app.use(express.json());

app.use("/api/v1", limiter)

app.use("/api/v1/orders", Ordersrouters);
app.use(routes.users, userRoutes);
// app.use("/api/v1/routes",);

app.use("/api/v1/meals", Mealsrouters);
app.use(routes.restorants, restorantRoutes);




app.all("*", (req, res, next) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this server! 🧨` ,404)
  )
 
});

app.use(globalErrorHandler);

module.exports = { app };














