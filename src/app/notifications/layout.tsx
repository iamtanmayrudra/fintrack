import { SidebarProvider } from "@/components/dashboard/sidebar-context";
import { Sidebar } from "@/components/dashboard/sidebar";
import { AuthGuard } from "@/components/auth-guard";

export default function NotificationsLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard><SidebarProvider><div className="min-h-screen bg-cream text-ink"><Sidebar /><div className="lg:pl-64">{children}</div></div></SidebarProvider></AuthGuard>;
}
