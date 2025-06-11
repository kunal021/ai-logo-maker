"use client";
import React, { useState } from "react";
import LogoTitle from "@/components/logo-title";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import LogoDescription from "@/components/logo-description";
import LogoColorPallete from "@/components/logo-color-pallete";
import LogoDesigns from "@/components/logo-designs";
import LogoIdeas from "@/components/logo-idea";

function CreateLogo() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const onHandleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    console.log(formData);
  };
  return (
    <div className="my-20 p-10 border border-primary rounded-xl 2xl:mx-72">
      {step === 1 ? (
        <LogoTitle
          onHandleInputChange={(v) => onHandleInputChange("title", v)}
        />
      ) : step === 2 ? (
        <LogoDescription
          onHandleInputChange={(v) => onHandleInputChange("description", v)}
        />
      ) : step === 3 ? (
        <LogoColorPallete
          onHandleInputChange={(v) => onHandleInputChange("palette", v)}
        />
      ) : step === 4 ? (
        <LogoDesigns />
      ) : step === 5 ? (
        <LogoIdeas />
      ) : null}
      <div className="flex items-center justify-between mt-10">
        {step !== 1 && (
          <Button
            onClick={() => setStep(step - 1)}
            variant={"outline"}
            className="border-primary"
          >
            <ArrowLeft />
            Previous
          </Button>
        )}
        <Button onClick={() => setStep(step + 1)}>
          Continue
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
}

export default CreateLogo;
