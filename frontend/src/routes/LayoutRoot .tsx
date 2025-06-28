import React from "react";
import { Outlet } from "react-router-dom";
import BaseNavLink from "../components/Nav/BaseNavLink";
const LayoutRoot: React.FC = () => {
  return (
    <div className={"flex flex-col h-screen w-screen"}>
      <header className="flex items-center justify-between bg-pri text-white p-4 bg-[#1d4ed8]">
        <span className="font-bold text-lg">My App</span>
        <nav className="flex space-x-4 mt-2">
          <BaseNavLink to="/" end>
            Home
          </BaseNavLink>
          <BaseNavLink to="/about">About</BaseNavLink>
          <BaseNavLink to="/contact">Contact</BaseNavLink>
        </nav>
        <span className="text-sm">Welcome, User!</span>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t px-4 py-3 text-center text-muted-foreground text-sm">
        © {new Date().getFullYear()} My App. All rights reserved.
      </footer>
    </div>
  );
};

export default LayoutRoot;
