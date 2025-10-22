import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import CoursePreview from "./pages/CoursePreview";
import Assignments from "./pages/Assignments";
import Announcements from "./pages/Announcements";
import Certificate from "./pages/Certificate";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import ProtectedRoute from './components/protectedRoutes'
import PaymentInfo from "./pages/PaymentInfo";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/auth" replace />} />

          {/* Public Route */}
          <Route path="/auth" element={<Auth />} />

          {/* Protected Routes */}
          <Route
            path="/courses"
            element={
              <ProtectedRoute>
                <Courses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-courses"
            element={
              <ProtectedRoute>
                <Courses />
              </ProtectedRoute>
            }
          />
          <Route path="/payment-info/:courseId" 
          element={
            <ProtectedRoute>
          <PaymentInfo />
          </ProtectedRoute>} />
          <Route
            path="/course-preview/:id"
            element={
              <ProtectedRoute>
                <CoursePreview />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-course"
            element={
              <ProtectedRoute>
                <CourseDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/assignments"
            element={
              <ProtectedRoute>
                <Assignments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/announcements"
            element={
              <ProtectedRoute>
                <Announcements />
              </ProtectedRoute>
            }
          />
          <Route
            path="/certificate"
            element={
              <ProtectedRoute>
                <Certificate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
