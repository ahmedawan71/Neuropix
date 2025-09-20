import React from "react";
import { assets } from "../assets/assets";
import { motion } from "motion/react";

const Description = () => {
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center my-24 p-6 md:px-28"
    >
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2">
        Generate AI Art
      </h1>
      <p className="text-gray-500 mb-8">
        Bring your ideas to life with stunning visuals
      </p>

      <div className="flex flex-col md:flex-row items-center gap-5 md:gap-14">
        <img
          src={assets.sample_img_1}
          className="w-80 rounded-lg xl:w-96"
          alt=""
        />
        <div>
          <h2 className="text-3xl font-medium max-w-lg mb-4">
            Meet Your AI-Powered Text-to-Image Creator
          </h2>
          <p className="text-gray-600 mb-4">
            Turn your ideas into visuals with ease using our free image
            generator. Whether you are looking for stunning artwork, unique
            designs, or custom concepts, our tool transforms text into
            eye-catching images in just a few clicks. Imagine it, describe it,
            and see it appear instantly.
          </p>
          <p className="text-gray-600">
            Simply enter a prompt and let our advanced AI create high-quality
            images within seconds. From product mockups to portraits, character
            designs, and even ideas that do not exist yet — the creative
            possibilities are endless.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Description;
