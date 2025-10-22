import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AuthForm from "@/components/AuthForm";
import { login, register } from "@/api/auth";

const Auth = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuth = async (email: string, password: string, name: string, isLogin: boolean) => {
    console.log("Auth attempt:", { email, name, password, isLogin });

    try {
      if (!isLogin) {
        // --- SIGN UP ---
        await register(name, email, password);
        toast.success("Sign up successful!");
        localStorage.setItem("emailBootcamp", email);
        setTimeout(() => {
          navigate("/auth?mode=signin");
          navigate(0);
        }, 1500);
      } else {
        // --- SIGN IN ---
        await login(email, password);
        toast.success("Login successful!");
        localStorage.setItem("emailBootcamp", email);
        localStorage.setItem("skipVerifyOnce", "true"); // ✅ prevent instant logout
        setIsAuthenticated(true);

        setTimeout(() => {
          navigate("/courses");
        }, 1500);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.detail || "Authentication failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container py-16">
        <div className="flex justify-center">
          <AuthForm onAuth={handleAuth} />
        </div>
      </div>
    </div>
  );
};

export default Auth;
