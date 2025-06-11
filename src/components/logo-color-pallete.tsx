"use client";
import React, { useState } from "react";
import HeadingDescription from "./heading-description";
import { lookup } from "@/data/lookup";
import { colors } from "@/data/colors";
import { motion, AnimatePresence } from "motion/react";

function LogoColorPallete({
  onHandleInputChange,
}: {
  onHandleInputChange: (value: string) => void;
}) {
  const [showAll, setShowAll] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const initialCount = 6;
  const palettesToShow = showAll ? colors : colors.slice(0, initialCount);

  return (
    <div className="my-10">
      <HeadingDescription
        title={lookup?.logoColorPaletteTitle}
        description={lookup?.logoColorPaletteDesc}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        <AnimatePresence>
          {palettesToShow.map((palette) => {
            const isSelected = selectedOption === palette.name;

            return (
              <motion.div
                key={palette.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                onClick={() => {
                  setSelectedOption(palette.name);
                  onHandleInputChange(palette.name);
                }}
                className={`rounded-lg overflow-hidden shadow border cursor-pointer ${
                  isSelected
                    ? "ring-2 ring-primary border-primary"
                    : "border-gray-200 dark:border-gray-700"
                }`}
              >
                <div className="px-4 py-1 text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                  {palette.name}
                </div>
                <div className="flex h-14">
                  {palette.colors.map((color, idx) => (
                    <div
                      key={idx}
                      className="flex-1"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {colors.length > initialCount && (
        <div className="flex justify-center mt-8">
          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.03 }}
            onClick={() => setShowAll((prev) => !prev)}
            className="text-sm font-medium px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/80 transition"
          >
            {showAll ? "Show Less" : "Show More"}
          </motion.button>
        </div>
      )}
    </div>
  );
}

export default LogoColorPallete;
