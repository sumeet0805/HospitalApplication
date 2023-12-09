require("./config/database").connect();

const express = require("express");
const app = express();
const passport = require('passport');
const passportJWT = require('./config/passport-jwt-startegy');

app.use(express.urlencoded({ extended: false }));

//routes imports
const doctorRoutes = require("./routes/doctor");
const patientRoutes = require("./routes/patient");
const reportRoutes = require("./routes/report");

//passport initialization
app.use(passport.initialize());

//my routes
app.use("/api", doctorRoutes);
app.use("/api", patientRoutes);
app.use("/api", reportRoutes);


app.get("/", (req, res) => {
  res.send(
    '<div style = "font-family: Arial, Helvetica, sans-serif;display: flex; flex-direction:column; gap:2rem;align-items:center; justify-content:center; color:orangered; padding: 30px"><h1 style="font-size: 3rem">🏥 Hospital API 🚑</h1><a href="https://documenter.getpostman.com/view/28551869/2s946fdsQS" style = "background: orangered; padding: 10px 20px; color:white; text-decoration:none; font-size:1rem; cursor:pointer; border-radius:5px" href="/api-docs"><p style="font-size: 2rem; margin:0">Documentation 📄</p></div>'
  );
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
