"use client";

import {
  Calendar,
  Globe,
  Home,
  Leaf,
  LogOut,
  MessageSquare,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const pathname = usePathname();

  // Check if a path is active (exact match or starts with for nested routes)
  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex items-center justify-center p-4">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "font-semibold text-md transition-opacity duration-200",
              isCollapsed && "opacity-0 w-0 overflow-hidden"
            )}
          >
            The Green Team Analytics
          </span>
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/")}
                  tooltip="Dashboard"
                  className="hover:bg-green-50 hover:text-green-600 text-base nav-button"
                  size="lg"
                >
                  <Link href="/" className="nav-link">
                    <Home className="h-5 w-5 min-w-5 min-h-5" />
                    <span className={cn(isCollapsed && "hidden")}>
                      Dashboard
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/campaigns")}
                  tooltip="Campaigns"
                  className="hover:bg-green-50 hover:text-green-600 text-base nav-button"
                  size="lg"
                >
                  <Link href="/campaigns" className="nav-link">
                    <Calendar className="h-5 w-5 min-w-5 min-h-5" />
                    <span className={cn(isCollapsed && "hidden")}>
                      Campaigns
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/social")}
                  tooltip="Social"
                  className="hover:bg-green-50 hover:text-green-600 text-base nav-button"
                  size="lg"
                >
                  <Link href="/social" className="nav-link">
                    <MessageSquare className="h-5 w-5 min-w-5 min-h-5" />
                    <span className={cn(isCollapsed && "hidden")}>Social</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/communities")}
                  tooltip="Communities"
                  className="hover:bg-green-50 hover:text-green-600 text-base nav-button"
                  size="lg"
                >
                  <Link href="/communities" className="nav-link">
                    <Globe className="h-5 w-5 min-w-5 min-h-5" />
                    <span className={cn(isCollapsed && "hidden")}>
                      Communities
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "flex items-center gap-2 w-full h-auto hover:bg-green-50 p-2",
                isCollapsed ? "justify-center" : "justify-start"
              )}
            >
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt="User avatar"
                width={40}
                height={40}
                className="rounded-full min-w-10 min-h-10"
              />
              <div
                className={cn(
                  "flex flex-col items-start text-left transition-opacity duration-200",
                  isCollapsed && "hidden"
                )}
              >
                <span className="text-sm font-medium">John Doe</span>
                <span className="text-xs text-muted-foreground">Admin</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>

      {/* Add the rail for toggling sidebar size */}
      <SidebarRail className="hover:after:bg-green-600" />
    </Sidebar>
  );
}
