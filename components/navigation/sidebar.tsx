import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import useGlobalStore from "@/store/global";
import useUserStore from "@/store/user";
import { sdk } from "@/utils/graphqlClient";
import {
  ChevronRightIcon,
  ChevronsUpDown,
  HelpCircleIcon,
  PlusIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ImLocation } from "react-icons/im";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { getSidebarList } from "./common/sidebar-data";
import useAuthStore from "@/store/authStore";
import { extractErrorMessage } from "@/utils/functions/common";

export default function AppSidebar() {
  const { firstName, lastName } = useAuthStore();
  const [canAddRestaurant, setCanAddRestaurant] = useState(false);

  const { meUser } = useUserStore();
  // const permissions = meUser?.permissions || [];

  const router = useRouter();
  const { selectedSideBarMenu, setSelectedSideBarMenu, setToastData } =
    useGlobalStore();

  const handleLogout = async () => {
    try {
      const response = await sdk.artistLogout();
      if (response && response.artistLogout) {
        router.replace("/login");
      }
    } catch (error) {
      const errorMessage = extractErrorMessage(error);
      setToastData({
        type: "error",
        message: errorMessage,
      });
    }
  };

  // Mobile Handler
  const { isMobile, state, toggleSidebar } = useSidebar();

  return (
    <Sidebar
      id="app-sidebar"
      collapsible="icon"
      className="bg-[#F3F7FB] text-black"
    >
      <SidebarHeader>
        <SidebarMenu id="app-sidebar-add-restaurant">
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="hover:!bg-secondaryBg p-2 flex items-center justify-between"
                >
                  <div className="flex aspect-square size-7 items-center justify-center rounded-xl bg-greenNeon text-white">
                    <ImLocation size={18} />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{"Artist"}</span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <hr />

      <SidebarFooter className="border-t p-4">
        <Link
          href={"/knowledge-base/overview"}
          className={`flex flex-row justify-center items-center group space-x-2`}
        >
          <HelpCircleIcon className="text-primary" size={18} />
          {state !== "collapsed" ? (
            <p className="text-sm text-primary">Knowledge Centre</p>
          ) : null}
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
