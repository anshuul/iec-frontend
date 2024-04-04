"use client";
// Breadcrumbs.js

import React from "react";
import Link from "next/link";

const Breadcrumbs = ({ pathname }) => {
  // Split the pathname into an array of segments
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");

  // Generate breadcrumb links
  const breadcrumbs = pathSegments.map((segment, index) => {
    // Generate the URL path for the current segment
    const url = `/${pathSegments.slice(0, index + 1).join("/")}`;

    // Determine the display text for the current segment
    const segmentText = segment.replace(/-/g, " "); // Replace dashes with spaces

    return (
      <span key={index}>
        <Link href={url} className="text-blue-500 hover:underline">
          {segmentText}
        </Link>
        {index < pathSegments.length - 1 && <span className="mx-1">/</span>}
      </span>
    );
  });

  return <div className="flex">{breadcrumbs}</div>;
};

export default Breadcrumbs;
