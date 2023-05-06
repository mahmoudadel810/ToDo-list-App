import express from "express";
import { json } from "express";
import connectionDB from './DB/connection.js'

 const port = 3000;
const app = express();
const BASE_URL = '/api/v1'
import * as AllRouters from "./modules/indexRouters.js";
connectionDB();

app.use(json());
app.use(`${BASE_URL}/user`, AllRouters.userRouter);
app.use(`${BASE_URL}/todo`, AllRouters.todoRouter);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));