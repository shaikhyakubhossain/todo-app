import "./globals.css";
import Nav from "@/components/Nav/nav.component";
import RTKStoreProvider from "@/components/RTKStoreProvider/rtk-store-provider.component";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <RTKStoreProvider>
          <Nav />
          {children}
        </RTKStoreProvider>
      </body>
    </html>
  );
}
