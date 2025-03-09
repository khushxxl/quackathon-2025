"use client";

import {
  Calendar,
  Globe,
  Home,
  Leaf,
  LogOut,
  MessageSquare,
  Settings,
  BarChart,
  TreePine,
  User as UserIcon,
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
import { checkAuth, cn } from "@/lib/utils";
import { createClient } from "@/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
export function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const [userData, setUserData] = useState<any>();

  useEffect(() => {
    const auth = async () => {
      const { user, error } = (await checkAuth()) as {
        user: User;
        error: any;
      };
      if (!user) {
        router.push("/auth/sign-in");
      } else {
        console.log(user);
        setUserData(user);
      }
    };

    auth();
  }, [router]);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      router.push("/auth/sign-in");
    } catch (error) {
      console.error(error);
    }
  };

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
            The Green Life Analytics
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
              <UserIcon className="h-5 w-5 min-w-5 min-h-5" />
              <div
                className={cn(
                  "flex flex-col items-start text-left transition-opacity duration-200",
                  isCollapsed && "hidden"
                )}
              >
                <span className="text-sm font-medium">Admin</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="">
              <Button
                variant="ghost"
                className="w-full h-auto hover:bg-green-50 dark:hover:bg-green-900/20 p-2 rounded-lg transition-colors"
                onClick={signOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>

      {/* Add the rail for toggling sidebar size */}
      <SidebarRail className="hover:after:bg-green-600" />
    </Sidebar>
  );
}
