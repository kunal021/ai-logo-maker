"use client";

import React, { useEffect, useState, useRef } from "react";
import HeadingDescription from "./heading-description";
import { lookup } from "@/data/lookup";
import logoPrompts from "@/data/prompts";
import axios from "axios";

interface LogoIdea {
  id: number;
  description: string;
}

interface LogoIdeasProps {
  formData: {
    title: string;
    description: string;
    palette: string;
    logoDesign: string;
    logoIdea: string;
  };
  onHandleInputChange: (value: string) => void;
}

function LogoIdeas({ formData, onHandleInputChange }: LogoIdeasProps) {
  const [ideas, setIdeas] = useState<LogoIdea[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>(
    formData?.logoIdea
  );

  // Track the form data to prevent unnecessary API calls
  const prevFormDataRef = useRef<string>("");

  useEffect(() => {
    // Only generate ideas if the core form data has changed (not logoDesign which gets updated on selection)
    const coreFormData = `${formData.title}-${formData.description}-${formData.palette}`;

    if (
      coreFormData !== prevFormDataRef.current &&
      formData.title &&
      formData.description
    ) {
      prevFormDataRef.current = coreFormData;
      generateLogoDesignIdeas();
    }
  }, [formData]);

  const generateLogoDesignIdeas = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const PROMPT = logoPrompts.DESIGN_IDEA_PROMPT.replace(
        "{logoType}",
        formData.title
      )
        .replace("{logoTitle}", formData.title)
        .replace("{logoDesc}", formData.description)
        .replace("{logoPrompt}", formData.title);

      const result = await axios.post("/api/ai-design-ideas", {
        prompt: PROMPT,
      });

      console.log(result.data.logo_ideas);
      setIdeas(result.data.logo_ideas);
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error) {
        setError(error);
      } else if (typeof error === "string") {
        setError(error);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectIdea = (idea: LogoIdea) => {
    setSelectedOption(idea.description);
    onHandleInputChange(idea.description);
  };

  const handleRefresh = () => {
    generateLogoDesignIdeas();
  };

  return (
    <div className="my-6 sm:my-8 lg:my-10 px-4 sm:px-0">
      <HeadingDescription
        title={lookup?.logoIdeaTitle || "Choose a Logo Idea"}
        description={
          lookup?.logoIdeaDesc ||
          "Select a logo idea that aligns with your brand's identity."
        }
      />

      <div className="mt-6 sm:mt-8">
        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-12 sm:py-16 lg:py-20">
            {/* Modern animated loader */}
            <div className="relative mb-6 sm:mb-8">
              {/* Outer rotating ring */}
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>

              {/* Inner pulsing dots */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex space-x-1">
                  <div
                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full animate-pulse"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary/70 rounded-full animate-pulse"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary/40 rounded-full animate-pulse"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </div>

              {/* Orbiting particles */}
              <div
                className="absolute inset-0 animate-spin"
                style={{ animationDuration: "3s" }}
              >
                <div className="absolute top-0 left-1/2 w-1 h-1 bg-primary rounded-full transform -translate-x-1/2"></div>
                <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-primary/60 rounded-full transform -translate-x-1/2"></div>
                <div className="absolute left-0 top-1/2 w-1 h-1 bg-primary/40 rounded-full transform -translate-y-1/2"></div>
                <div className="absolute right-0 top-1/2 w-1 h-1 bg-primary/80 rounded-full transform -translate-y-1/2"></div>
              </div>
            </div>

            {/* Animated text */}
            <div className="text-center space-y-2 sm:space-y-3 max-w-sm mx-auto">
              <h3 className="text-base sm:text-lg font-semibold text-foreground">
                Crafting Your Logo Ideas
              </h3>
              <div className="flex items-center justify-center space-x-2">
                <div className="flex space-x-1">
                  <div
                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
                <span className="text-xs sm:text-sm text-muted-foreground font-medium">
                  Analyzing your brand essence
                </span>
              </div>

              {/* Progress steps - Hidden on mobile, visible on larger screens */}
              <div className="hidden sm:flex items-center justify-center space-x-2 lg:space-x-4 mt-4 lg:mt-6">
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-primary rounded-full flex items-center justify-center">
                    <svg
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary-foreground"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-xs sm:text-sm text-muted-foreground">
                    Analyzing
                  </span>
                </div>

                <div className="w-6 sm:w-8 h-0.5 bg-primary/30 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full animate-pulse"></div>
                </div>

                <div className="flex items-center space-x-1 sm:space-x-2">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-primary/20 rounded-full flex items-center justify-center animate-pulse">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full"></div>
                  </div>
                  <span className="text-xs sm:text-sm text-muted-foreground">
                    Creating
                  </span>
                </div>

                <div className="w-6 sm:w-8 h-0.5 bg-muted rounded-full"></div>

                <div className="flex items-center space-x-1 sm:space-x-2">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-muted rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-muted-foreground/30 rounded-full"></div>
                  </div>
                  <span className="text-xs sm:text-sm text-muted-foreground/50">
                    Finalizing
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg sm:rounded-xl p-4 sm:p-6 mb-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-destructive"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <div className="ml-3 sm:ml-4 flex-1">
                <h4 className="text-destructive font-semibold text-sm sm:text-base">
                  Unable to generate ideas
                </h4>
                <p className="text-destructive/80 mt-1 text-xs sm:text-sm">
                  {error instanceof Error
                    ? error.message
                    : "Something went wrong. Please try again."}
                </p>
                <button
                  onClick={handleRefresh}
                  className="mt-2 sm:mt-3 inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-destructive text-destructive-foreground rounded-md sm:rounded-lg hover:bg-destructive/90 transition-colors text-xs sm:text-sm font-medium"
                >
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Ideas Grid */}
        {!isLoading && ideas?.length > 0 && (
          <div className="space-y-4 sm:space-y-6">
            {/* Header section with responsive layout */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground">
                  Logo Concepts
                </h3>
                <span className="bg-primary/10 text-primary px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                  {ideas?.length} ideas
                </span>
              </div>

              {/* Action buttons with responsive layout */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                <button
                  onClick={() => {
                    onHandleInputChange("Let AI Select The Best Ideas");
                    setSelectedOption("Let AI Select The Best Ideas");
                  }}
                  className={`group inline-flex items-center justify-center px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-md sm:rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed ${
                    selectedOption === "Let AI Select The Best Ideas"
                      ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/10"
                      : "border-primary hover:border-primary/50 bg-card text-foreground hover:bg-primary/5"
                  }`}
                >
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                  <span className="whitespace-nowrap">Let AI Select</span>
                </button>
                <button
                  onClick={handleRefresh}
                  className="group inline-flex items-center justify-center px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-primary hover:text-primary/80 bg-primary/5 hover:bg-primary/10 rounded-md sm:rounded-lg transition-all duration-200"
                >
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 group-hover:rotate-180 transition-transform duration-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  <span className="whitespace-nowrap">Refresh Ideas</span>
                </button>
              </div>
            </div>

            {/* Responsive grid layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
              {ideas.map((idea) => (
                <div
                  key={idea.id}
                  onClick={() => handleSelectIdea(idea)}
                  className={`
                    group relative p-4 sm:p-6 border-2 rounded-lg sm:rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1
                    ${
                      selectedOption === idea.description
                        ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                        : "border-border hover:border-primary/50 bg-card"
                    }
                  `}
                >
                  {/* Selection indicator */}
                  {selectedOption === idea.description && (
                    <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-primary rounded-full flex items-center justify-center shadow-lg">
                        <svg
                          className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary-foreground"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* Idea content */}
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm sm:text-base text-foreground font-medium leading-relaxed group-hover:text-primary transition-colors duration-200">
                        {idea.description}
                      </p>
                    </div>
                  </div>

                  {/* Hover effect border */}
                  <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              ))}
            </div>

            {/* Selected idea summary */}
            {selectedOption && (
              <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-lg sm:rounded-xl">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-primary mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-primary font-semibold text-base sm:text-lg">
                      Selected Logo Concept
                    </h4>
                    <p className="text-primary/80 mt-1 font-medium text-sm sm:text-base">
                      {selectedOption}
                    </p>
                    <p className="text-muted-foreground text-xs sm:text-sm mt-2">
                      This concept will be used to generate your logo design.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && ideas.length === 0 && !error && (
          <div className="text-center py-12 sm:py-16">
            <div className="relative mx-auto mb-4 sm:mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto">
                <svg
                  className="w-8 h-8 sm:w-10 sm:h-10 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-6 sm:h-6 bg-primary/20 rounded-full"></div>
              <div className="absolute -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 w-3 h-3 sm:w-4 sm:h-4 bg-primary/30 rounded-full"></div>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
              Ready to Generate Ideas
            </h3>
            <p className="text-muted-foreground mb-4 sm:mb-6 max-w-md mx-auto text-sm sm:text-base px-4 sm:px-0">
              Complete your brand details above to generate personalized logo
              concepts tailored to your vision.
            </p>
            <button
              onClick={handleRefresh}
              className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Generate Logo Ideas
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default LogoIdeas;
