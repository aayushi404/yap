"use client"
import { useAuthStore } from "@/hooks/auth";
import { HouseIcon, UserIcon, ChatCircleIcon, MagnifyingGlassIcon, DotsThreeVerticalIcon } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog";
import React from "react";

export default function FeedSidebar() {
  const user = useAuthStore((state) => state.user);
  const pathname = usePathname();
  const router = useRouter();

  if (!user) return null;

  const navItems = [
    { text: "Home", route: "/", icon: <HouseIcon size={22} /> },
    { text: "Chat", route: `/${user.username}/chat`, icon: <ChatCircleIcon size={22} /> },
    { text: "Explore", route: "/explore", icon: <MagnifyingGlassIcon size={22} /> },
    { text: "Profile", route: `/${user.username}`, icon: <UserIcon size={22} /> },
  ];

  return (
    <aside className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-neutral-950/95 px-2 py-2 backdrop-blur-xl md:sticky md:top-0 md:h-screen md:w-20 md:justify-between md:rounded-r-[28px] md:border-r md:border-white/10 md:bg-neutral-950/80 md:px-3 md:py-5 lg:w-64 lg:px-5 xl:w-72">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-2 md:mx-0 md:flex-col md:items-stretch md:gap-3">
  
        <Link
          href="/"
          className="hidden rounded-2xl p-2.5 transition-all duration-200 md:flex md:items-center md:justify-center lg:w-full lg:justify-start lg:gap-3 lg:px-3"
        >
          <div className="flex size-9 items-center justify-center rounded-full bg-white/10">
            <Image src="/app.svg" alt="Yap logo" height={24} width={24} />
          </div>
          <span className="hidden text-sm font-semibold text-white lg:block">Yap</span>
        </Link>
        <nav className="flex flex-1 items-center justify-around gap-1 md:flex-col md:items-stretch md:justify-start md:gap-2">
          {navItems.map((item) => (
            <NavItem
              key={item.text}
              text={item.text}
              route={item.route}
              active={item.route === "/" ? pathname === "/" : pathname === item.route}
            >
              {item.icon}
            </NavItem>
          ))}
        </nav>
      

        <div className="hidden md:block">
          <Dialog>
            <DialogTrigger asChild>
              <button className="flex w-full items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-2.5 text-left transition-all duration-200 hover:bg-white/10 lg:justify-start lg:gap-3 lg:px-3">
                <div className="relative size-10 shrink-0 overflow-hidden rounded-full border border-white/10 bg-neutral-800">
                  {user.profileImage ? (
                    <Image src={user.profileImage} alt={user.name} width={40} height={40} className="object-cover" />
                  ) : null}
                </div>
                <div className="hidden flex-1 flex-col overflow-hidden lg:flex">
                  <p className="truncate text-sm font-semibold text-white">{user.name}</p>
                  <p className="truncate text-xs text-neutral-500">@{user.username}</p>
                </div>
                <DotsThreeVerticalIcon size={18} className="ml-auto hidden text-neutral-400 lg:block" />
              </button>
            </DialogTrigger>
            <DialogContent
              showCloseButton={false}
              className="left-4 bottom-28 top-auto w-[calc(100%-2rem)] max-w-sm translate-x-0 translate-y-0 rounded-2xl border border-white/10 bg-neutral-900 p-3 shadow-2xl md:left-24 md:bottom-28 md:w-72 lg:left-64 lg:bottom-24"
            >
              <DialogTitle className="text-base font-semibold text-white">{user.username}</DialogTitle>
              <div
                onClick={() => router.push("/auth/logout")}
                className="mt-2 cursor-pointer rounded-xl px-3 py-2 text-sm text-neutral-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                Log out @{user.username}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </aside>
  );
}

const NavItem = ({
  text,
  active = false,
  children,
  route,
}: {
  text: string;
  active?: boolean;
  children: React.ReactNode;
  route: string;
}) => (
  <Link
    href={route}
    className={`group flex flex-1 flex-col items-center justify-center rounded-2xl px-2 py-2 text-[11px] font-medium transition-all duration-200 md:flex-row md:justify-start md:gap-3 md:px-3 md:py-3 md:text-[14px] lg:px-4 ${
      active
        ? "bg-white/10 text-white shadow-sm"
        : "text-neutral-400 hover:bg-white/10 hover:text-white"
    }`}
  >
    <div
      className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
        active ? "bg-white/10 text-white" : "text-neutral-400 group-hover:bg-white/10 group-hover:text-white"
      }`}
    >
      {children}
    </div>
    <span className="hidden md:hidden lg:block">{text}</span>
  </Link>
);