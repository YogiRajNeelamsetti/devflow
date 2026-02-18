'use client'
import { SheetClose } from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants"
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"
import React from "react";

const NavLinks = ({ isMobileNav = false}: { isMobileNav?: boolean }) => {
    const pathname = usePathname();
    const { data: session } = useSession();
    const userId = session?.user?.id;
  return (
    <>
        {sidebarLinks.map((item) => {
            const isActive = (pathname.includes(item.route) && item.route.length > 1) || pathname === item.route;

            const linkRoute = item.route === '/profile'
                ? (userId ? `/profile/${userId}` : null)
                : item.route;

            if (!linkRoute) return null;

            const LinkComponent = (
                <Link 
                href={linkRoute}
                key={item.label}
                className={cn(isActive ? 'primary-gradient rounded-lg text-light-900' : 'text-dark300_light900', 'flex items-center justify-start gap-4 bg-transparent p-4')}
                >
                    <Image
                    className={cn({ 'invert-colors': !isActive })}
                    src= {item.imgURL}
                    alt={item.label}
                    width={20}
                    height={20}
                    />
                    <p 
                    className={cn(
                        isActive ? 'base-bold' : 'base-medium', !isMobileNav && 'max-lg:hidden')}
                    >
                        {item.label}
                    </p>
                </Link>
            )

            return isMobileNav ? (
                <SheetClose asChild key={item.route}>
                    {LinkComponent}
                </SheetClose>
            ) : (
                <React.Fragment key={item.route}>
                    {LinkComponent}
                </React.Fragment>            
            )
        })}
    </>
  )
}

export default NavLinks