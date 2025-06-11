import Image from "next/image";
import { Button } from "./ui/button";
import { ThemeSwitch } from "./theme-switch";
import Link from "next/link";
import * as motion from "motion/react-client";

function Header() {
  return (
    <>
      <div className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-48 2xl:px-56 py-2 flex justify-between items-center shadow-sm dark:border-b border-b-gray-300 dark:border-gray-700">
        <Link href="/">
          <Image src={"/logo.svg"} alt="logo" width={34} height={34} />
        </Link>
        <div className="flex gap-2.5">
          <Button className="cursor-pointer text-sm sm:text-base">
            <motion.span
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              Get Started
            </motion.span>
          </Button>
          <ThemeSwitch />
        </div>
      </div>
    </>
  );
}

export default Header;
