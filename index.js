import express from "express";
import { getStudents } from "./services/test.js";
import { generalRouter } from "./routes/generalRoutes.js";
import { studentRouter } from "./routes/onlyStudentRoutes.js";
import { authRouter } from "./routes/authRoutes.js";
import { fileRouter } from "./routes/fileRoutes.js";
import { errorHandler } from "./utils/errorHandling.js";
import { undefinedEndpoint } from "./utils/middlewares.js";
import dotenv from "dotenv";
import cors from "cors"

dotenv.config();
const app = express();

const PORT = process.env.SERVER_PORT || 5000;

app.use(express.json());
app.use(cors())

app.use("/", generalRouter);
app.use("/", studentRouter);
app.use("/", authRouter);
app.use("/", fileRouter);

app.get("/test", async (req, res) => {
    
    res.json(await getStudents());
})


app.use(undefinedEndpoint);
app.use(errorHandler);


app.listen(PORT, () =>
    console.log(`📡 server running on port ${PORT}`)
);

export default app;
