import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "motion/react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Success = () => {
  const { loadCreditsData } = useContext(AppContext);
  const [params] = useSearchParams();
  const planId = params.get("planId");
  const credits = params.get("credits");

  useEffect(() => {
    // Refresh user balance after return from Stripe
    loadCreditsData?.();
  }, [loadCreditsData]);

  return (
    <motion.div
      initial={{ opacity: 0.2, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-[70vh] flex flex-col items-center justify-center text-center gap-4"
    >
      <span className="text-sm font-semibold text-green-600">Payment Successful</span>
      <h1 className="text-3xl sm:text-4xl font-semibold">You are all set!</h1>
      <p className="text-gray-600 max-w-xl">
        {planId && credits
          ? `Your ${planId} plan is confirmed. ${credits} credits have been added to your account.`
          : "Your payment was successful and your credits have been added to your account."}
      </p>
      <div className="flex flex-col sm:flex-row gap-3 mt-2">
        <Link
          to="/result"
          className="bg-gray-900 text-white px-6 py-2.5 rounded-md hover:bg-gray-800 transition-colors"
        >
          Start Creating
        </Link>
        <Link
          to="/buy"
          className="border border-gray-300 px-6 py-2.5 rounded-md hover:border-gray-400 transition-colors"
        >
          View Plans
        </Link>
      </div>
    </motion.div>
  );
};

export default Success;
