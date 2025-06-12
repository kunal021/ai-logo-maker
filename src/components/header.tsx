"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import { ThemeSwitch } from "./theme-switch";
import Link from "next/link";
import { motion } from "motion/react";
import { useState, useEffect } from "react";

function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show header when scrolling up or at top
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      }
      // Hide header when scrolling down (after initial scroll threshold)
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <motion.header
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-6xl mx-auto px-4 sm:px-6"
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: isVisible ? 0 : -100,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: [0.25, 0.25, 0, 1],
        }}
      >
        <div className="backdrop-blur-xl bg-white/10 dark:bg-gray-900/10 border border-primary/50 shadow-xl shadow-black/5 dark:shadow-black/20 rounded-full">
          <div className="px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
            {/* Logo Section */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Link href="/" className="flex items-center space-x-2 group">
                <div className="relative">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                    whileHover={{ scale: 1.1 }}
                  />
                  <Image
                    src="/logo.svg"
                    alt="Logo"
                    width={30}
                    height={30}
                    className="relative z-10 transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </Link>
            </motion.div>

            {/* Navigation Actions */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Get Started Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button className="cursor-pointer h-9 sm:h-10 px-4 sm:px-6 text-sm sm:text-base font-semibold rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 dark:from-orange-600 dark:to-orange-700 dark:hover:from-orange-700 dark:hover:to-orange-800 border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-white">
                  <motion.span
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="flex items-center gap-2"
                  >
                    Get Started
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="hidden sm:block"
                      initial={{ x: 0 }}
                      whileHover={{ x: 2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </motion.svg>
                  </motion.span>
                </Button>
              </motion.div>

              {/* Theme Switch */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gray-100/80 dark:bg-gray-800/80 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 transition-colors duration-300 backdrop-blur-sm"
              >
                <ThemeSwitch />
              </motion.div>
            </div>
          </div>

          {/* Animated accent border */}
          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent mx-4"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          />
        </div>
      </motion.header>

      {/* Spacer to prevent content jump */}
      <div className="h-20 sm:h-24" />
    </>
  );
}

export default Header;
