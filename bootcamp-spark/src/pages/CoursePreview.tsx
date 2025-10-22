// import { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import DashboardLayout from "@/components/DashboardLayout";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Play, Clock, BookOpen, CheckCircle2, Lock } from "lucide-react";
// import { toast } from "sonner";
// import PaymentModal from "@/components/PaymentModal";

// const CoursePreview = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [showPaymentModal, setShowPaymentModal] = useState(false);

//   // Mock course data - in real app, fetch based on id
//   const course = {
//     id: parseInt(id || "1"),
//     title: "Full Stack Web Development",
//     description: "Master modern web development with HTML, CSS, JavaScript, React, Node.js and more. Build complete web applications from scratch with hands-on projects.",
//     duration: "12 weeks",
//     modules: 48,
//     price: 299, // null for free courses
//     level: "Beginner",
//     image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop",
//     instructor: "John Smith",
//     totalDays: 30,
//   };

//   const features = [
//     "48 comprehensive video lessons",
//     "Hands-on coding exercises",
//     "Real-world project assignments",
//     "Certificate upon completion",
//     "Lifetime access to course materials",
//     "Community support forum",
//   ];

//   const curriculum = [
//     { day: 1, title: "Introduction to Web Development", locked: false },
//     { day: 2, title: "HTML Fundamentals", locked: true },
//     { day: 3, title: "CSS Styling Basics", locked: true },
//     { day: 4, title: "JavaScript Essentials", locked: true },
//     { day: 5, title: "React Framework Introduction", locked: true },
//   ];

//   const handleEnroll = () => {
//     if (course.price) {
//       setShowPaymentModal(true);
//     } else {
//       toast.success(`Enrolled in ${course.title}!`);
//       setTimeout(() => navigate(`/course/${course.id}`), 1000);
//     }
//   };

//   const handlePaymentConfirmed = () => {
//     toast.success("Payment submitted! You'll receive access within 24 hours.");
//   };

//   return (
//     <DashboardLayout >
//       <div className="space-y-6">
//         {/* Hero Section */}
//         <div className="relative rounded-xl overflow-hidden">
//           <div className="absolute inset-0">
//             <img
//               src={course.image}
//               alt={course.title}
//               className="w-full h-full object-cover"
//             />
//             <div className="absolute inset-0 bg-gradient-to-r from-background/95 to-background/70" />
//           </div>
//           <div className="relative p-8 lg:p-12">
//             <div className="max-w-2xl">
//               <Badge className="mb-4">{course.level}</Badge>
//               <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
//               <p className="text-lg text-muted-foreground mb-6">{course.description}</p>
//               <div className="flex flex-wrap items-center gap-6 mb-6">
//                 <div className="flex items-center gap-2">
//                   <Clock className="h-5 w-5 text-primary" />
//                   <span>{course.duration}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <BookOpen className="h-5 w-5 text-primary" />
//                   <span>{course.modules} modules</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Play className="h-5 w-5 text-primary" />
//                   <span>{course.totalDays} days</span>
//                 </div>
//               </div>
//               <div className="flex items-center gap-4">
//                 {course.price ? (
//                   <div className="text-3xl font-bold text-primary">${course.price}</div>
//                 ) : (
//                   <Badge variant="outline" className="text-lg px-4 py-2">Free Course</Badge>
//                 )}
//                 <Button size="lg" onClick={handleEnroll} className="px-8">
//                   Enroll Now
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-6">
//           {/* Main Content */}
//           <div className="lg:col-span-2 space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle>What You'll Learn</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid sm:grid-cols-2 gap-3">
//                   {features.map((feature, index) => (
//                     <div key={index} className="flex items-start gap-2">
//                       <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
//                       <span className="text-sm">{feature}</span>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle>Course Curriculum Preview</CardTitle>
//                 <CardDescription>Get a glimpse of what you'll learn</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-2">
//                   {curriculum.map((item) => (
//                     <div
//                       key={item.day}
//                       className="flex items-center justify-between p-4 rounded-lg border border-border"
//                     >
//                       <div className="flex items-center gap-3">
//                         <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
//                           {item.day}
//                         </div>
//                         <span className="font-medium">{item.title}</span>
//                       </div>
//                       {item.locked && <Lock className="h-4 w-4 text-muted-foreground" />}
//                     </div>
//                   ))}
//                   <p className="text-sm text-muted-foreground text-center pt-2">
//                     + {course.totalDays - curriculum.length} more days
//                   </p>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Sidebar */}
//           <div className="space-y-4">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Instructor</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex items-center gap-3">
//                   <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
//                     {course.instructor.split(' ').map(n => n[0]).join('')}
//                   </div>
//                   <div>
//                     <p className="font-semibold">{course.instructor}</p>
//                     <p className="text-sm text-muted-foreground">Lead Instructor</p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
//               <CardHeader>
//                 <CardTitle>Ready to Start?</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <p className="text-sm text-muted-foreground">
//                   Join thousands of students already learning with us.
//                 </p>
//                 <Button className="w-full" size="lg" onClick={handleEnroll}>
//                   {course.price ? `Enroll for $${course.price}` : "Enroll for Free"}
//                 </Button>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>

//       <PaymentModal
//         open={showPaymentModal}
//         onOpenChange={setShowPaymentModal}
//         courseTitle={course.title}
//         coursePrice={course.price}
//         onPaymentConfirmed={handlePaymentConfirmed}
//       />
//     </DashboardLayout>
//   );
// };

// export default CoursePreview;





import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Clock, BookOpen, CheckCircle2, Lock } from "lucide-react";
import { toast } from "sonner";
import PaymentModal from "@/components/PaymentModal";
import { fetchCourseById } from "../api/course";

interface Submodule {
  id: number;
  title: string;
}

interface Module {
  id: number;
  day: number;
  submodules: Submodule[];
}

interface Course {
  id: number;
  title: string;
  description: string;
  duration: number;
  type: "free" | "paid";
  price: string | null;
  image: string | null;
  modules: Module[];
}

const CoursePreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // ✅ Fetch course by ID
  useEffect(() => {
    const loadCourse = async () => {
      if (!id) return;

      try {
        const data = await fetchCourseById(parseInt(id));
        setCourse(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load course. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [id]);

  const handleEnroll = () => {
    if (!course) return;

    if (course.type === "paid") {
      setShowPaymentModal(true);
    } else {
      toast.success(`Enrolled in ${course.title}!`);
      setTimeout(() => navigate(`/my-course`), 1000);
    }
  };

  const handlePaymentConfirmed = () => {
    toast.success("Payment submitted! You'll receive access within 24 hours.");
    setTimeout(() => navigate(`/course/${course?.id}`), 1000);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <p className="text-center py-10 text-muted-foreground">Loading course...</p>
      </DashboardLayout>
    );
  }

  if (!course) {
    return (
      <DashboardLayout>
        <p className="text-center py-10 text-muted-foreground">Course not found.</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Hero Section */}
        <div className="relative rounded-xl overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={course.image || ""}
              alt={course.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 to-background/70" />
          </div>
          <div className="relative p-8 lg:p-12">
            <div className="max-w-2xl">
              <Badge className="mb-4">{course.type === "paid" ? "Paid" : "Free"}</Badge>
              <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-lg text-muted-foreground mb-6">{course.description}</p>
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>{course.duration} days</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span>{course.modules.length} modules</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {course.type === "paid" && course.price ? (
                  <div className="text-3xl font-bold text-primary">${course.price}</div>
                ) : (
                  <Badge variant="outline" className="text-lg px-4 py-2">
                    Free Course
                  </Badge>
                )}
                <Button size="lg" onClick={handleEnroll} className="px-8">
                  Enroll Now
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Curriculum Section */}
        <Card>
          <CardHeader>
            <CardTitle>Course Curriculum Preview</CardTitle>
            <CardDescription>Get a glimpse of what you'll learn</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {course.modules.map((mod) => (
              <div
                key={mod.id}
                className="p-4 rounded-lg border border-border"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm">
                    {mod.day}
                  </div>
                  <span className="font-medium">Day {mod.day}</span>
                </div>
                <div className="ml-12 space-y-1">
                  {mod.submodules.map((sub) => (
                    <div key={sub.id} className="text-sm text-muted-foreground flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0" />
                      {sub.title}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        open={showPaymentModal}
        onOpenChange={setShowPaymentModal}
        courseTitle={course.title}
        coursePrice={Number(course.price) || undefined}
        onPaymentConfirmed={handlePaymentConfirmed}
      />
    </DashboardLayout>
  );
};

export default CoursePreview;
