import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

const Cancel = () => {
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-[70vh] flex flex-col items-center justify-center text-center gap-4"
    >
      <span className="text-sm font-semibold text-red-600">Payment Cancelled</span>
      <h1 className="text-3xl sm:text-4xl font-semibold">Payment was not completed</h1>
      <p className="text-gray-600 max-w-xl">
        If you ran into trouble during checkout, you can try again or pick a different plan.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 mt-2">
        <Link
          to="/buy"
          className="bg-gray-900 text-white px-6 py-2.5 rounded-md hover:bg-gray-800 transition-colors"
        >
          Choose a Plan
        </Link>
        <Link
          to="/"
          className="border border-gray-300 px-6 py-2.5 rounded-md hover:border-gray-400 transition-colors"
        >
          Back Home
        </Link>
      </div>
    </motion.div>
  );
};

export default Cancel;
