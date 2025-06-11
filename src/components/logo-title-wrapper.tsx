"use client";

import dynamic from "next/dynamic";

const LogoTitle = dynamic(() => import("./logo-title"), { ssr: false });

export default LogoTitle;
