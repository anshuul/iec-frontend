"use client";
import Link from "next/link";
import { HiSearch } from "react-icons/hi";
import Container from "./Container";

const Header = () => {
  return (
    <Container>
      <div className="flex items-center justify-between mx-4 py-4">
        {/* Show selected title */}
        <p className="text-xl font-bold">Production</p>
        <Link
          href="/code-comp"
          className="flex flex-row gap-4 justify-center items-center"
        >
          <span className="rounded-full bg-blue-300 px-3 py-2">
            V
          </span>
          <p>Vishal K Doshi</p>
        </Link>
      </div>
    </Container>
  );
};

export default Header;
