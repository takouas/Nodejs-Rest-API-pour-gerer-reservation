require('./db/connect');
const express = require("express");
const app = express();
// Middleware
app.use(express.json());


const certification_router = require('./routers/certification');
const reservation_router = require('./routers/reservation');
const user_router = require('./routers/user');
const cnx_router = require('./routers/cnx');

//routes
app.use("/api/certif", certification_router);
app.use("/api/reservation", reservation_router);
app.use("/api/user", user_router);
app.use("/api/cnx", cnx_router);
app.listen(3000, () => {
    console.log("Serveur à l'écoute")
})