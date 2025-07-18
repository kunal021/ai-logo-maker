import React from "react";
import HeadingDescription from "./heading-description";
import { lookup } from "@/data/lookup";
import { motion } from "framer-motion"; // Fix: changed from "motion/react" to "framer-motion"
import { Input } from "./ui/input";

interface LogoDescriptionProps {
  value: string;
  onHandleInputChange: (value: string) => void;
}

function LogoDescription({ value, onHandleInputChange }: LogoDescriptionProps) {
  return (
    <div className="my-10">
      <HeadingDescription
        title={lookup?.logoDescTitle}
        description={lookup?.logoDescDesc}
      />

      <motion.div
        className="w-full mt-4"
        whileFocus={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <Input
          value={value}
          placeholder={lookup.inputPlaceholder}
          onChange={(e) => onHandleInputChange(e.target.value)}
          className="w-full p-3 sm:p-5 text-sm sm:text-base border-2 rounded-md text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 bg-gray-100/40 dark:bg-gray-800/40 focus:outline-none focus:border-primary dark:focus:border-primary transition-colors duration-300"
        />
      </motion.div>
    </div>
  );
}

export default LogoDescription;
