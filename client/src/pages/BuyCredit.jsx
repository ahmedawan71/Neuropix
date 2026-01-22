import React, { useContext } from "react";
import { assets, plans } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "motion/react";
import axios from "axios";

const BuyCredit = () => {
  const { user, token, setShowLogin } = useContext(AppContext);

  const handlePurchase = async (item) => {
    try {
      if (!user) {
        // Trigger login modal when unauthenticated
        setShowLogin(true);
        return;
      }

      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/payment/checkout`,
        {
          planId: item.id,
          price: item.price,
          credits: item.credits,
        },
        {
          headers: { token },
        }
      );

      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error("Payment error:", error);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="min-h-[80vh] text-center pt-14 mb-10"
    >
      <button className="border border-gray-400 px-10 py-2 rounded-full mb-6">
        Our Plans
      </button>
      <h1 className="text-center text-3xl font-medium mb-6 sm:mb-10">
        Choose the Plan
      </h1>

      <div className="flex flex-wrap justify-center gap-6 text-left">
        {plans.map((item, index) => (
          <div
            key={index}
            className="bg-white drop-shadow-sm border rounded-lg py-12 px-8 hover:scake-105 transition-all duration-500 text-gray-600"
          >
            <img width={40} src={assets.logo_icon} alt="" />
            <p className="mt-3 mb-1 font-semibold">{item.id}</p>
            <p className="text-sm">{item.desc}</p>
            <p className="mt-6">
              <span className="text-3xl font-medium">${item.price}</span> /{" "}
              {item.credits} credits
            </p>
            <button
              onClick={() => handlePurchase(item)}
              className="w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52 cursor-pointer hover:bg-gray-700 transition-colors"
            >
              {user ? "Purchase" : "Get Started"}
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default BuyCredit;
