import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/post-routes.js";
import aiRoutes from "./routes/ai-routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

//routes
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/ai", aiRoutes);

app.get("/", async (req, res) => {
	res.send("hi hello");
});

const startServer = async () => {
	try {
		connectDB(process.env.MONGODB_URL);
		app.listen(8080, () => console.log("server has started mongodb connected"));
	} catch (e) {
		console.log(e, "error while connecting");
	}
};

startServer();
