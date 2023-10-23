import express from "express";
import rateLimit from "express-rate-limit";
import { getStudents } from "./services/test.js";
import { generalRouter } from "./routes/generalRoutes.js";
import { studentRouter } from "./routes/onlyStudentRoutes.js";
import { authRouter } from "./routes/authRoutes.js";
import { fileRouter } from "./routes/fileRoutes.js";
import { errorHandler } from "./utils/errorHandling.js";
import { countRequests, requestCount, undefinedEndpoint } from "./utils/middlewares.js";
import dotenv from "dotenv";
import cors from "cors"

dotenv.config();
const app = express();

const PORT = process.env.SERVER_PORT || 5000;
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 15 minute
    max: 100, // Maximum number of requests per minute per IP
    message: 'Too many requests from this IP, please try again later.',
});

app.use(express.json());
app.use(cors());
// app.use(limiter);
app.use(countRequests);

app.use("/", generalRouter);
app.use("/", studentRouter);
app.use("/", authRouter);
app.use("/", fileRouter);

app.get("/test", async (req, res) => {
    res.json(await getStudents());
});

app.get('/requestCount', (req, res) => {
    res.json({ count: requestCount, message: 'Request count retrieved successfully' });
});


app.use(undefinedEndpoint);
app.use(errorHandler);

app.listen(PORT, () =>
    console.log(`📡 server running on port ${PORT}`)
);

export default app;
