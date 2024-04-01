"use client";
import Link from "next/link";
import Container from "../common/Container";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSelectedLink } from "@/context/SelectedItemContext";

const ProductionHeader = () => {
  const pathName = usePathname();
  const { selectedLink, selectLink } = useSelectedLink();

  const links = [
    {
      href: "/production/production-planning-sheets",
      text: "Production Planning Sheets",
    },
    {
      href: "/production/material-issue-slip",
      text: "Material Issue Slip",
    },
    { href: "/production/routing-sheet", text: "Routing Sheet" },
    {
      href: "/production/production-report",
      text: "Production Report",
    },
    {
      href: "/production/in-process-dimension-report",
      text: "In-Process Dimension Report",
    },
  ];

  const isCurrentPath = (href) => {
    return href === pathName ? "underline text-blue-500" : "";
  };

  return (
    // <Container>
    <div className="flex items-center justify-start gap-4 mx-4 py-4 bg-white">
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className={`mx-2 ${isCurrentPath(link.href)}`}
          onClick={() => selectLink(link)}
        >
          {link.text}
        </Link>
      ))}
    </div>
    //  </Container>
  );
};

export default ProductionHeader;
