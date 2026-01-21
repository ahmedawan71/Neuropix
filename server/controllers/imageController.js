import axios from "axios";
import userModel from "../models/userModel.js";

export const generateImage = async (req, res) => {
  try {
    const userId = req.userId;
    const { prompt } = req.body;

    const user = await userModel.findById(userId);

    if (!user || !prompt) {
      return res.json({ success: false, message: "Missing Details" });
    }

    if (user.creditBalance <= 0) {
      return res.json({
        success: false,
        message: "No credit balance",
        creditBalance: user.creditBalance,
      });
    }

    // 🔁 Cloudflare Workers AI API call
    const response = await axios.post(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/stabilityai/stable-diffusion-xl-base-1.0`,
      {
        prompt: prompt,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer", // VERY IMPORTANT
      }
    );

    // Convert binary image to base64
    const image64 = Buffer.from(response.data).toString("base64");
    const resultImage = `data:image/png;base64,${image64}`;

    // Deduct credit
    await userModel.findByIdAndUpdate(user._id, {
      creditBalance: user.creditBalance - 1,
    });

    res.json({
      success: true,
      message: "Image Generated",
      creditBalance: user.creditBalance - 1,
      resultImage,
    });

  } catch (error) {
    console.error("Cloudflare AI Error:", error?.response?.data || error.message);
    return res.json({
      success: false,
      message: "Image generation failed",
    });
  }
};
