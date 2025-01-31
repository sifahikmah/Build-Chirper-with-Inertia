import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
// import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Link } from "@inertiajs/react";


// This is sample data.
const data = {
  user: {
    name: "Admin",
    email: "admin@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  // teams: [
  //   {
  //     name: "Admin Dashboard",
  //     logo: GalleryVerticalEnd,
  //     plan: "Enterprise",
  //     url: "/admin/dashboard",
  //   },
    // {
    //   name: "Acme Corp.",
    //   logo: AudioWaveform,
    //   plan: "Startup",
    // },
    // {
    //   name: "Evil Corp.",
    //   logo: Command,
    //   plan: "Free",
    // },
  // ],
  navMain: [
    {
      title: "User Management",
      url: "/admin/user-management",
      icon: SquareTerminal,
      isActive: true,
      // items: [
      //   {
      //     title: "All Users",
      //     url: "/admin/user-management",
      //   },
      //   {
      //     title: "Disabled Account",
      //     url: "#",
      //   },
      // ],
    },
    {
      title: "Chirps Management",
      url: "/admin/chirps-management",
      icon: Bot,
    },
    {
      title: "Violation Reports",
      url: "/admin/violation-reports",
      icon: Settings2,
    },
    {
      title: "Statistic & Activity",
      url: "/admin/statistics",
      icon: BookOpen,
    },
  ],
  // projects: [
  //   {
  //     name: "Design Engineering",
  //     url: "#",
  //     icon: Frame,
  //   },
  //   {
  //     name: "Sales & Marketing",
  //     url: "#",
  //     icon: PieChart,
  //   },
  //   {
  //     name: "Travel",
  //     url: "#",
  //     icon: Map,
  //   },
  // ],
}

export function AppSidebar({
  ...props
}) {
  return (
    (<Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* Mengubah TeamSwitcher jadi Link ke Admin Dashboard */}
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-2 px-4 py-2 text-lg font-bold hover:text-sidebar-accent transition"
        >
          <GalleryVerticalEnd />
          <span className="font-bold">Admin Dashboard</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>)
  );
}
