import FeedSidebar from "@/components/sidebars/FeedSidebar";

export default function SidebarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <div className="flex justify-center">
                <FeedSidebar />
              <main className="flex min-h-screen w-full flex-col border-x border-neutral-800 sm:max-w-150 px-4 sm:px-6">
                {children}
              </main>
          </div>
    )
}