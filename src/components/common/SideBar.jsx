"use client";
import { useState } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineLocalGroceryStore,
  MdOutlineHighQuality,
} from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import { CiGrid32 } from "react-icons/ci";
import Link from "next/link";

const SideBar = () => {
  const [open, setOpen] = useState(true);
  const Menus = [
    {
      title: "Sales & Marketing",
      src: "Chart_fill",
      icon: <CiGrid32 />,
      href: "/sales-marketing",
    },
    {
      title: "Store & Purchase",
      src: "Chat",
      icon: <MdOutlineLocalGroceryStore />,
      href: "/store-purchase",
    },
    {
      title: "Produciton",
      src: "User",
      icon: <BsPencilSquare />,
      href: "/production",
    },
    {
      title: "Quality ",
      src: "Calendar",
      icon: <MdOutlineHighQuality />,
      href: "/quality",
    },
  ];

  return (
    <div className="flex bg-white">
      <div
        className={` ${open ? "w-72" : "w-20 "
          } bg-dark-purple h-screen p-5 pt-4 relative duration-300`}
      >
        {/* <div className=""> */}
        <MdOutlineKeyboardArrowLeft
          className={`absolute cursor-pointer -right-3 top-4 h-[42px] w-[42px] rounded-full  ${!open && "rotate-180"
            }`}
          onClick={() => setOpen(!open)}
        />
        {/* </div> */}
        <Link href={"/"}>
          <div className="flex items-center gap-x-4">
            <img
              src="/homelogo.jpeg"
              className={`cursor-pointer duration-500 h-[42px] w-[42px] ${open && "rotate-[360deg]"
                }`}
            />
            <h1
              className={`text-black origin-left font-medium text-xl duration-200 ${!open && "scale-0"
                }`}
            >
              IEC
            </h1>
          </div>
        </Link>

        {open && <hr className="mt-8" />}
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <Link href={Menu.href}>
              <li
                key={index}
                className={`flex rounded-md p-2 cursor-pointer hover:bg-gray-200 text-gray-900 text-lg items-center gap-x-4 
              mt-2 ${index === 0 && "bg-light-white"} `}
              >
                {/* <img src={`./src/assets/${Menu.src}.png`} /> */}
                <span className="text-lg text-black">{Menu.icon}</span>
                <span
                  className={`${!open && "hidden"} origin-left duration-1000`}
                >
                  {Menu.title}
                </span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default SideBar;
