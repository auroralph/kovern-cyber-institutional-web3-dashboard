import { Link, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Wallet,
  ShieldCheck,
  Vote,
  Settings,
  Network,
  Hexagon,
} from "lucide-react";
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
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Portfolio", url: "/portfolio", icon: Wallet },
  { title: "Compliance", url: "/compliance", icon: ShieldCheck },
  { title: "Governance", url: "/governance", icon: Vote },
  { title: "Architecture", url: "/architecture", icon: Network },
  { title: "Settings", url: "/settings", icon: Settings },
] as const;

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { pathname } = useLocation();

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2 px-2 py-1.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-sm border border-[var(--cobalt)] bg-[color-mix(in_oklch,var(--cobalt)_18%,transparent)]">
            <Hexagon className="h-4 w-4 text-[var(--cobalt-glow)]" />
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-tight">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground">
                ZK-Shield
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                Institutional
              </span>
            </div>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-mono text-[10px] uppercase tracking-[0.18em]">
            Console
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const active = pathname === item.url || pathname.startsWith(item.url + "/");
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={active} tooltip={item.title}>
                      <Link to={item.url} className="font-mono text-xs uppercase tracking-wider">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        {!collapsed && (
          <div className="px-2 py-1 font-mono text-[10px] leading-relaxed text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>NODE</span>
              <span className="text-[var(--success)]">● SYNCED</span>
            </div>
            <div className="flex items-center justify-between">
              <span>BLOCK</span>
              <span className="text-foreground">19,482,103</span>
            </div>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
