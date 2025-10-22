import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import {
  BookOpen,
  FileText,
  Bell,
  Award,
  LogOut,
  User,
  Menu,
  X,
  Home,
} from "lucide-react";
import { toast } from "sonner";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const email = localStorage.getItem("emailBootcamp");

  // ✅ Check user enrollment from backend
  useEffect(() => {
    const fetchEnrollmentStatus = async () => {
      if (!email) {
        setIsEnrolled(false);
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/enrollments/check/${email}`
        );
        setIsEnrolled(res.data.enrolled); // true or false from backend
      } catch (error) {
        console.error("Failed to fetch enrollment status:", error);
        toast.error("Could not verify your enrollment status.");
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollmentStatus();
  }, [email]);

  const handleRestrictedAccess = (path: string) => {
    // If not enrolled, block restricted pages
    const restrictedPaths = ["/my-courses", "/assignments", "/certificate"];

    if (!isEnrolled && restrictedPaths.includes(path)) {
      toast.error("Please enroll in a course to access this feature.");
      return;
    }

    navigate(path);
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/auth/logout", {}, { withCredentials: true });
      localStorage.clear();
      toast.success("Successfully logged out!");
      setTimeout(() => (window.location.href = "/auth"), 1000);
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Error logging out. Please try again.");
    }
  };

  const menuItems = [
    { icon: Home, label: "Courses", path: "/courses" },
    { icon: BookOpen, label: "My Courses", path: "/my-course", restricted: true },
    { icon: FileText, label: "Assignments", path: "/assignments", restricted: true },
    { icon: Bell, label: "Announcements", path: "/announcements", restricted: false },
    { icon: Award, label: "Certificate", path: "/certificate", restricted: true },
  ];

  const isActive = (path: string) => location.pathname === path;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-muted-foreground">Checking enrollment...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-0"
        } overflow-hidden bg-card border-r border-border shadow-lg`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Bootcamp
            </h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 p-4">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleRestrictedAccess(item.path)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                  isActive(item.path)
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
                } ${
                  item.restricted && !isEnrolled ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* User Profile */}
          <div className="border-t border-border p-4">
            <Link
              to="/profile"
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all ${
                isActive("/profile")
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
              }`}
            >
              <User className="h-5 w-5" />
              <span className="text-sm font-medium">Profile</span>
            </Link>
            <Button
              variant="ghost"
              className="mt-2 w-full justify-start gap-3 text-destructive hover:bg-destructive/10 hover:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? "lg:ml-64" : "ml-0"
        }`}
      >
        {/* Top Navigation */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 px-6 shadow-sm">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/announcements")}
              className="relative"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive"></span>
            </Button>
            <Avatar
              className="h-9 w-9 cursor-pointer"
              onClick={() => navigate("/profile")}
            >
              <AvatarImage src="" alt="User" />
              <AvatarFallback className="bg-primary text-primary-foreground">
                AB
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 animate-fade-in">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
