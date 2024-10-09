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
import PointsDisplay from "./PointsDisplay";
import HamburgerMenu from "./ui/hamburger-menu";

const menuLinks = [
  {
    name: "Home",
    href: "/",
    icon: <Gamepad2 className="h-5 w-5" />,
  },
  {
    name: "Shop",
    href: "/shop",
    icon: <Store className="h-5 w-5" />,
  },
  {
    name: "Help",
    href: "/help",
    icon: <HelpCircle className="h-5 w-5" />,
  },
];
const TopNav = () => {
  return (
    <div className="flex h-8 w-full items-center justify-between lg:h-16">
      {/* Desktop View */}
      <PointsDisplay className="hidden p-8 lg:block" />
      <NavigationMenu className="hidden lg:flex">
        <NavigationMenuList>
          {menuLinks.map((link) => (
            <NavigationMenuItem key={link.name}>
              <Link href={link.href} legacyBehavior passHref>
                <NavigationMenuLink
                  className={clsx(
                    "flex flex-row items-center gap-2",
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
