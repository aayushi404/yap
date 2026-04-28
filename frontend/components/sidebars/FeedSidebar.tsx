"use client"
import { useAuthStore } from "@/hooks/auth";
import { HouseIcon, UserIcon, ChatCircleIcon } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function FeedSidebar() {
  const user = useAuthStore(state => state.user)
  const pathname = usePathname()
  console.log(pathname)
  if (!user) {
    return
  }

  return (
    <header className="sticky top-0 hidden sm:flex h-screen w-22 xl:w-68.75 flex-col justify-between px-2 py-4 xl:px-8 border">
      
      <div className="flex w-full flex-col items-center gap-2 xl:items-start">
          
          <Link href="/" className="mb-4 flex w-fit cursor-pointer items-center justify-center rounded-full p-3 hover:bg-neutral-900 transition-colors">
            <div className="size-7 rounded-full">
               <Image
                  src={"/app.svg"}
                  alt="appLogo"
                  height={28}
                  width={28}
               />
            </div>
          </Link>
          
          <NavItem 
            text="Home" 
            active={pathname === "/"}
            route="/"
          >
            <HouseIcon size={28} color="#e8e8e8"/>
          </NavItem>
          <NavItem 
            text="Chat" 
            route="/"
            active={pathname === "/"}
          >
            <ChatCircleIcon size={32} color="#e8e8e8"/>
          </NavItem>
          <NavItem 
            text="Profile" 
            route={`/${user.username}`}
            active={pathname === `/${user.username}`}
            >
              <UserIcon size={32} color="#e8e8e8" />
          </NavItem>
        </div>
        
        <Link href={`/${user.username}`} className="mb-4 flex w-fit xl:w-full cursor-pointer items-center justify-center gap-3 rounded-full p-2 hover:bg-neutral-900 transition-colors">
          <div className="size-10 shrink-0 rounded-full bg-neutral-700">
            {user.profileImage ? (
              <Image 
              src={user.profileImage}
              alt={user.name}
              width={40}
              height={40}
              />
            ): null
            }
          </div>
          <div className="hidden xl:block">
            <p className="font-bold leading-tight">{user.name}</p>
            <p className="text-neutral-500 text-sm">{`@${user.username}`}</p>
          </div>
        </Link>
    </header>
  );
}

const NavItem = (
  { text, active = false, children, route}:
  { text: string, 
    active?: boolean, 
    children: React.ReactNode,
    route: string
  }
) => (
  <Link href={route} className="flex w-fit cursor-pointer items-center justify-center gap-4 rounded-full p-3 transition-colors hover:bg-neutral-900 xl:w-full xl:justify-start">
        <div className={`size-7 rounded-md`}>
          {children} 
        </div>
        <span className={`hidden text-xl xl:block ${active ? 'font-bold' : ''}`}>{text}</span>
  </Link>
);