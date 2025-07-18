"use client";

import React from "react";
import HeadingDescription from "./heading-description";
import { lookup } from "@/data/lookup";
import { logoDesigns } from "@/data/logo-design";
import { motion } from "framer-motion";

interface LogoDesignsProps {
  value: string;
  onHandleInputChange: (value: string) => void;
}

function LogoDesigns({ value, onHandleInputChange }: LogoDesignsProps) {
  return (
    <div className="my-10">
      <HeadingDescription
        title={lookup?.logoDesignTitle || "Choose a Logo Style"}
        description={
          lookup?.logoDesignDesc ||
          "Select a logo style that matches your brand's identity."
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {logoDesigns.map((design, index) => {
          const isSelected = value === design.title;

          return (
            <motion.div
              key={index}
              onClick={() => onHandleInputChange(design.title)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`cursor-pointer rounded-xl p-5 shadow-md border transition-all duration-300 ${
                isSelected
                  ? "border-primary ring-2 ring-primary bg-primary/5"
                  : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
              }`}
            >
              {/* Icon or fallback */}
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl font-semibold bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white mb-3">
                {design.icon || design.title.charAt(0)}
              </div>

              {/* Title & Prompt */}
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {design.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-5">
                {design.prompt}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default LogoDesigns;
