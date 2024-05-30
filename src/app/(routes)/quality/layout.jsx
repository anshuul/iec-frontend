"use client";

import QualityHeader from "@/components/QualityComp/QualityHeader";
import { SelectedItemQuantityProvider } from "@/context/SelectedItemQuantityContext";

const { usePathname } = require("next/navigation");

const QualityLayout = ({ children }) => {
  const pathName = usePathname();

  const validPaths = [
    "/quality",
    "/quality/heat-treatment",
    "/quality/hardness-test-report",
    "/quality/magnetic-particle-inspection",
    "/quality/test-certificate",
    "/quality/certificate-compliance",
    "/quality/inspection-release-note",
    "/quality/dispatch",
  ];

  const isProductionPage = validPaths.includes(pathName);

  const additionalSegments = pathName.split("/").slice(3);
  const hasAdditionalSegments =
    additionalSegments && additionalSegments.length > 0;

  return (
    <div className="">
      <SelectedItemQuantityProvider>
        {isProductionPage && !hasAdditionalSegments ? (
          <div className="w-full bg-gray-300">
            <QualityHeader />
            {children}
          </div>
        ) : (
          <div className="w-full bg-white">{children}</div>
        )}
      </SelectedItemQuantityProvider>
    </div>
  );
};

export default QualityLayout;
