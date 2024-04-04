"use client";
import Link from "next/link";
import { HiSearch } from "react-icons/hi";
import Container from "./Container";
import Breadcrumbs from "./Breadcrumbs";
import { usePathname } from 'next/navigation'
const Header = () => {
  const pathname = usePathname()

  return (
    // <Container className={''}>
      <div className="flex items-center justify-between px-4 mb-4 py-4 bg-white">
        {/* Show Breadcrumbs */}
        {/* <p className="text-xl font-bold">{pathname}</p> */}
        <Breadcrumbs pathname={pathname} />
        <Link
          href="/code-comp"
          className="flex flex-row gap-4 justify-center items-center"
        >
          <span className="rounded-full bg-blue-300 px-3 py-2">V</span>
          <p>Vishal K Doshi</p>
        </Link>
      </div>
    //  </Container>
  );
};

export default Header;
