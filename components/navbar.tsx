"use client";
import React, { useEffect, useState } from "react";
import { DarkModeToggler } from "./dark-mode-toggler";
import Link from "next/link";

function Navbar() {
  const [user, setUser] = useState<any>(null);

  console.log(user);

  return (
    <div className="top-0 sticky z-50 flex justify-between items-center p-5 px-10">
      <Link href={"/"}>
        <h1 className="font-poppins text-sm">actually ship(fast)</h1>
      </Link>

      <div className="flex items-center space-x-3">
        {user ? (
          <div className="flex items-center space-x-3">
            <h1 className="font-poppins text-sm">
              Hey, {user?.user_metadata?.username}
            </h1>

            <h1 className="font-poppins text-sm underline cursor-pointer">
              Sign out
            </h1>
          </div>
        ) : (
          <Link href={"/auth/sign-in"}>
            <h1 className="font-poppins text-sm underline">Sign in</h1>
          </Link>
        )}
        <DarkModeToggler />
      </div>
    </div>
  );
}

export default Navbar;
