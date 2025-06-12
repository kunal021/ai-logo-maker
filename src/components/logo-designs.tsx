import React from "react";
import HeadingDescription from "./heading-description";
import { lookup } from "@/data/lookup";
import { logoDesigns } from "@/data/logo-design";
import Image from "next/image";

function LogoDesigns() {
  return (
    <div className="my-10">
      <HeadingDescription
        title={lookup?.logoDesignTitle}
        description={lookup?.logoDesignDesc}
      />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
        {logoDesigns.map((design, index) => (
          <div key={index}>
            <Image
              src={design.image}
              alt={design.title}
              width={300}
              height={200}
              className="w-full rounded-xl h-[150px]"
            ></Image>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LogoDesigns;
