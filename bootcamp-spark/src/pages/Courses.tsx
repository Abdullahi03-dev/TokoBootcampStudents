// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import DashboardLayout from "@/components/DashboardLayout";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Search, Clock, BookOpen, Play } from "lucide-react";
// import { toast } from "sonner";
// import { fetchCourses } from "../api/course";
// import { enrollCourse } from "../api/enrollment";

// interface Course {
//   id: number;
//   title: string;
//   description: string;
//   duration: string;
//   type: string;
//   price: number | null;
//   image?: string | null;
// }

// const Courses = () => {
//   const navigate = useNavigate();
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [enrolling, setEnrolling] = useState<number | null>(null);
//   const email = localStorage.getItem("emailBootcamp");

//   useEffect(() => {
//     const loadCourses = async () => {
//       try {
//         const data = await fetchCourses();
//         setCourses(data);
//       } catch (error) {
//         console.error(error);
//         toast.error("Failed to load courses. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadCourses();
//   }, []);

//   const handleEnroll = async (course: Course) => {
//     if (!email) {
//       toast.error("Please log in to enroll in a course.");
//       return;
//     }

//     // 💰 If the course has a price, redirect to payment page
//     if (course.price && course.price > 0) {
//       navigate(`/payment-info/${course.id}`);
//       return;
//     }

//     // ✅ Otherwise, proceed with free enrollment
//     setEnrolling(course.id);
//     const loadingToast = toast.loading("Processing enrollment...");

//     try {
//       const response = await enrollCourse(email, course.id);

//       if (response.status === "exists") {
//         toast.error("You are already enrolled in this course!");
//       } else if (response.status === "restricted") {
//         toast.error(response.message);
//       } else if (response.status === "success") {
//         toast.success(`Successfully enrolled in ${course.title}!`);
//         setTimeout(() => navigate(`/my-course`), 1000);
//       } else {
//         toast.error("Unexpected server response.");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to enroll. Please try again.");
//     } finally {
//       toast.dismiss(loadingToast);
//       setEnrolling(null);
//     }
//   };

//   const filteredCourses = courses.filter(
//     (course) =>
//       course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       course.description.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <DashboardLayout>
//       <div className="space-y-6">
//         <div className="rounded-xl bg-gradient-to-r from-primary to-primary/70 p-8 text-primary-foreground shadow-lg">
//           <h1 className="text-3xl font-bold mb-2">
//             Welcome, {email ? email.split("@")[0] : "Learner"} 👋
//           </h1>
//           <p className="text-lg opacity-90">
//             Explore our courses and start your learning journey today.
//           </p>
//         </div>

//         <div className="flex flex-col sm:flex-row gap-4">
//           <div className="relative flex-1">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//             <Input
//               placeholder="Search courses..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="pl-10"
//             />
//           </div>
//           <Button variant="outline">Filter by Level</Button>
//         </div>

//         {loading && (
//           <p className="text-center text-muted-foreground py-10">
//             Loading courses...
//           </p>
//         )}

//         {!loading && (
//           <>
//             {filteredCourses.length === 0 ? (
//               <p className="text-center text-muted-foreground py-10">
//                 No courses found.
//               </p>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {filteredCourses.map((course) => (
//                   <Card
//                     key={course.id}
//                     className="group hover:shadow-xl transition-all duration-300 overflow-hidden"
//                   >
//                     <div className="relative h-48 overflow-hidden">
//                       <img
//                         src={course.image}
//                         alt={course.title}
//                         className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
//                       />
//                       <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
//                         {course.type}
//                       </Badge>
//                     </div>

//                     <CardHeader>
//                       <CardTitle className="line-clamp-2">{course.title}</CardTitle>
//                       <CardDescription className="line-clamp-3">
//                         {course.description}
//                       </CardDescription>
//                     </CardHeader>

//                     <CardContent>
//                       <div className="flex items-center justify-between mb-4">
//                         <div className="flex items-center gap-4 text-sm text-muted-foreground">
//                           <div className="flex items-center gap-1">
//                             <Clock className="h-4 w-4" />
//                             <span>{course.duration}</span>
//                           </div>
//                           <div className="flex items-center gap-1">
//                             <BookOpen className="h-4 w-4" />
//                             <span>Modules</span>
//                           </div>
//                         </div>

//                         {course.price && course.price > 0 ? (
//                           <div className="text-xl font-bold text-primary">
//                             ₦{course.price}
//                           </div>
//                         ) : (
//                           <Badge variant="outline" className="bg-accent/10">
//                             Free
//                           </Badge>
//                         )}
//                       </div>
//                     </CardContent>

//                     <CardFooter className="gap-2">
//                       <Button
//                         variant="outline"
//                         className="flex-1"
//                         onClick={() => navigate(`/course-preview/${course.id}`)}
//                       >
//                         <Play className="h-4 w-4 mr-2" />
//                         Preview
//                       </Button>

//                       <Button
//                         disabled={enrolling === course.id}
//                         className="flex-1 bg-gradient-to-r from-primary to-primary/80"
//                         onClick={() => handleEnroll(course)}
//                       >
//                         {enrolling === course.id ? "Processing..." : "Enroll Now"}
//                       </Button>
//                     </CardFooter>
//                   </Card>
//                 ))}
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </DashboardLayout>
//   );
// };

// export default Courses;







import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Search, Clock, BookOpen, Play } from "lucide-react";
import { toast } from "sonner";
import { fetchCourses } from "../api/course";
import { enrollCourse } from "../api/enrollment";

interface Course {
  id: number;
  title: string;
  description: string;
  duration: string;
  type: string;
  price: number | null;
  image?: string | null;
}

const Courses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState<number | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showModal, setShowModal] = useState(false);
  const email = localStorage.getItem("emailBootcamp");

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await fetchCourses();
        setCourses(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    loadCourses();
  }, []);

  const confirmEnroll = (course: Course) => {
    setSelectedCourse(course);
    setShowModal(true);
  };

  const handleEnroll = async () => {
    if (!selectedCourse || !email) {
      toast.error("Please log in to enroll in a course.");
      setShowModal(false);
      return;
    }

    const course = selectedCourse;
    setShowModal(false);

    // 💰 Paid course → redirect to payment
    if (course.price && course.price > 0) {
      navigate(`/payment-info/${course.id}`);
      return;
    }

    // 🆓 Free course → enroll directly
    setEnrolling(course.id);
    const loadingToast = toast.loading("Processing enrollment...");

    try {
      const res = await enrollCourse(email, course.id);

      switch (res.status) {
        case "exists":
          toast.error("You are already enrolled in this course!");
          break;
        case "restricted":
          toast.error(res.message);
          break;
        case "success":
          toast.success(`Successfully enrolled in ${course.title}!`);
          setTimeout(() => navigate(`/my-course`), 800);
          break;
        default:
          toast.error("Unexpected server response.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Enrollment failed. Please try again later.");
    } finally {
      toast.dismiss(loadingToast);
      setEnrolling(null);
    }
  };

  const filteredCourses = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return courses.filter(
      (course) =>
        course.title.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query)
    );
  }, [courses, searchQuery]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="rounded-xl bg-gradient-to-r from-primary to-primary/70 p-8 text-primary-foreground shadow-lg">
          <h1 className="text-3xl font-bold mb-2">
            Welcome, {email ? email.split("@")[0] : "Learner"} 👋
          </h1>
          <p className="text-lg opacity-90">
            Explore our courses and start your learning journey today.
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">Filter by Level</Button>
        </div>

        {/* Course List */}
        {loading ? (
          <p className="text-center text-muted-foreground py-10">
            Loading courses...
          </p>
        ) : filteredCourses.length === 0 ? (
          <p className="text-center text-muted-foreground py-10">
            No courses found.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card
                key={course.id}
                className="group hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.image || "/placeholder.png"}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
                    {course.type}
                  </Badge>
                </div>

                <CardHeader>
                  <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                  <CardDescription className="line-clamp-3">
                    {course.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        <span>Modules</span>
                      </div>
                    </div>

                    {course.price && course.price > 0 ? (
                      <div className="text-xl font-bold text-primary">
                        ₦{course.price.toLocaleString()}
                      </div>
                    ) : (
                      <Badge variant="outline" className="bg-accent/10">
                        Free
                      </Badge>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => navigate(`/course-preview/${course.id}`)}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Preview
                  </Button>

                  <Button
                    disabled={enrolling === course.id}
                    className="flex-1 bg-gradient-to-r from-primary to-primary/80"
                    onClick={() => confirmEnroll(course)}
                  >
                    {enrolling === course.id ? "Processing..." : "Enroll Now"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-primary">
              Confirm Enrollment
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              After enrolling in{" "}
              <span className="font-medium text-foreground">
                {selectedCourse?.title}
              </span>
              , you won’t be able to change or drop it until you finish the course.
              Are you sure you want to continue?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4 flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleEnroll} className="bg-gradient-to-r from-primary to-primary/80">
              Yes, Enroll Me
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Courses;
