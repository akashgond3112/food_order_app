import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import mongoose from "mongoose";
import path from "path";
import { AdminRoutes, VendorRoutes } from "./routes";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/admin", AdminRoutes);
app.use("/vendor", VendorRoutes);

const mongoURL: string | undefined = process.env.MONGO_DATABASE_URL;

if (!mongoURL) {
  console.error("MONGO_DATABASE_URL environment variable is not defined.");
} else {
  mongoose
    .connect(mongoURL, {})
    .then(() => {
      console.log("Connected to MongoDB successfully!");
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
    });
}

app.listen(8000, () => {
  console.log("App is listening to port 8000");
});
