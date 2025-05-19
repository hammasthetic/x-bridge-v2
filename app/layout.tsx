import { Montserrat, Orbitron, Pixelify_Sans } from "next/font/google";

import "./globals.css";
import { Providers } from "./providers";

import Header from "@/components/Header";
import Sidebar from "@/components/SideBar/Sidebar";
import PoweredBy from "@/components/SideBar/PoweredBy";

export const PixelifySans = Pixelify_Sans({ subsets: ["cyrillic"] });
export const orbitron = Montserrat({ subsets:["latin"], weight: "400" });
export const fontOrbi = Orbitron({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="green">
      <body className={orbitron.className}>
        <Providers>
          <div className="flex flex-col p-14 w-full items-center align-middle ">
            <div className="wrapper  w-full grid grid-cols-12 gap-10">
              <div className="col-span-3 min-h-full ">
                <Sidebar />
              </div>
              <div className="flex flex-col justify-start col-span-9 gap-10">
                <Header />
                <PoweredBy />
                <div className="bg-content1 w-full flex grow justify-center rounded-small  ">
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
