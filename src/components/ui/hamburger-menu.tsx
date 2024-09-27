"use client";

import { clsx } from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

interface Props {
  menuItems: { name: string; href: string; icon: React.ReactNode }[];
  className: string;
}
export default function HamburgerMenu({ menuItems, className }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className={clsx("relative", className)}>
      <button
        onClick={toggleMenu}
        className="z-50 fixed top-4 right-4 p-2 bg-primary text-primary-foreground rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-primary"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 w-64 bg-background shadow-lg z-40 flex flex-col"
          >
            <nav className="flex flex-col space-y-4 p-4 mt-16">
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
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
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
    <a
      href={href}
      className="flex items-center space-x-2 text-foreground hover:bg-accent hover:text-accent-foreground rounded-md p-2 transition-colors"
    >
      {icon}
      <span>{text}</span>
    </a>
  );
}
