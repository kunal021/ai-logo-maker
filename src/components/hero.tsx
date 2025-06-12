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
          className="rounded-[99999px] absolute inset-0 w-screen h-screen overflow-hidden bg-transparent transform scale-[0.8] sm:scale-[0.6] dark:scale-[0.5] dark:sm:scale-[0.4]"
          style={{ rotate: blobRotate }}
        >
          {/* Light mode gradient - improved colors */}
          <div
            className="animate-spin-blob absolute h-screen w-screen inset-0 m-auto 
    bg-[conic-gradient(from_0deg,#fed7aa,#fef9c3,#fef3c7,#fef3c7,#fed7aa)] 
    md:bg-[conic-gradient(from_0deg,#fdba74,#fde68a,#fef9c3,#fef9c3,#fdba74)] 
    dark:hidden"
          />

          {/* Dark mode gradient */}
          {/* <div
            className="animate-spin-blob absolute h-screen w-screen inset-0 m-auto hidden dark:block 
    bg-[conic-gradient(from_0deg,#7c2d12,#92400e,#a16207,#b45309,#7c2d12)] 
    md:bg-[conic-gradient(from_0deg,#9a3412,#b45309,#d97706,#ca8a04,#9a3412)]"
          /> */}
        </motion.div>
      </motion.div>

      {/* Hero Content */}
      <motion.div
        ref={heroRef}
        className="relative mt-10 sm:mt-6 flex flex-col items-center px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32 gap-8 sm:gap-10 md:gap-12 z-10 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isHeroInView ? "visible" : "hidden"}
      >
        {/* Main Heading - Improved typography */}
        <motion.h1
          className="text-primary text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-center font-black tracking-tight leading-[1.1] sm:leading-[1.05]"
          variants={headingVariants}
        >
          {lookup.heroHeading}
        </motion.h1>

        {/* Sub Heading - Better spacing and sizing */}
        <motion.h2
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-center font-bold tracking-tight leading-[1.2] sm:leading-[1.15] text-gray-800 dark:text-gray-100 mt-2 sm:mt-4"
          variants={headingVariants}
        >
          {lookup.heroSubHeading}
        </motion.h2>

        {/* Description - Improved typography and spacing */}
        <motion.p
          className="text-center text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl leading-relaxed sm:leading-relaxed md:leading-relaxed font-medium mt-4 sm:mt-6"
          variants={itemVariants}
        >
          {lookup.heroDescription}
        </motion.p>

        {/* Input and Button - Better spacing and sizing */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-2xl mt-6 sm:mt-8"
          variants={inputButtonVariants}
        >
          <motion.div
            className="flex-1"
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Input
              placeholder={lookup.inputPlaceholder}
              onChange={(e) => setLogoTitle(e.target.value)}
              className="w-full h-12 sm:h-14 px-4 sm:px-6 text-base sm:text-lg border-2 rounded-xl text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm focus:outline-none focus:border-orange-500 dark:focus:border-orange-400 focus:bg-white dark:focus:bg-gray-800 transition-all duration-300 shadow-sm focus:shadow-md placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
          </motion.div>
          <Link href={`/create?title=${logoTitle}`}>
            <Button className="cursor-pointer h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg font-semibold w-full sm:w-auto rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 dark:from-orange-600 dark:to-orange-700 dark:hover:from-orange-700 dark:hover:to-orange-800 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <motion.span
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                Get Started
              </motion.span>
            </Button>
          </Link>
        </motion.div>

        {/* Project Section - Improved spacing and typography */}
        <motion.div
          ref={projectSectionRef}
          className="mt-16 sm:mt-20 md:mt-24 mb-8 sm:mb-12 space-y-8 sm:space-y-10 md:space-y-12 w-full max-w-5xl px-4 sm:px-6"
          variants={projectSectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div
            className="text-center space-y-6 sm:space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.25, 0, 1] }}
            viewport={{ once: true }}
          >
            <motion.h3
              className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] sm:leading-[1.05] tracking-tight"
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
              className="text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed sm:leading-relaxed max-w-4xl mx-auto"
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
            className="relative bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 rounded-2xl p-6 sm:p-8 md:p-10 border border-orange-200/50 dark:border-orange-800/30 backdrop-blur-sm"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.25, 0, 1], delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="absolute -left-1 top-0 h-full w-1.5 bg-gradient-to-b from-orange-400 via-orange-500 to-amber-500 rounded-full"
              initial={{ scaleY: 0, originY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.25, 0, 1],
                delay: 0.4,
              }}
              viewport={{ once: true }}
            ></motion.div>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed sm:leading-relaxed md:leading-relaxed font-medium pl-6 sm:pl-8">
              Whether you&apos;re launching a startup, building a personal
              brand, or starting a community project, our AI-powered logo
              generator helps you design a unique and professional logo with
              ease, giving you the creative tools and guidance you need to
              succeed.
            </p>
          </motion.div>
        </motion.div>

        {/* Animated Tags - Better spacing and design */}
        <motion.div
          ref={tagsRef}
          className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-8 sm:mt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20px" }}
        >
          {["Startups", "Portfolios", "Communities", "Products"].map(
            (tag, i) => (
              <motion.span
                key={tag}
                className="px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 text-orange-700 dark:text-orange-300 rounded-full text-sm sm:text-base font-semibold border border-orange-200/50 dark:border-orange-700/30 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300"
                variants={tagVariants}
                custom={i}
                whileHover={{
                  scale: 1.05,
                  y: -3,
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
