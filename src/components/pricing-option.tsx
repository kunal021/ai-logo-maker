"use client";

import React, { useEffect, useState } from "react";
import { Check, Gift, Crown, ArrowRight } from "lucide-react";
import HeadingDescription from "./heading-description";
import { lookup } from "@/data/lookup";
import { useUser, SignInButton } from "@clerk/nextjs";

const IconFree = () => <Gift className="w-5 h-5 text-emerald-600" />;
const IconPremium = () => <Crown className="w-5 h-5 text-amber-600" />;

interface PricingProps {
  formData: {
    title: string;
    description: string;
    palette: string;
    logoDesign: string;
    logoIdea: string;
  };
  onHandleInputChange?: (value: string) => void;
}

function PricingOptions({ formData }: PricingProps) {
  const { user, isLoaded } = useUser();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  useEffect(() => {
    if (formData?.title && typeof window !== "undefined") {
      localStorage.setItem("formData", JSON.stringify(formData));
    }
  }, [formData]);

  const handlePlanSelect = (planTitle: string) => {
    if (!isLoaded || !user) return;
    setSelectedPlan(planTitle);
  };

  const getIcon = (iconString: string) => {
    if (iconString.includes("IconFree")) return <IconFree />;
    if (iconString.includes("IconPremium")) return <IconPremium />;
    return <Gift className="w-5 h-5 text-primary" />;
  };

  const isPremium = (title: string) => title.toLowerCase().includes("premium");

  return (
    <div className="px-4 py-12 sm:px-6 lg:px-8">
      <HeadingDescription
        title={lookup.LogoPricingModelTitle}
        description={lookup.LogoPricingModelDesc}
      />

      <div className="grid max-w-5xl mx-auto mt-12 gap-6 sm:grid-cols-2">
        {lookup.pricingOption.map((plan, index) => (
          <div
            key={index}
            className={`rounded-xl border p-6 transition hover:shadow-lg ${
              selectedPlan === plan.title ? "ring-2 ring-primary/30" : ""
            } ${
              isPremium(plan.title)
                ? "bg-amber-50 border-amber-200"
                : "bg-emerald-50 border-emerald-200"
            }`}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 rounded-lg bg-white shadow-sm">
                {getIcon(plan.icon)}
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {plan.title}
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {plan.highlights}
            </p>
            <ul className="space-y-2 mb-6">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start space-x-2 text-sm">
                  <Check className="w-4 h-4 mt-0.5 text-green-600" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* ✅ Auth-aware action button */}
            {user ? (
              <button
                onClick={() => handlePlanSelect(plan.title)}
                disabled={!isLoaded}
                className={`w-full py-3 rounded-md font-medium transition text-sm flex items-center justify-center gap-2 ${
                  isPremium(plan.title)
                    ? "bg-amber-500 text-white hover:bg-amber-600"
                    : "bg-emerald-500 text-white hover:bg-emerald-600"
                } ${!isLoaded ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {plan.button}
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <SignInButton
                mode="modal"
                forceRedirectUrl={`/generate-logo?type=${plan.title}`}
              >
                <button
                  disabled={!isLoaded}
                  className={`w-full py-3 rounded-md font-medium transition text-sm flex items-center justify-center gap-2 ${
                    isPremium(plan.title)
                      ? "bg-amber-500 text-white hover:bg-amber-600"
                      : "bg-emerald-500 text-white hover:bg-emerald-600"
                  } ${!isLoaded ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {plan.button}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </SignInButton>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PricingOptions;
