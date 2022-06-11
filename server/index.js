require("dotenv").config();
import "regenerator-runtime/runtime.js";
import express from "express";
import http from "http";

require('../db/mongoose')

import routes from './routes';

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());

const { auth, email, admin, user, contact } = routes;
const PORT = process.env.PORT || 8080;
const server = http.createServer(app);

app.use(auth);
app.use(email);
app.use(admin);
app.use(user);
app.use(contact);

server.listen(PORT, async (error) => {
  if (error) {
    return error;
  }

  return console.log(`server started on port ${PORT}`);
});
