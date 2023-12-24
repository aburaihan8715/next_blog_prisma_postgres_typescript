import { getCurrentUser } from "@/libs/session";
import Link from "next/link";
import React from "react";
import LogoutBtn from "./LogoutBtn";

const Header = async () => {
  const user = await getCurrentUser();
  return (
    <header className="bg-blue-500 p-4">
      <nav className="flex justify-between items-center  max-w-4xl mx-auto">
        <Link href="/" className="">
          <h1 className="text-white text-2xl font-bold capitalize">my blogs</h1>
          <p className="text-xs text-white">prisma and typescript</p>
        </Link>

        <ul className="flex space-x-4">
          <li>
            <Link href="/blogs" className="text-white hover:underline">
              Blogs
            </Link>
          </li>

          {user?.name ? (
            <LogoutBtn />
          ) : (
            <li>
              <Link href="/api/auth/signin" className="text-white hover:underline">
                login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
