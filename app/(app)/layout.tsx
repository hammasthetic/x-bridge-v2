
import "../globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/SideBar/Sidebar";
import PoweredBy from "@/components/SideBar/PoweredBy";
import SideBarStats from "@/components/SideBar/SideBarStats";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen max-h-screen p-0 sm:p-0 md:p-8 lg:p-10 w-full items-center">
      <div className="wrapper w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-0 sm:gap-0 md:gap-8 lg:gap-10">
        <div className="md:col-span-3 md:min-h-[200px]">
          <Sidebar showStats={false} />
        </div>
        <div className="flex flex-col justify-start md:col-span-9 gap-0 sm:gap-0 md:gap-8">
          <Header />
          <div className="md:hidden flex flex-col gap-0 sm:gap-6">
            <div className="bg-content1 w-full flex justify-center rounded-sm sm:rounded-md">
              {children}
            </div>
            <SideBarStats />
            <PoweredBy />
          </div>
          <div className="hidden md:flex flex-col gap-0 sm:gap-0 md:gap-8">
            <PoweredBy />
            <div className="bg-content1  w-full flex justify-center rounded-sm sm:rounded-md">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
