"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import * as motion from "motion/react-client";

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-transparent border-0 hover:bg-gray-100 dark:hover:bg-gray-800"
        disabled
      >
        <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
      </Button>
    );
  }

  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Button
        onClick={toggleTheme}
        variant="ghost"
        size="icon"
        aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
        className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-transparent border-0 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 transition-all duration-300 overflow-hidden"
      >
        {/* Moon Icon - Shows in light mode (click to go dark) */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={false}
          animate={{
            rotate: isDark ? 180 : 0,
            scale: isDark ? 0 : 1,
            opacity: isDark ? 0 : 1,
          }}
          transition={{
            duration: 0.4,
            ease: [0.25, 0.25, 0, 1],
          }}
        >
          <Moon className="h-4 w-4 sm:h-5 sm:w-5 text-slate-600 hover:text-slate-800" />
        </motion.div>

        {/* Sun Icon - Shows in dark mode (click to go light) */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={false}
          animate={{
            rotate: isDark ? 0 : -180,
            scale: isDark ? 1 : 0,
            opacity: isDark ? 1 : 0,
          }}
          transition={{
            duration: 0.4,
            ease: [0.25, 0.25, 0, 1],
          }}
        >
          <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 hover:text-yellow-500" />
        </motion.div>

        {/* Background Animation */}
        <motion.div
          className="absolute inset-0 rounded-xl"
          initial={false}
          animate={{
            background: isDark
              ? "linear-gradient(45deg, rgba(251, 146, 60, 0.1), rgba(245, 158, 11, 0.1))"
              : "linear-gradient(45deg, rgba(71, 85, 105, 0.1), rgba(100, 116, 139, 0.1))",
          }}
          transition={{ duration: 0.3 }}
        />
      </Button>
    </motion.div>
  );
}
