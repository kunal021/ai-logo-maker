"use client";
import React, { Suspense, useEffect, useState } from "react";
import { usePageQuery } from "@/hooks/use-page-query";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import LogoTitle from "@/components/logo-title-wrapper";
import LogoDescription from "@/components/logo-description";
import LogoColorPallete from "@/components/logo-color-pallete";
import LogoDesigns from "@/components/logo-designs";
import LogoIdeas from "@/components/logo-idea";
import PricingOptions from "./pricing-option";

function CreateLogo() {
  const { currentQuery: stepStr, setQuery: setStepQuery } = usePageQuery(
    "step",
    "1"
  );
  const [step, setStep] = useState(1);

  useEffect(() => {
    const parsed = parseInt(stepStr, 10);
    if (!isNaN(parsed)) setStep(parsed);
  }, [stepStr]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    palette: "",
    logoDesign: "",
    logoIdea: "",
  });

  const onHandleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <LogoTitle
            value={formData.title}
            onHandleInputChange={(v) => onHandleInputChange("title", v)}
          />
        );
      case 2:
        return (
          <LogoDescription
            value={formData.description}
            onHandleInputChange={(v) => onHandleInputChange("description", v)}
          />
        );
      case 3:
        return (
          <LogoColorPallete
            value={formData.palette}
            onHandleInputChange={(v) => onHandleInputChange("palette", v)}
          />
        );
      case 4:
        return (
          <LogoDesigns
            value={formData.logoDesign}
            onHandleInputChange={(v) => onHandleInputChange("logoDesign", v)}
          />
        );
      case 5:
        return (
          <LogoIdeas
            formData={formData}
            onHandleInputChange={(v) => onHandleInputChange("logoIdea", v)}
          />
        );
      case 6:
        return <PricingOptions formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="my-20 p-10 border border-primary rounded-xl 2xl:mx-72">
      <Suspense fallback={<div>Loading...</div>}>
        {renderStepContent()}
      </Suspense>

      <div className="flex items-center justify-between mt-10">
        {step > 1 && (
          <Button
            onClick={() => {
              const newStep = step - 1;
              setStep(newStep);
              setStepQuery(String(newStep));
            }}
            variant="outline"
            className="border-primary"
          >
            <ArrowLeft />
            Previous
          </Button>
        )}

        {step < 6 && (
          <Button
            onClick={() => {
              const newStep = step + 1;
              setStep(newStep);
              setStepQuery(String(newStep));
            }}
          >
            Continue
            <ArrowRight />
          </Button>
        )}
      </div>
    </div>
  );
}

export default CreateLogo;
