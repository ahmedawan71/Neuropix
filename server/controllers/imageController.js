import axios from "axios";
import userModel from "../models/userModel";
import FormData from "form-data";

export const generateImage = async (req, res) => {
  try {
    const userId = req.userId;
    const prompt = req.body;

    const user = userModel.findById(userId);

    if (!user || !prompt) {
      return res.json({ success: false, message: "Missing Details" });
    }

    if (user.creditBalance === 0 || userModel.creditBalance < 0) {
      return res.json({
        success: false,
        message: "No credit Balance",
        creditBalance: user.creditBalance,
      });
    }

    const formData = new FormData();

    formData.append("prompt", prompt);

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API,
        },
        responseType: "arraybuffer",
      }
    );

    const image64 = Buffer.from(data, "binary").toString("base64");
    const resultImage = `data:image/png;base64,${image64}`;

    await userModel.findByIdAndUpdate(userId, {
      creditBalance: user.creditBalance - 1,
    });

    res.json({success:true, message:"Image Generated", creditBalance:creditBalance-1, resultImage})

  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};