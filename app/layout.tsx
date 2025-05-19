import { Orbitron, Pixelify_Sans } from "next/font/google";

import "./globals.css";
import { Providers } from "./providers";

import Header from "@/components/Header";
import Sidebar from "@/components/SideBar/Sidebar";
import PoweredBy from "@/components/SideBar/PoweredBy";

export const PixelifySans = Pixelify_Sans({ subsets: ["cyrillic"] });
const orbitron = Orbitron({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={orbitron.className}>
        <Providers>
          <div className=" flex flex-col mt-12 items-center align-middle min-h-screen">
            <div className="wrapper max-w-screen-2xl  w-full grid grid-cols-12 gap-10 min-h-screen">
              <div className="col-span-3 min-h-full ">
                <Sidebar />
              </div>
              <div className="flex flex-col justify-start col-span-9 gap-10">
                <Header />
                <PoweredBy />
                <div className="bg-content1 w-full rounded-small px-5 py-5 ">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
