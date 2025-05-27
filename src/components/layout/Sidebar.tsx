
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  LayoutDashboard, 
  Stethoscope, 
  Users, 
  Calendar, 
  FileText, 
  Activity,
  UserCheck,
  CreditCard,
  Package,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Stethoscope, label: "Symptoms", path: "/symptoms" },
    { icon: Users, label: "Patients", path: "/patients" },
    { icon: Calendar, label: "Appointments", path: "/appointments" },
    { icon: FileText, label: "Reports", path: "/reports" },
    { icon: Activity, label: "Health Metrics", path: "/metrics" },
    { icon: UserCheck, label: "Staff", path: "/staff" },
    { icon: CreditCard, label: "Billing", path: "/billing" },
    { icon: Package, label: "Inventory", path: "/inventory" },
  ];

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    navigate("/login");
  };

  return (
    <Card className={`${isCollapsed ? 'w-16' : 'w-64'} h-screen bg-white border-r border-gray-200 transition-all duration-300 rounded-none`}>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h2 className="text-xl font-bold text-medical-600">HealthCare AI</h2>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1"
          >
            {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      
      <nav className="p-4 space-y-2 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 140px)' }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link key={item.path} to={item.path}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start ${isCollapsed ? 'px-2' : 'px-4'} ${
                  isActive ? 'bg-medical-500 text-white' : 'hover:bg-medical-50'
                }`}
              >
                <Icon className={`h-5 w-5 ${isCollapsed ? '' : 'mr-3'}`} />
                {!isCollapsed && item.label}
              </Button>
            </Link>
          );
        })}
      </nav>
      
      <div className="absolute bottom-4 left-4 right-4">
        <Button
          onClick={handleLogout}
          variant="outline"
          className={`w-full ${isCollapsed ? 'px-2' : 'px-4'} border-red-200 text-red-600 hover:bg-red-50`}
        >
          <LogOut className={`h-5 w-5 ${isCollapsed ? '' : 'mr-3'}`} />
          {!isCollapsed && "Logout"}
        </Button>
      </div>
    </Card>
  );
};

export default Sidebar;
