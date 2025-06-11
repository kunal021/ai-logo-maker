"use client";
import { lookup } from "@/data/lookup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

function Hero() {
  const [logoTitle, setLogoTitle] = useState("");
  const heroRef = useRef(null);
  const projectSectionRef = useRef(null);
  const tagsRef = useRef(null);

  // Scroll-based animations
  const { scrollY } = useScroll();
  const blobScale = useTransform(scrollY, [0, 500], [1, 1.2]);
  const blobRotate = useTransform(scrollY, [0, 500], [0, 180]);

  // InView hooks for scroll-triggered animations
  const isHeroInView = useInView(heroRef, { once: true, margin: "-100px" });
  // const isProjectSectionInView = useInView(projectSectionRef, {
  //   once: true,
  //   margin: "-50px",
  // });
  // const isTagsInView = useInView(tagsRef, { once: true, margin: "-20px" });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.25, 0, 1],
      },
    },
  };

  const headingVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.25, 0, 1],
      },
    },
  };

  const inputButtonVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.25, 0, 1],
        delay: 0.4,
      },
    },
  };

  const projectSectionVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.25, 0, 1],
      },
    },
  };

  const tagVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20,
    },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.25, 0, 1],
        delay: i * 0.1,
      },
    }),
  };

  return (
    <>
      {/* Animated Blob Background */}
      <motion.div
        className="fixed h-full w-full z-[-1] inset-0 m-auto blur-[90px] md:blur-[100px]"
        style={{ scale: blobScale }}
      >
        <motion.div
          className="rounded-[99999px] absolute inset-0 w-screen h-screen overflow-hidden bg-primary transform scale-[0.8] sm:scale-[0.6] dark:scale-[0.5] dark:sm:scale-[0.4]"
          style={{ rotate: blobRotate }}
        >
          {/* Light mode gradient */}
          <div
            className="animate-spin-blob absolute h-screen w-screen inset-0 m-auto bg-[conic-gradient(from_0deg,#fdba74,#fef08a,#fef3c7,#fef3c7,#fdba74)] 
      md:bg-[conic-gradient(from_0deg,#fb923c,#fcd34d,#fef08a,#fde68a,#fb923c)] 
      dark:hidden"
          ></div>

          {/* Dark mode gradient */}
          <div
            className="animate-spin-blob absolute h-screen w-screen inset-0 m-auto hidden dark:block 
      bg-[conic-gradient(from_0deg,#78350f,#a16207,#854d0e,#92400e,#78350f)] 
      md:bg-[conic-gradient(from_0deg,#92400e,#ca8a04,#854d0e,#facc15,#92400e)]"
          ></div>
        </motion.div>
      </motion.div>

      {/* Hero Content */}
      <motion.div
        ref={heroRef}
        className="relative flex flex-col items-center sm:px-6 py-12 md:my-24 gap-3 sm:gap-5 z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isHeroInView ? "visible" : "hidden"}
      >
        <motion.h1
          className="text-primary text-5xl md:text-6xl text-center font-bold"
          variants={headingVariants}
        >
          {lookup.heroHeading}
        </motion.h1>

        <motion.h2
          className="text-2xl sm:text-4xl md:text-5xl text-center font-bold"
          variants={headingVariants}
        >
          {lookup.heroSubHeading}
        </motion.h2>

        <motion.p
          className="text-center text-sm xs:text-base sm:text-lg text-gray-500 dark:text-gray-300 max-w-3xl"
          variants={itemVariants}
        >
          {lookup.heroDescription}
        </motion.p>

        {/* Input and Button */}
        <motion.div
          className="flex flex-col sm:flex-row gap-2 w-full max-w-2xl"
          variants={inputButtonVariants}
        >
          <motion.div
            className="w-full"
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Input
              placeholder={lookup.inputPlaceholder}
              onChange={(e) => setLogoTitle(e.target.value)}
              className="w-full p-3 sm:p-5 text-sm sm:text-base border-2 rounded-md text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 bg-gray-100/40 dark:bg-gray-800/40 focus:outline-none focus:border-orange-500 dark:focus:border-orange-400 transition-colors duration-300"
            />
          </motion.div>
          <Link href={`/create?title=${logoTitle}`}>
            <Button className="cursor-pointer py-3 sm:py-5 text-sm sm:text-base w-full sm:w-auto">
              <motion.span
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                Get Started
              </motion.span>
            </Button>
          </Link>
        </motion.div>

        {/* Project Section with Scroll Animation */}
        <motion.div
          ref={projectSectionRef}
          className="mt-6 sm:mt-12 mb-4 sm:mb-6 space-y-4 sm:space-y-8 w-full max-w-4xl px-2 sm:px-4"
          variants={projectSectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div
            className="text-center space-y-1 sm:space-y-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.25, 0, 1] }}
            viewport={{ once: true }}
          >
            <motion.h3
              className="text-orange-500 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.7,
                ease: [0.25, 0.25, 0, 1],
                delay: 0.1,
              }}
              viewport={{ once: true }}
            >
              Your next big project starts here!
            </motion.h3>
            <motion.p
              className="text-gray-600 dark:text-gray-300 text-base md:text-xl lg:text-2xl font-medium leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.25, 0, 1],
                delay: 0.2,
              }}
              viewport={{ once: true }}
            >
              Enter your idea or project name to begin transforming your vision
              into reality.
            </motion.p>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.25, 0, 1], delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="absolute -left-2 top-0 h-full w-1 bg-gradient-to-b from-orange-400 to-transparent rounded-full opacity-70"
              initial={{ scaleY: 0, originY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.25, 0, 1],
                delay: 0.4,
              }}
              viewport={{ once: true }}
            ></motion.div>
            <p className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-300 leading-relaxed pl-3 sm:pl-4 py-1 sm:py-2 border-l-2 border-orange-200 dark:border-orange-800/30">
              Whether you&apos;re launching a startup, building a personal
              brand, or starting a community project, our AI-powered logo
              generator helps you design a unique and professional logo with
              ease, giving you the creative tools and guidance you need to
              succeed.
            </p>
          </motion.div>
        </motion.div>

        {/* Animated Tags */}
        <motion.div
          ref={tagsRef}
          className="flex flex-wrap justify-center gap-2 mt-2 sm:mt-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20px" }}
        >
          {["Startups", "Portfolios", "Communities", "Products"].map(
            (tag, i) => (
              <motion.span
                key={tag}
                className="px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 rounded-full text-xs font-medium"
                variants={tagVariants}
                custom={i}
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                {tag}
              </motion.span>
            )
          )}
        </motion.div>
      </motion.div>
    </>
  );
}

export default Hero;
