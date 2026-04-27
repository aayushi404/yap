import { HouseIcon, UserIcon, ChatCircleIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import React from "react";

export default function FeedSidebar() {
  return (
    <header className="sticky top-0 hidden sm:flex h-screen w-22 xl:w-68.75 flex-col justify-between px-2 py-4 xl:px-4">
      
      <div className="flex w-full flex-col items-center gap-2 xl:items-start">
          
          <div className="mb-4 flex w-fit cursor-pointer items-center justify-center rounded-full p-3 hover:bg-neutral-900 transition-colors">
            <div className="size-7 rounded-full">
               <Image
                  src={"/app.svg"}
                  alt="appLogo"
                  height={28}
                  width={28}
               />
            </div>
          </div>
          
          <NavItem text="Home" active><HouseIcon size={28} color="#e8e8e8"/></NavItem>
          <NavItem text="Chat"><ChatCircleIcon size={32} color="#e8e8e8" /></NavItem>
          <NavItem text="Profile"><UserIcon size={32} color="#e8e8e8" /></NavItem>
        </div>
        
        <div className="mb-4 flex w-fit xl:w-full cursor-pointer items-center justify-center gap-3 rounded-full p-3 hover:bg-neutral-900 transition-colors">
          <div className="size-10 shrink-0 rounded-full bg-neutral-700"></div>
          <div className="hidden xl:block">
            <p className="font-bold leading-tight">Your Name</p>
            <p className="text-neutral-500 text-sm">@yourhandle</p>
          </div>
        </div>
    </header>
  );
}

const NavItem = ({ text, active = false, children }: { text: string, active?: boolean, children: React.ReactNode }) => (
  <div className="flex w-fit cursor-pointer items-center justify-center gap-4 rounded-full p-3 transition-colors hover:bg-neutral-900 xl:w-full xl:justify-start">
    <div className={`size-7 rounded-md`}>
      
    </div>
    <span className={`hidden text-xl xl:block ${active ? 'font-bold' : ''}`}>{text}</span>
  </div>
);