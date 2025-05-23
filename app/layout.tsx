
import { orbitron } from "@/config/fonts";
import "./globals.css";
import { Providers } from "@/app/providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={orbitron.className}>
        <Providers>
         
            {children}
          
        </Providers>
      </body>
    </html>
  );
}
