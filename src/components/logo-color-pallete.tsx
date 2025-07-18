"use client";

import React, { useRef, useEffect } from "react";
import HeadingDescription from "./heading-description";
import { lookup } from "@/data/lookup";
import { colors } from "@/data/colors";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface LogoColorPalleteProps {
  value: string;
  onHandleInputChange: (value: string) => void;
}

function LogoColorPallete({
  value,
  onHandleInputChange,
}: LogoColorPalleteProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const paletteRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Manual scroll with arrows
  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = 300;
      containerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Auto-scroll to selected palette
  useEffect(() => {
    const selectedRef = paletteRefs.current[value];
    const container = containerRef.current;

    if (selectedRef && container) {
      const scrollLeft =
        selectedRef.offsetLeft -
        container.offsetLeft -
        container.clientWidth / 2 +
        selectedRef.clientWidth / 2;

      container.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
    }
  }, [value]);

  return (
    <div className="my-10">
      <HeadingDescription
        title={lookup?.logoColorPaletteTitle}
        description={lookup?.logoColorPaletteDesc}
      />

      <div className="relative mt-6">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-900 shadow-md p-2 rounded-full"
        >
          <ChevronLeft />
        </button>

        {/* Scrollable Container */}
        <div
          ref={containerRef}
          className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar px-10"
        >
          <AnimatePresence>
            {colors.map((palette) => {
              const isSelected = value === palette.name;

              return (
                <motion.div
                  key={palette.name}
                  ref={(el) => {
                    paletteRefs.current[palette.name] = el;
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  onClick={() => onHandleInputChange(palette.name)}
                  className={`min-w-[200px] rounded-lg overflow-hidden shadow border cursor-pointer ${
                    isSelected
                      ? "border-primary border-2"
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

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-900 shadow-md p-2 rounded-full"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}

export default LogoColorPallete;
