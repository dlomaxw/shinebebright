import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  FolderOpen, 
  Users, 
  FileText, 
  MessageSquare, 
  Mail, 
  Calendar,
  Briefcase,
  Settings,
  LogOut,
  Zap,
  Building,
  Power
} from "lucide-react";
import { useAdminAuth } from "@/contexts/admin-auth";

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const AdminSidebar = ({ activeSection, onSectionChange }: AdminSidebarProps) => {
  const { logout } = useAdminAuth();

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "properties", label: "Properties", icon: Building },
    { id: "projects", label: "Projects", icon: FolderOpen },
    { id: "team", label: "Team", icon: Users },
    { id: "blog", label: "Blog Posts", icon: FileText },
    { id: "inquiries", label: "Inquiries", icon: MessageSquare },
    { id: "newsletter", label: "Newsletter", icon: Mail },
    { id: "bookings", label: "Demo Bookings", icon: Calendar },
    { id: "service-bookings", label: "Service Bookings", icon: Briefcase },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-bright-black border-r border-bright-yellow/20 z-40">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 border-b border-bright-yellow/20">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-bright-yellow rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-bright-black" />
            </div>
            <span className="ml-3 text-lg font-bold text-bright-white">Admin Panel</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-left ${
                    activeSection === item.id
                      ? "bg-bright-yellow/20 text-bright-yellow"
                      : "text-bright-white/70 hover:text-bright-white hover:bg-bright-yellow/10"
                  }`}
                  onClick={() => onSectionChange(item.id)}
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  {item.label}
                </Button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-bright-yellow/20 space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start text-bright-white/70 hover:text-bright-white hover:bg-bright-yellow/10"
            asChild
          >
            <Link href="/">
              <LogOut className="w-4 h-4 mr-3" />
              Back to Site
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-bright-white/70 hover:text-bright-white hover:bg-red-500/20"
            onClick={logout}
            data-testid="button-logout"
          >
            <Power className="w-4 h-4 mr-3" />
            Logout
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
