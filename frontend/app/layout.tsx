import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AuthStoreProvider } from "@/contexts/auth";
import Provider from "./providers";
import FeedSidebar from "@/components/sidebars/FeedSidebar";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontSerif = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Yap",
  description: "twitter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontSans.variable} ${fontSerif.variable} antialiased dark`}>
        <Provider>
          <div className="flex justify-center">
                <FeedSidebar />

              <main className="flex min-h-screen w-full flex-col border-x border-neutral-800 sm:max-w-150 px-4 sm:px-6">
                {children}
              </main>
          </div>
        </Provider>
        <Toaster />
      </body>
    </html>
  );
}
