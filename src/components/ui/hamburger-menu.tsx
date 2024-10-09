"use client";

import { clsx } from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import PointsDisplay from "../PointsDisplay";

interface Props {
  menuItems: { name: string; href: string; icon: React.ReactNode }[];
  className?: string;
}
export default function HamburgerMenu({ menuItems, className }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className={clsx("fixed top-4 w-full", className)}>
      <div className="flex w-full items-center justify-between px-4">
        <PointsDisplay />
        <button
          onClick={toggleMenu}
          className="z-50 rounded-full bg-primary p-2 text-primary-foreground shadow-lg focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 z-40 flex w-64 flex-col bg-background shadow-lg"
          >
            <nav className="mt-16 flex flex-col space-y-4 p-4">
              {menuItems.map((item, index) => (
                <MenuItem
                  key={index}
                  icon={item.icon}
                  text={item.name}
                  href={item.href}
                />
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50"
          onClick={toggleMenu}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

function MenuItem({
  icon,
  text,
  href,
}: {
  icon: React.ReactNode;
  text: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center space-x-2 rounded-md p-2 text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
}
