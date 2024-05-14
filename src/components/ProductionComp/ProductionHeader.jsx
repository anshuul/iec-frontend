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
      href: "/production/dimension-report",
      text: "Dimension Report",
    },
  ];

  const isCurrentPath = (href) => {
    return href === pathName ? "text-[#0093FD] border-b-2 border-b-blue-500" : "";
  };

  return (
    <div className="py-2 mx-4 bg-white">
      <div className="flex items-center justify-start mx-4 ">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className={`${isCurrentPath(link.href)} lg:text-[10px] xl:text-[16px] font-semibold pb-2 px-4`}
            onClick={() => selectLink(link)}
          >
            {link.text}
          </Link>
        ))}
      </div>
      <hr className="border-b-2 border-b-gray-200 -mt-0.5" />
    </div>
  );
};

export default ProductionHeader;
