"use client";

import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/hooks/useTheme";
import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import Logo from "../../../public/Logo.png";


const Header = () => {

  const {
    theme,
    toggleTheme,
  } = useTheme();



  return (

    <header
      className="
        h-16
        border-b
        flex
        items-center
        justify-between
        px-6
        bg-background
      "
    >
      <div className="flex items-center gap-4">
        <Image
          src={Logo}
          alt="Logo"
          width={52}
          height={52}
          className="rounded-full"
        />


        <h1 className="text-xl font-semibold">
          {APP_NAME}
        </h1>
      </div>



      <button

        onClick={toggleTheme}

        className="
          p-2
          rounded-lg
          hover:bg-accent
          transition
        "

        aria-label="Toggle theme"

      >

        {
          theme === "light"
            ?
            <Moon size={20} />
            :
            <Sun size={20} />
        }


      </button>


    </header>

  );

};


export default Header;