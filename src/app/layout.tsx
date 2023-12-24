import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import UserSessionProvider from "@/providers/UserSessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Blog App",
  description: "Next blog app with typescript and prisma",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserSessionProvider>
          <Header />
          <div className="max-w-4xl mx-auto">{children}</div>
        </UserSessionProvider>
      </body>
    </html>
  );
}
