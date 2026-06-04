"use client"
import { useAuthStore } from "@/hooks/auth";
import { HouseIcon, UserIcon, ChatCircleIcon, MagnifyingGlassIcon, DotsThreeVerticalIcon } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog";
import React from "react";
import { useRouter } from "next/navigation";

export default function FeedSidebar() {
  const user = useAuthStore(state => state.user)
  const pathname = usePathname()
  const router = useRouter()
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
            text="Explore"
            active={pathname === "/explore"}
            route="/explore"
          >
            <MagnifyingGlassIcon size={28}/>
          </NavItem>
          <NavItem 
            text="Profile" 
            route={`/${user.username}`}
            active={pathname === `/${user.username}`}
            >
              <UserIcon size={32} color="#e8e8e8" />
          </NavItem>
        </div>
        <Dialog>
          <DialogTrigger>
            <div className="mb-4 flex w-fit xl:w-full cursor-pointer items-center justify-center gap-3 rounded-full p-2 hover:bg-neutral-900 transition-colors"
              
            
            >
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
              <DotsThreeVerticalIcon size={28} className="z-1000" />
            </div>
          </DialogTrigger>
          <DialogContent showCloseButton={false} className="sm:left-1/3 sm:top-5/6 sm:w-70">
            <DialogTitle>{user.username}</DialogTitle>
                <div onClick={() => router.push("/auth/logout")} className="hover:cursor-pointer">Log out @{user.username}</div>
          </DialogContent>
        </Dialog>
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