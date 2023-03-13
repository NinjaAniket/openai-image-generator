import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.route("/").post(async (req, res) => {
	try {
		const { prompt } = req.body;
		const aiResponse = await openai.createImage({
			prompt: prompt,
			n: 1,
			size: "1024x1024",
			response_format: "b64_json",
		});

		const photo = aiResponse.data.data[0].b64_json;
		res.status(200).json({ photo });
	} catch (e) {
		res.status(500).send(e?.response?.data.error.message);
	}
});

export default router;
