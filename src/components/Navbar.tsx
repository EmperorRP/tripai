// components/Navbar.tsx
"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { Poppins } from 'next/font/google';
import { RxHamburgerMenu } from "react-icons/rx";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"


const poppins = Poppins({ weight: '400', subsets: ['latin'] });

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
  
    return (
      <nav className={`flex flex-wrap items-center justify-between py-4 px-6 bg-white shadow ${poppins.className}`}>

        <h1 className="flex text-xl font-semibold">
            TripAI
            <img src="https://imgur.com/SIl3WTh.png" alt="TripAI Logo" className="h-8 mr-2" />
        </h1>
  
        <button className="text-gray-600 hover:text-custom-blue lg:hidden" onClick={toggleMenu}>
          <RxHamburgerMenu />
        </button>

        {/* <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>Link</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Item Two</NavigationMenuTrigger>
              <NavigationMenuContent>
                Stuff
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu> */}
  
        <div className={`${isMenuOpen ? 'flex' : 'hidden'} flex-col lg:flex lg:flex-row lg:items-center w-full lg:w-auto`}>
  
          {/* Navigation Links */}
          <Link href="/" className="text-gray-600 hover:text-custom-blue transition-colors block px-3 py-2 rounded-md text-base font-medium">
            Home
          </Link>
          <Link href="#" className="text-gray-600 hover:text-custom-blue transition-colors block px-3 py-2 rounded-md text-base font-medium">
            My Trips
          </Link>
          <Link href="#" className="text-gray-600 hover:text-custom-blue transition-colors block px-3 py-2 rounded-md text-base font-medium">
            Pricing
          </Link>
          <Link href="#" className="text-gray-600 hover:text-custom-blue transition-colors block px-3 py-2 rounded-md text-base font-medium">
            Community
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-custom-blue transition-colors block px-3 py-2 rounded-md text-base font-medium">
            About
          </Link>
          
          {/* Mobile Sign In Button */}
          <button style={{ backgroundColor: '#00ADB5' }} className={`lg:hidden text-white px-4 py-2 rounded-md hover:bg-teal-800 transition-colors mt-4 w-full ${isMenuOpen ? 'block' : 'hidden'}`}>
              Sign In
          </button>
        </div>
  
        {/* Desktop Sign In Button */}
        <button style={{ backgroundColor: '#00ADB5' }} className="hidden lg:block text-white px-4 py-2 rounded-md hover:bg-teal-600 transition-colors">
          Sign In
        </button>
      </nav>
    );
  };
  
  export default Navbar;