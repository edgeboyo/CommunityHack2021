import express from "express";
import { config } from "dotenv";
import { setUpApi } from "./api/api";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
config();

export const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.status(200).send("Hello world!").end();
});

app.get("*", (req, res) => {
  console.log(req.originalUrl);
  res.sendFile(path.join(__dirname + `/client${req.originalUrl}`));
});

setUpApi(app);

// Start the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log("Press Ctrl+C to quit.");
});
