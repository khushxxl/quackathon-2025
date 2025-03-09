"use client";

import {
  Calendar,
  Globe,
  Home,
  Leaf,
  LogOut,
  MessageSquare,
  Settings,
  User,
  BarChart,
  TreePine,
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
  SidebarTrigger,
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
    <Sidebar
      collapsible="icon"
      className="border-r border-gray-200 dark:border-gray-800"
      style={
        {
          "--sidebar-width": "16rem",
          "--sidebar-width-icon": "4rem",
        } as React.CSSProperties
      }
    >
      <SidebarHeader className="flex items-center  p-4 bg-green-50 dark:bg-green-900/20">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "font-semibold text-sm transition-opacity duration-200 text-green-700 dark:text-green-300",
              isCollapsed && "opacity-0 w-0 overflow-hidden"
            )}
          >
            Green Team Analytics
          </span>
          <SidebarTrigger className="text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/40" />
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent className="">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-gray-500 dark:text-gray-400 px-4 py-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/admin")}
                  tooltip="Dashboard"
                  className="hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-900/20 dark:hover:text-green-400 text-base nav-button transition-colors"
                  size="lg"
                >
                  <Link href="/admin" className="nav-link flex items-center">
                    <div
                      className={cn(
                        "flex justify-center",
                        isCollapsed ? "w-full" : "w-5"
                      )}
                    >
                      <Home className="h-5 w-5 min-w-5 min-h-5" />
                    </div>
                    <span className={cn("ml-2", isCollapsed && "hidden")}>
                      Dashboard
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/admin/campaigns")}
                  tooltip="Campaigns"
                  className="hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-900/20 dark:hover:text-green-400 text-base nav-button transition-colors"
                  size="lg"
                >
                  <Link
                    href="/admin/campaigns"
                    className="nav-link flex items-center"
                  >
                    <div
                      className={cn(
                        "flex justify-center",
                        isCollapsed ? "w-full" : "w-5"
                      )}
                    >
                      <Calendar className="h-5 w-5 min-w-5 min-h-5" />
                    </div>
                    <span className={cn("ml-2", isCollapsed && "hidden")}>
                      Campaigns
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/admin/social")}
                  tooltip="Social"
                  className="hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-900/20 dark:hover:text-green-400 text-base nav-button transition-colors"
                  size="lg"
                >
                  <Link
                    href="/admin/social"
                    className="nav-link flex items-center"
                  >
                    <div
                      className={cn(
                        "flex justify-center",
                        isCollapsed ? "w-full" : "w-5"
                      )}
                    >
                      <MessageSquare className="h-5 w-5 min-w-5 min-h-5" />
                    </div>
                    <span className={cn("ml-2", isCollapsed && "hidden")}>
                      Social
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/admin/feedbacks")}
                  tooltip="Feedbacks"
                  className="hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-900/20 dark:hover:text-green-400 text-base nav-button transition-colors"
                  size="lg"
                >
                  <Link
                    href="/admin/feedbacks"
                    className="nav-link flex items-center"
                  >
                    <div
                      className={cn(
                        "flex justify-center",
                        isCollapsed ? "w-full" : "w-5"
                      )}
                    >
                      <Globe className="h-5 w-5 min-w-5 min-h-5" />
                    </div>
                    <span className={cn("ml-2", isCollapsed && "hidden")}>
                      Feedbacks
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-gray-200 dark:border-gray-800">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "flex items-center gap-2 w-full h-auto hover:bg-green-50 dark:hover:bg-green-900/20 p-2 rounded-lg transition-colors",
                isCollapsed ? "justify-center" : "justify-start"
              )}
            >
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=40&width=40"
                  alt="User avatar"
                  width={40}
                  height={40}
                  className="rounded-full min-w-10 min-h-10 border-2 border-green-200 dark:border-green-800"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
              </div>
              <div
                className={cn(
                  "flex flex-col items-start text-left transition-opacity duration-200",
                  isCollapsed && "hidden"
                )}
              >
                <span className="text-sm font-medium">John Doe</span>
                <span className="text-xs text-green-600 dark:text-green-400">
                  Admin
                </span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer hover:bg-green-50 dark:hover:bg-green-900/20">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:bg-green-50 dark:hover:bg-green-900/20">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
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
