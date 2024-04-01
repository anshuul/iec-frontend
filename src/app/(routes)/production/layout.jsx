"use client";
import ProductionHeader from "@/components/ProductionComp/ProductionHeader";
import { SelectedItemProvider } from "@/context/SelectedItemContext";
import { usePathname } from "next/navigation";
import Link from "next/link";

const ProductionLayout = ({ children }) => {
  const pathName = usePathname();

  // Define the valid paths that should show the layout
  const validPaths = [
    "/production/production-planning-sheets",
    "/production/material-issue-slip",
    "/production/routing-sheet",
    "/production/production-report",
    "/production/in-process-dimension-report"
  ];

  // Check if the current pathname is one of the valid paths
  const isProducitonPage = validPaths.includes(pathName);

  // Check if there are additional path segments after the valid paths
  const additionalSegments = pathName.split("/").slice(3);
  const hasAdditionalSegments = additionalSegments && additionalSegments.length > 0;

  return (
    <div className="">
      <SelectedItemProvider>
        {isProducitonPage && !hasAdditionalSegments ? (
          <div className="w-full bg-white">
            <ProductionHeader />
            {children}
          </div>
        ) : (
          <div className="w-full bg-white">
            {children}
          </div>
        )}
      </SelectedItemProvider>
    </div>
  );
};

export default ProductionLayout;
