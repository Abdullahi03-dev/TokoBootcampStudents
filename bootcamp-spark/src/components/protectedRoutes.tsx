import { useEffect, useState, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [auth, setAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const verifySession = async () => {
      const skipVerify = localStorage.getItem("skipVerifyOnce");

      // ✅ If coming right from login, skip first verification
      if (skipVerify) {
        localStorage.removeItem("skipVerifyOnce");
        setAuth(true);
        return;
      }

      try {
        const res = await axios.get("http://127.0.0.1:8000/auth/verify-session", {
          withCredentials: true,
        });

        const email = localStorage.getItem("emailBootcamp");

        if (!res.data.authenticated || !email) {
          // Logout both server + local
          try {
            await axios.post("http://127.0.0.1:8000/auth/logout", {}, { withCredentials: true });
          } catch (err) {
            console.warn("Logout error:", err);
          }

          localStorage.removeItem("emailBootcamp");
          toast.error("Session expired. Please log in again.");
          setAuth(false);
        } else {
          setAuth(true);
        }
      } catch (err) {
        localStorage.removeItem("emailBootcamp");
        toast.error("Session expired. Please log in again.");
        setAuth(false);
      }
    };

    verifySession();
  }, []);

  if (auth === null) return <div>Loading...</div>;

  return auth ? <>{children}</> : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;
