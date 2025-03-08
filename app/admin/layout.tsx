import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eco Analytics Dashboard",
  description: "Analytics dashboard for environmental initiatives",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get the sidebar state from cookies, default to expanded
  const cookieStore = await cookies();
  const sidebarState = cookieStore.get("sidebar:state")?.value;
  const defaultOpen = sidebarState !== "false"; // Default to expanded if no cookie or true

  return (
    <html lang="en">
      <body className="{inter.className}">
        <SidebarProvider defaultOpen={defaultOpen}>
          <div className="flex min-h-screen">
            <AppSidebar />
            <main className="flex-1">{children}</main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
