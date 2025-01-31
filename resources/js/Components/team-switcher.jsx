import * as React from "react";
import { Link } from "@inertiajs/react"; // Import Link dari Inertia.js
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Import logo tim, misalnya GalleryVerticalEnd
import { GalleryVerticalEnd } from "lucide-react"; // Contoh logo, pastikan sesuai dengan data kamu

export function TeamSwitcher({ teams }) {
  const [activeTeam, setActiveTeam] = React.useState(teams[0]);
  if (teams.length === 0) return null;
  if (!activeTeam) return null; 
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {/* Menampilkan tim aktif */}
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <activeTeam.logo className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{activeTeam.name}</span>
            <span className="truncate text-xs">{activeTeam.plan}</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>

      <div className="mt-2">
        {/* Menampilkan daftar tim */}
        {teams.map((team) => (
          <div
            key={team.name}
            className="p-2 cursor-pointer"
            onClick={() => setActiveTeam(team)} // Menetapkan tim aktif saat diklik
          >
            <Link href={team.url} className="flex items-center gap-2">
              <div className="flex size-6 items-center justify-center rounded-sm border">
                <team.logo className="size-4 shrink-0" />
              </div>
              {team.name}
            </Link>
          </div>
        ))}
      </div>
    </SidebarMenu>
  );
}
