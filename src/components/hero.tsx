import { heroData } from "@/data/lookup";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function Hero() {
  return (
    <>
      {/* Blob Background */}
      <div className="fixed h-full w-full z-[-1] inset-0 m-auto blur-[90px] md:blur-[100px]">
        <div className="rounded-[99999px] absolute inset-0 w-screen h-screen overflow-hidden bg-primary transform scale-[0.8] sm:scale-[0.6] dark:scale-[0.5] dark:sm:scale-[0.4]">
          <div className="animate-spin-blob absolute h-screen w-screen inset-0 m-auto bg-[conic-gradient(from_0deg,#fdba74,#fef08a,#fef3c7,#fef3c7,#fdba74)] md:bg-[conic-gradient(from_0deg,#fb923c,#fcd34d,#fef08a,#fde68a,#fb923c)]"></div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative flex flex-col items-center sm:px-6 py-12 md:my-24 gap-3 sm:gap-5 z-10">
        <h1 className="text-primary text-5xl md:text-6xl text-center font-bold">
          {heroData.heroHeading}
        </h1>
        <h2 className="text-2xl sm:text-4xl md:text-5xl text-center font-bold">
          {heroData.heroSubHeading}
        </h2>
        <p className="text-center text-sm xs:text-base sm:text-lg text-gray-500 dark:text-gray-300 max-w-3xl">
          {heroData.heroDescription}
        </p>

        {/* Input and Button */}
        <div className="flex flex-col sm:flex-row gap-2 w-full max-w-2xl">
          <Input
            placeholder={heroData.inputPlaceholder}
            className="w-full p-3 sm:p-5 text-sm sm:text-base border-2 rounded-md text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 bg-gray-100/40 dark:bg-gray-800/40 focus:outline-none focus:border-orange-500 dark:focus:border-orange-400 transition-colors duration-300"
          />
          <Button className="cursor-pointer py-3 sm:py-5 text-sm sm:text-base w-full sm:w-auto">
            Get Started
          </Button>
        </div>

        <div className="mt-6 sm:mt-12 mb-4 sm:mb-6 space-y-4 sm:space-y-8 w-full max-w-4xl px-2 sm:px-4">
          <div className="text-center space-y-1 sm:space-y-3">
            <h3 className="text-orange-500 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">
              Your next big project starts here!
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-base md:text-xl lg:text-2xl font-medium leading-relaxed">
              Enter your idea or project name to begin transforming your vision
              into reality.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -left-2 top-0 h-full w-1 bg-gradient-to-b from-orange-400 to-transparent rounded-full opacity-70"></div>
            <p className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-300 leading-relaxed pl-3 sm:pl-4 py-1 sm:py-2 border-l-2 border-orange-200 dark:border-orange-800/30">
              Whether you&apos;re planning a startup, building a personal
              portfolio, or launching a community initiative, this tool will
              guide you toward success by providing the resources and structure
              you need.
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-2 mt-2 sm:mt-4">
          {["Startups", "Portfolios", "Communities", "Products"].map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 rounded-full text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

export default Hero;
