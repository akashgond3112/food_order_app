import express from "express";
import bodyParser from "body-parser"
import 'dotenv/config'
import {AdminRoutes, VendorRoutes } from "./routes"

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}))

app.use("/admin", AdminRoutes)
app.use("/vendor", VendorRoutes)



app.listen(8000, () => {
    console.log("App is listening to port 8000");
    
});