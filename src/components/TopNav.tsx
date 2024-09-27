"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import clsx from "clsx";
import { Gamepad2, HelpCircle, Store } from "lucide-react";
import Link from "next/link";
import HamburgerMenu from "./ui/hamburger-menu";

const menuLinks = [
  {
    name: "Home",
    href: "/",
    icon: <Gamepad2 className="w-5 h-5" />,
  },
  {
    name: "Shop",
    href: "/shop",
    icon: <Store className="w-5 h-5" />,
  },
  {
    name: "Help",
    href: "/help",
    icon: <HelpCircle className="w-5 h-5" />,
  },
];
const TopNav = () => {
  return (
    <div className="w-full h-8 lg:h-16">
      {/* Desktop View */}
      <NavigationMenu className="hidden lg:flex">
        <NavigationMenuList>
          {menuLinks.map((link) => (
            <NavigationMenuItem key={link.name}>
              <Link href={link.href} legacyBehavior passHref>
                <NavigationMenuLink
                  className={clsx(
                    "flex flex-row gap-2 items-center",
                    navigationMenuTriggerStyle(),
                  )}
                >
                  {link.icon} <span className="inline-block">{link.name}</span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
          <NavigationMenuItem></NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Mobile View */}
      <HamburgerMenu menuItems={menuLinks} className="lg:hidden" />
    </div>
  );
};

export default TopNav;
