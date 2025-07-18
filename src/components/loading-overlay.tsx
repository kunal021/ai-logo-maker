// components/LoadingOverlay.tsx
"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import Image from "next/image";

export default function LoadingOverlay() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsVisible(true);
    const timeout = setTimeout(() => setIsVisible(false), 700); // Adjust duration as needed
    return () => clearTimeout(timeout);
  }, [pathname]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-white/90 dark:bg-black/90 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="flex flex-col items-center gap-3"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 3, -3, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/logo.svg"
            alt="Logo"
            width={100}
            height={100}
            className="drop-shadow-md"
          />
        </motion.div>
        <motion.p
          className="text-sm text-gray-700 dark:text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Loading...
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
