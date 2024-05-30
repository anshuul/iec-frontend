"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelectedLink } from "@/context/SelectedItemQuantityContext";

const QualityHeader = () => {
  const pathName = usePathname();
  const { selectedLink, selectLink } = useSelectedLink();

  const links = [
    {
      href: "/quality/heat-treatment",
      text: "Heat Treatment",
    },
    {
      href: "/quality/hardness-test-report",
      text: "Hardness Test Report",
    },
    {
      href: "/quality/magnetic-particle-inspection",
      text: "Magnetic Particle Inspection",
    },
    {
      href: "/quality/test-certificate",
      text: "Test Certificate",
    },
    {
      href: "/quality/certificate-compliance",
      text: "Certificate Of Compliance",
    },
    {
      href: "/quality/inspection-release-note",
      text: "Inspection",
    },
    {
      href: "/quality/dispatch",
      text: "Dispatch",
    },
  ];

  const isCurrentPath = (href) => {
    return href === pathName
      ? "text-[#0093FD] border-b-2 border-b-blue-500"
      : "";
  };

  return (
    <div className="py-2 mx-4 bg-white">
      <div className="flex items-center justify-start mx-4 ">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className={`${isCurrentPath(
              link.href
            )} lg:text-[10px] xl:text-[16px] font-semibold pb-2 px-4`}
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

export default QualityHeader;
