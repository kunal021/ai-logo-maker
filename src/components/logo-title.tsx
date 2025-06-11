"use client";

import React, { useState } from "react";
import HeadingDescription from "./heading-description";
import { lookup } from "@/data/lookup";
import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { Input } from "./ui/input";

function LogoTitle({
  onHandleInputChange,
}: {
  onHandleInputChange: (value: string) => void;
}) {
  const searchParams = useSearchParams();
  const logoTitle = searchParams?.get("title");
  const [title] = useState(logoTitle ?? "");
  return (
    <div className="my-10">
      <HeadingDescription
        title={lookup?.logoTitle}
        description={lookup?.logoTitleDesc}
      />

      <motion.div
        className="w-full mt-4"
        whileFocus={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <Input
          defaultValue={title}
          placeholder={lookup.inputPlaceholder}
          onChange={(e) => onHandleInputChange(e.target.value)}
          className="w-full p-3 sm:p-5 text-sm sm:text-base border-2 rounded-md text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 bg-gray-100/40 dark:bg-gray-800/40 focus:outline-none focus:border-primary dark:focus:border-primary transition-colors duration-300"
        />
      </motion.div>
    </div>
  );
}

export default LogoTitle;
