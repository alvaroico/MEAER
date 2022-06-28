import express from "express";
import swaggerUi from "swagger-ui-express";
import bodyParser from "body-parser";

import homeRota from "./Routes/home";
import senha from "./Routes/senha";
import { JWTDecode } from "./guards/JWTDecode";

const app = express();
app.use(bodyParser.json());
const swaggerDocument = require("../swagger.json");

app.use("/", homeRota);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/senha", JWTDecode("meaer"), senha);

module.exports = app;
