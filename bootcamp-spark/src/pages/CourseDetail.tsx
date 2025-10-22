



// import { useEffect, useState, useCallback, useMemo } from "react";
// import DashboardLayout from "@/components/DashboardLayout";
// import {
//   getUserEnrolledCourse,
//   getCompletedLessons,
//   completeLesson,
//   markEnrollmentComplete,
// } from "@/api/enrollment";
// import { Progress } from "@/components/ui/progress";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { CheckCircle2, BookOpen } from "lucide-react";
// import { toast } from "sonner";

// const CourseDetail = () => {
//   const email = localStorage.getItem("emailBootcamp") || "";
//   const [course, setCourse] = useState<any | null>(null);
//   const [completedLessons, setCompletedLessons] = useState<number[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [enrollmentCompleted, setEnrollmentCompleted] = useState(false);

//   useEffect(() => {
//     const load = async () => {
//       try {
//         const data = await getUserEnrolledCourse(email);
//         const completed = await getCompletedLessons(email);
//         setCourse(data);
//         setCompletedLessons(completed.map((l: any) => l.submodule_id));
//         if (data.status === "completed") setEnrollmentCompleted(true);
//       } catch {
//         toast.error("Failed to load course");
//       } finally {
//         setLoading(false);
//       }
//     };
//     load();
//   }, [email]);

//   const totalLessons = useMemo(
//     () =>
//       course?.modules?.reduce(
//         (acc: number, m: any) => acc + (m.submodules?.length || 0),
//         0
//       ) || 0,
//     [course]
//   );

//   const progress = useMemo(
//     () =>
//       totalLessons
//         ? Math.round((completedLessons.length / totalLessons) * 100)
//         : 0,
//     [completedLessons, totalLessons]
//   );

//   const handleLessonComplete = useCallback(
//     async (submoduleId: number) => {
//       if (enrollmentCompleted)
//         return toast.error("Course already completed.");
//       if (completedLessons.includes(submoduleId))
//         return toast.warning("Lesson already completed.");

//       const confirmAction = window.confirm(
//         "Are you sure you want to mark this lesson as completed?"
//       );
//       if (!confirmAction) return;

//       try {
//         const res = await completeLesson(email, submoduleId);
//         if (res.status === "added") {
//           setCompletedLessons((prev) => [...prev, submoduleId]);
//           toast.success("Lesson completed ✅");
//         }
//       } catch (err: any) {
//         toast.error(err?.response?.data?.detail || "Failed to complete lesson");
//       }
//     },
//     [email, completedLessons, enrollmentCompleted]
//   );

//   useEffect(() => {
//     if (progress === 100 && !enrollmentCompleted) {
//       (async () => {
//         await markEnrollmentComplete(email);
//         setEnrollmentCompleted(true);
//         toast.success("🎉 Course fully completed!");
//       })();
//     }
//   }, [progress, email, enrollmentCompleted]);

//   if (loading)
//     return (
//       <DashboardLayout>
//         <p className="text-center py-10">Loading...</p>
//       </DashboardLayout>
//     );

//   return (
//     <DashboardLayout>
//       <div className="space-y-6">
//         <div className="rounded-xl bg-card p-6 border shadow-md">
//           <div className="flex justify-between items-center">
//             <h1 className="text-3xl font-bold">{course?.title}</h1>
//             <Badge className="text-lg px-4 py-2">
//               {progress}% Completed
//             </Badge>
//           </div>
//           <Progress value={progress} className="h-2 mt-4" />
//         </div>

//         <Card>
//           <CardHeader>
//             <CardTitle>Course Content</CardTitle>
//             <CardDescription>All modules are open for you</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Accordion
//               type="multiple"
//               defaultValue={course?.modules?.map((m: any) => `day-${m.day}`)}
//             >
//               {course?.modules?.map((mod: any) => (
//                 <AccordionItem key={mod.id} value={`day-${mod.day}`}>
//                   <AccordionTrigger>
//                     <div className="flex items-center gap-2">
//                       <BookOpen className="text-primary h-5 w-5" />
//                       <span className="font-semibold">
//                         Day {mod.day}: {mod.title}
//                       </span>
//                     </div>
//                   </AccordionTrigger>
//                   <AccordionContent>
//                     {mod.submodules.map((sub: any) => (
//                       <div
//                         key={sub.id}
//                         className="flex flex-col border rounded-lg mb-2 p-3 hover:bg-secondary/20 transition"
//                       >
//                         <div className="flex items-center justify-between">
//                           <span
//                             className={`text-lg ${
//                               completedLessons.includes(sub.id)
//                                 ? "line-through text-muted-foreground"
//                                 : ""
//                             }`}
//                           >
//                             {sub.title}
//                           </span>

//                           {completedLessons.includes(sub.id) ? (
//                             <div className="flex items-center gap-2">
//                               <CheckCircle2 className="text-green-500 h-5 w-5" />
//                               <Button disabled variant="outline" size="sm">
//                                 Completed
//                               </Button>
//                             </div>
//                           ) : (
//                             <Button
//                               variant="default"
//                               size="sm"
//                               onClick={() => handleLessonComplete(sub.id)}
//                               disabled={enrollmentCompleted}
//                             >
//                               Mark as Completed
//                             </Button>
//                           )}
//                         </div>

//                         {/* 🔗 Submodule Link */}
//                         {sub.link && (
//                           <a
//                             href={sub.link}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-blue-600 text-sm underline mt-2 hover:text-blue-800"
//                           >
//                             🔗 View Lesson
//                           </a>
//                         )}
//                       </div>
//                     ))}
//                   </AccordionContent>
//                 </AccordionItem>
//               ))}
//             </Accordion>
//           </CardContent>
//         </Card>
//       </div>
//     </DashboardLayout>
//   );
// };

// export default CourseDetail;



// import { useEffect, useState, useCallback, useMemo } from "react";
// import DashboardLayout from "@/components/DashboardLayout";
// import {
//   getUserEnrolledCourse,
//   getCompletedLessons,
//   completeLesson,
//   markEnrollmentComplete,
// } from "@/api/enrollment";
// import { Progress } from "@/components/ui/progress";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { CheckCircle2, BookOpen } from "lucide-react";
// import { toast } from "sonner";

// const CourseDetail = () => {
//   const email = localStorage.getItem("emailBootcamp") || "";
//   const [course, setCourse] = useState<any | null>(null);
//   const [completedLessons, setCompletedLessons] = useState<number[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [enrollmentCompleted, setEnrollmentCompleted] = useState(false);
//   const [selectedLesson, setSelectedLesson] = useState<number | null>(null);

//   useEffect(() => {
//     const load = async () => {
//       try {
//         const data = await getUserEnrolledCourse(email);
//         const completed = await getCompletedLessons(email);
//         setCourse(data);
//         setCompletedLessons(completed.map((l: any) => l.submodule_id));
//         if (data.status === "completed") setEnrollmentCompleted(true);
//       } catch {
//         toast.error("Failed to load course");
//       } finally {
//         setLoading(false);
//       }
//     };
//     load();
//   }, [email]);

//   const totalLessons = useMemo(
//     () =>
//       course?.modules?.reduce(
//         (acc: number, m: any) => acc + (m.submodules?.length || 0),
//         0
//       ) || 0,
//     [course]
//   );

//   const progress = useMemo(
//     () =>
//       totalLessons
//         ? Math.round((completedLessons.length / totalLessons) * 100)
//         : 0,
//     [completedLessons, totalLessons]
//   );

//   const handleLessonComplete = useCallback(
//     async (submoduleId: number) => {
//       if (enrollmentCompleted)
//         return toast.error("Course already completed.");
//       if (completedLessons.includes(submoduleId))
//         return toast.warning("Lesson already completed.");

//       try {
//         const res = await completeLesson(email, submoduleId);
//         if (res.status === "added") {
//           setCompletedLessons((prev) => [...prev, submoduleId]);
//           toast.success("Lesson completed ✅");
//         }
//       } catch (err: any) {
//         toast.error(err?.response?.data?.detail || "Failed to complete lesson");
//       }
//     },
//     [email, completedLessons, enrollmentCompleted]
//   );

//   useEffect(() => {
//     if (progress === 100 && !enrollmentCompleted) {
//       (async () => {
//         await markEnrollmentComplete(email);
//         setEnrollmentCompleted(true);
//         toast.success("🎉 Course fully completed!");
//       })();
//     }
//   }, [progress, email, enrollmentCompleted]);

//   if (loading)
//     return (
//       <DashboardLayout>
//         <p className="text-center py-10">Loading...</p>
//       </DashboardLayout>
//     );

//   return (
//     <DashboardLayout>
//       <div className="space-y-6">
//         <div className="rounded-xl bg-card p-6 border shadow-md">
//           <div className="flex justify-between items-center">
//             <h1 className="text-3xl font-bold">{course?.title}</h1>
//             <Badge className="text-lg px-4 py-2">
//               {progress}% Completed
//             </Badge>
//           </div>
//           <Progress value={progress} className="h-2 mt-4" />
//         </div>

//         <Card>
//           <CardHeader>
//             <CardTitle>Course Content</CardTitle>
//             <CardDescription>All modules are open for you</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Accordion
//               type="multiple"
//               defaultValue={course?.modules?.map((m: any) => `day-${m.day}`)}
//             >
//               {course?.modules?.map((mod: any) => (
//                 <AccordionItem key={mod.id} value={`day-${mod.day}`}>
//                   <AccordionTrigger>
//                     <div className="flex items-center gap-2">
//                       <BookOpen className="text-primary h-5 w-5" />
//                       <span className="font-semibold">
//                         Day {mod.day}: {mod.title}
//                       </span>
//                     </div>
//                   </AccordionTrigger>
//                   <AccordionContent>
//                     {mod.submodules.map((sub: any) => (
//                       <div
//                         key={sub.id}
//                         className="flex flex-col border rounded-lg mb-2 p-3 hover:bg-secondary/20 transition"
//                       >
//                         <div className="flex items-center justify-between">
//                           <span
//                             className={`text-lg ${
//                               completedLessons.includes(sub.id)
//                                 ? "line-through text-muted-foreground"
//                                 : ""
//                             }`}
//                           >
//                             {sub.title}
//                           </span>

//                           {completedLessons.includes(sub.id) ? (
//                             <div className="flex items-center gap-2">
//                               <CheckCircle2 className="text-green-500 h-5 w-5" />
//                               <Button disabled variant="outline" size="sm">
//                                 Completed
//                               </Button>
//                             </div>
//                           ) : (
//                             <AlertDialog>
//                               <AlertDialogTrigger asChild>
//                                 <Button
//                                   variant="default"
//                                   size="sm"
//                                   disabled={enrollmentCompleted}
//                                   onClick={() => setSelectedLesson(sub.id)}
//                                 >
//                                   Mark as Completed
//                                 </Button>
//                               </AlertDialogTrigger>
//                               <AlertDialogContent>
//                                 <AlertDialogHeader>
//                                   <AlertDialogTitle>
//                                     Confirm Completion
//                                   </AlertDialogTitle>
//                                   <AlertDialogDescription>
//                                     Are you sure you have completed this lesson? 
//                                     Once confirmed, it cannot be undone.
//                                   </AlertDialogDescription>
//                                 </AlertDialogHeader>
//                                 <AlertDialogFooter>
//                                   <AlertDialogCancel>Cancel</AlertDialogCancel>
//                                   <AlertDialogAction
//                                     onClick={() =>
//                                       selectedLesson &&
//                                       handleLessonComplete(selectedLesson)
//                                     }
//                                   >
//                                     Yes, Mark as Completed
//                                   </AlertDialogAction>
//                                 </AlertDialogFooter>
//                               </AlertDialogContent>
//                             </AlertDialog>
//                           )}
//                         </div>

//                         {/* 🔗 Submodule Link */}
//                         {sub.link && (
//                           <a
//                             href={sub.link}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-blue-600 text-sm underline mt-2 hover:text-blue-800"
//                           >
//                             🔗 View Lesson
//                           </a>
//                         )}
//                       </div>
//                     ))}
//                   </AccordionContent>
//                 </AccordionItem>
//               ))}
//             </Accordion>
//           </CardContent>
//         </Card>
//       </div>
//     </DashboardLayout>
//   );
// };

// export default CourseDetail;



// import { useEffect, useState, useCallback, useMemo } from "react";
// import DashboardLayout from "@/components/DashboardLayout";
// import {
//   getUserEnrolledCourse,
//   getCompletedLessons,
//   completeLesson,
//   markEnrollmentComplete,
// } from "@/api/enrollment";
// import { Progress } from "@/components/ui/progress";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { CheckCircle2, BookOpen } from "lucide-react";
// import { toast } from "sonner";

// const CourseDetail = () => {
//   const email = localStorage.getItem("emailBootcamp") || "";
//   const [course, setCourse] = useState<any | null>(null);
//   const [completedLessons, setCompletedLessons] = useState<number[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [enrollmentCompleted, setEnrollmentCompleted] = useState(false);
//   const [selectedLesson, setSelectedLesson] = useState<number | null>(null);

//   useEffect(() => {
//     const load = async () => {
//       try {
//         const data = await getUserEnrolledCourse(email);
//         const completed = await getCompletedLessons(email);
//         setCourse(data);
//         setCompletedLessons(completed.map((l: any) => l.submodule_id));
//         if (data.status === "completed") setEnrollmentCompleted(true);
//       } catch {
//         toast.error("Failed to load course");
//       } finally {
//         setLoading(false);
//       }
//     };
//     load();
//   }, [email]);

//   const totalLessons = useMemo(
//     () =>
//       course?.modules?.reduce(
//         (acc: number, m: any) => acc + (m.submodules?.length || 0),
//         0
//       ) || 0,
//     [course]
//   );

//   const progress = useMemo(
//     () =>
//       totalLessons
//         ? Math.round((completedLessons.length / totalLessons) * 100)
//         : 0,
//     [completedLessons, totalLessons]
//   );

//   const handleLessonComplete = useCallback(
//     async (submoduleId: number) => {
//       if (enrollmentCompleted)
//         return toast.error("Course already completed.");
//       if (completedLessons.includes(submoduleId))
//         return toast.warning("Lesson already completed.");

//       try {
//         const res = await completeLesson(email, submoduleId);
//         if (res.status === "added") {
//           setCompletedLessons((prev) => [...prev, submoduleId]);
//           toast.success("Lesson completed ✅");
//         }
//       } catch (err: any) {
//         toast.error(err?.response?.data?.detail || "Failed to complete lesson");
//       }
//     },
//     [email, completedLessons, enrollmentCompleted]
//   );

//   useEffect(() => {
//     if (progress === 100 && !enrollmentCompleted) {
//       (async () => {
//         await markEnrollmentComplete(email);
//         setEnrollmentCompleted(true);
//         toast.success("🎉 Course fully completed!");
//       })();
//     }
//   }, [progress, email, enrollmentCompleted]);

//   if (loading)
//     return (
//       <DashboardLayout>
//         <p className="text-center py-10">Loading...</p>
//       </DashboardLayout>
//     );

//   return (
//     <DashboardLayout>
//       <div className="space-y-6">
//         <div className="rounded-xl bg-card p-6 border shadow-md">
//           <div className="flex justify-between items-center">
//             <h1 className="text-3xl font-bold">{course?.title}</h1>
//             <Badge className="text-lg px-4 py-2">
//               {progress}% Completed
//             </Badge>
//           </div>
//           <Progress value={progress} className="h-2 mt-4" />
//         </div>

//         <Card>
//           <CardHeader>
//             <CardTitle>Course Content</CardTitle>
//             <CardDescription>All modules are open for you</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Accordion
//               type="multiple"
//               defaultValue={course?.modules?.map((m: any) => `day-${m.day}`)}
//             >
//               {course?.modules?.map((mod: any) => (
//                 <AccordionItem key={mod.id} value={`day-${mod.day}`}>
//                   <AccordionTrigger>
//                     <div className="flex items-center gap-2">
//                       <BookOpen className="text-primary h-5 w-5" />
//                       <span className="font-semibold">
//                         Day {mod.day}: {mod.title}
//                       </span>
//                     </div>
//                   </AccordionTrigger>
//                   <AccordionContent>
//                     {mod.submodules.map((sub: any) => (
//                       <div
//                         key={sub.id}
//                         className="flex flex-col border rounded-lg mb-2 p-3 hover:bg-secondary/20 transition"
//                       >
//                         <div className="flex items-center justify-between">
//                           <span
//                             className={`text-lg ${
//                               completedLessons.includes(sub.id)
//                                 ? "line-through text-muted-foreground"
//                                 : ""
//                             }`}
//                           >
//                             {sub.title}
//                           </span>

//                           {completedLessons.includes(sub.id) ? (
//                             <div className="flex items-center gap-2">
//                               <CheckCircle2 className="text-green-500 h-5 w-5" />
//                               <Button disabled variant="outline" size="sm">
//                                 Completed
//                               </Button>
//                             </div>
//                           ) : (
//                             <AlertDialog>
//                               <AlertDialogTrigger asChild>
//                                 <Button
//                                   variant="default"
//                                   size="sm"
//                                   disabled={enrollmentCompleted}
//                                   onClick={() => setSelectedLesson(sub.id)}
//                                 >
//                                   Mark as Completed
//                                 </Button>
//                               </AlertDialogTrigger>
//                               <AlertDialogContent>
//                                 <AlertDialogHeader>
//                                   <AlertDialogTitle>
//                                     Confirm Completion
//                                   </AlertDialogTitle>
//                                   <AlertDialogDescription>
//                                     Are you sure you have completed this lesson? 
//                                     Once confirmed, it cannot be undone.
//                                   </AlertDialogDescription>
//                                 </AlertDialogHeader>
//                                 <AlertDialogFooter>
//                                   <AlertDialogCancel>Cancel</AlertDialogCancel>
//                                   <AlertDialogAction
//                                     onClick={() =>
//                                       selectedLesson &&
//                                       handleLessonComplete(selectedLesson)
//                                     }
//                                   >
//                                     Yes, Mark as Completed
//                                   </AlertDialogAction>
//                                 </AlertDialogFooter>
//                               </AlertDialogContent>
//                             </AlertDialog>
//                           )}
//                         </div>

//                         {/* ✅ Rich HTML content display */}
//                         {sub.content && (
//                           <div
//                             className="prose prose-slate mt-3 p-3 bg-muted/20 rounded-lg"
//                             dangerouslySetInnerHTML={{ __html: sub.content }}
//                           />
//                         )}

//                         {/* 🔗 External Link (optional) */}
//                         {sub.link && (
//                           <a
//                             href={sub.link}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-blue-600 text-sm underline mt-2 hover:text-blue-800"
//                           >
//                             🔗 View Resource
//                           </a>
//                         )}
//                       </div>
//                     ))}
//                   </AccordionContent>
//                 </AccordionItem>
//               ))}
//             </Accordion>
//           </CardContent>
//         </Card>
//       </div>
//     </DashboardLayout>
//   );
// };

// export default CourseDetail;


// import { useEffect, useState, useCallback, useMemo } from "react";
// import DashboardLayout from "@/components/DashboardLayout";
// import {
//   getUserEnrolledCourse,
//   getCompletedLessons,
//   completeLesson,
//   markEnrollmentComplete,
// } from "@/api/enrollment";
// import { Progress } from "@/components/ui/progress";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { CheckCircle2, BookOpen, GraduationCap } from "lucide-react";
// import { toast } from "sonner";

// const CourseDetail = () => {
//   const email = localStorage.getItem("emailBootcamp") || "";
//   const [course, setCourse] = useState<any | null>(null);
//   const [completedLessons, setCompletedLessons] = useState<number[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [enrollmentCompleted, setEnrollmentCompleted] = useState(false);
//   const [selectedLesson, setSelectedLesson] = useState<number | null>(null);

//   useEffect(() => {
//     const load = async () => {
//       try {
//         const data = await getUserEnrolledCourse(email);
//         const completed = await getCompletedLessons(email);
//         setCourse(data);
//         setCompletedLessons(completed.map((l: any) => l.submodule_id));
//         if (data.status === "completed") setEnrollmentCompleted(true);
//       } catch {
//         toast.error("Failed to load course");
//       } finally {
//         setLoading(false);
//       }
//     };
//     load();
//   }, [email]);

//   const totalLessons = useMemo(
//     () =>
//       course?.modules?.reduce(
//         (acc: number, m: any) => acc + (m.submodules?.length || 0),
//         0
//       ) || 0,
//     [course]
//   );

//   const progress = useMemo(
//     () =>
//       totalLessons
//         ? Math.round((completedLessons.length / totalLessons) * 100)
//         : 0,
//     [completedLessons, totalLessons]
//   );

//   const handleLessonComplete = useCallback(
//     async (submoduleId: number) => {
//       if (enrollmentCompleted) return toast.error("Course already completed.");
//       if (completedLessons.includes(submoduleId))
//         return toast.warning("Lesson already completed.");

//       try {
//         const res = await completeLesson(email, submoduleId);
//         if (res.status === "added") {
//           setCompletedLessons((prev) => [...prev, submoduleId]);
//           toast.success("Lesson completed ✅");
//         }
//       } catch (err: any) {
//         toast.error(err?.response?.data?.detail || "Failed to complete lesson");
//       }
//     },
//     [email, completedLessons, enrollmentCompleted]
//   );

//   useEffect(() => {
//     if (progress === 100 && !enrollmentCompleted) {
//       (async () => {
//         await markEnrollmentComplete(email);
//         setEnrollmentCompleted(true);
//         toast.success("🎉 Course fully completed!");
//       })();
//     }
//   }, [progress, email, enrollmentCompleted]);

//   if (loading)
//     return (
//       <DashboardLayout>
//         <p className="text-center py-10 text-lg text-muted-foreground animate-pulse">
//           Loading course details...
//         </p>
//       </DashboardLayout>
//     );

//   return (
//     <DashboardLayout>
//       <div className="space-y-6">
//         {/* Header Section */}
//         <div className="rounded-xl bg-card p-6 border shadow-md">
//           <div className="flex justify-between items-center">
//             <h1 className="text-3xl font-bold flex items-center gap-2">
//               <GraduationCap className="text-primary" /> {course?.title}
//             </h1>
//             <Badge className="text-lg px-4 py-2">
//               {progress}% Completed
//             </Badge>
//           </div>
//           <Progress value={progress} className="h-2 mt-4" />
//         </div>

//         {/* Course Modules */}
//         <Card>
//           <CardHeader>
//             <CardTitle>📘 Study Resources</CardTitle>
//             <CardDescription>
//               Access all your course materials and reading lessons below.
//             </CardDescription>
//           </CardHeader>

//           <CardContent>
//             <Accordion
//               type="multiple"
//               defaultValue={course?.modules?.map((m: any) => `day-${m.day}`)}
//             >
//               {course?.modules?.map((mod: any) => (
//                 <AccordionItem key={mod.id} value={`day-${mod.day}`}>
//                   <AccordionTrigger>
//                     <div className="flex items-center gap-2">
//                       <BookOpen className="text-primary h-5 w-5" />
//                       <span className="font-semibold text-lg">
//                         Day {mod.day}: {mod.title}
//                       </span>
//                     </div>
//                   </AccordionTrigger>

//                   <AccordionContent>
//                     {mod.submodules.map((sub: any) => (
//                       <div
//                         key={sub.id}
//                         className="flex flex-col border rounded-xl mb-3 p-4 hover:bg-secondary/20 transition shadow-sm"
//                       >
//                         {/* Submodule Title + Status */}
//                         <div className="flex items-center justify-between mb-2">
//                           <span
//                             className={`text-lg font-medium ${
//                               completedLessons.includes(sub.id)
//                                 ? "line-through text-muted-foreground"
//                                 : "text-foreground"
//                             }`}
//                           >
//                             {sub.title}
//                           </span>

//                           {completedLessons.includes(sub.id) ? (
//                             <div className="flex items-center gap-2">
//                               <CheckCircle2 className="text-green-500 h-5 w-5" />
//                               <Button disabled variant="outline" size="sm">
//                                 Completed
//                               </Button>
//                             </div>
//                           ) : (
//                             <AlertDialog>
//                               <AlertDialogTrigger asChild>
//                                 <Button
//                                   variant="default"
//                                   size="sm"
//                                   disabled={enrollmentCompleted}
//                                   onClick={() => setSelectedLesson(sub.id)}
//                                 >
//                                   Mark as Completed
//                                 </Button>
//                               </AlertDialogTrigger>

//                               <AlertDialogContent>
//                                 <AlertDialogHeader>
//                                   <AlertDialogTitle>
//                                     Confirm Lesson Completion
//                                   </AlertDialogTitle>
//                                   <AlertDialogDescription>
//                                     Have you read or reviewed this study
//                                     resource? Once marked, it can’t be undone.
//                                   </AlertDialogDescription>
//                                 </AlertDialogHeader>
//                                 <AlertDialogFooter>
//                                   <AlertDialogCancel>Cancel</AlertDialogCancel>
//                                   <AlertDialogAction
//                                     onClick={() =>
//                                       selectedLesson &&
//                                       handleLessonComplete(selectedLesson)
//                                     }
//                                   >
//                                     Yes, Mark as Completed
//                                   </AlertDialogAction>
//                                 </AlertDialogFooter>
//                               </AlertDialogContent>
//                             </AlertDialog>
//                           )}
//                         </div>

//                         {/* Study Content */}
//                         {sub.content && (
//                           <div
//                             className="prose prose-slate mt-3 bg-muted/30 p-4 rounded-lg leading-relaxed"
//                             dangerouslySetInnerHTML={{ __html: sub.content }}
//                           />
//                         )}

//                         {/* External Link */}
//                         {sub.link && (
//                           <a
//                             href={sub.link}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-blue-600 text-sm underline mt-3 hover:text-blue-800"
//                           >
//                             🔗 Open Additional Resource
//                           </a>
//                         )}
//                       </div>
//                     ))}
//                   </AccordionContent>
//                 </AccordionItem>
//               ))}
//             </Accordion>
//           </CardContent>
//         </Card>
//       </div>
//     </DashboardLayout>
//   );
// };

// export default CourseDetail;


import { useEffect, useState, useCallback, useMemo } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import {
  getUserEnrolledCourse,
  getCompletedLessons,
  completeLesson,
  markEnrollmentComplete,
} from "@/api/enrollment";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CheckCircle2, BookOpen, GraduationCap } from "lucide-react";
import { toast } from "sonner";

const CourseDetail = () => {
  const email = localStorage.getItem("emailBootcamp") || "";
  const [course, setCourse] = useState<any | null>(null);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [enrollmentCompleted, setEnrollmentCompleted] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getUserEnrolledCourse(email);
        setCourse(data);

        if (data?.id) {
          const completed = await getCompletedLessons(email, data.id);
          setCompletedLessons(completed.map((l: any) => l.submodule_id));
        }

        if (data.status === "completed") setEnrollmentCompleted(true);
      } catch {
        toast.error("Failed to load course");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [email]);

  const totalLessons = useMemo(
    () =>
      course?.modules?.reduce(
        (acc: number, m: any) => acc + (m.submodules?.length || 0),
        0
      ) || 0,
    [course]
  );

  const progress = useMemo(
    () =>
      totalLessons
        ? Math.round((completedLessons.length / totalLessons) * 100)
        : 0,
    [completedLessons, totalLessons]
  );

  const handleLessonComplete = useCallback(
    async (submoduleId: number) => {
      if (enrollmentCompleted) return toast.error("Course already completed.");
      if (completedLessons.includes(submoduleId))
        return toast.warning("Lesson already completed.");

      try {
        const res = await completeLesson(email, submoduleId);
        if (res.status === "added") {
          setCompletedLessons((prev) => [...prev, submoduleId]);
          toast.success("Lesson completed ✅");
        }
      } catch (err: any) {
        toast.error(err?.response?.data?.detail || "Failed to complete lesson");
      }
    },
    [email, completedLessons, enrollmentCompleted]
  );

  useEffect(() => {
    if (progress === 100 && !enrollmentCompleted && course?.id) {
      (async () => {
        await markEnrollmentComplete(email, course.id);
        setEnrollmentCompleted(true);
        toast.success("🎉 Course fully completed!");
      })();
    }
  }, [progress, email, course, enrollmentCompleted]);

  if (loading)
    return (
      <DashboardLayout>
        <p className="text-center py-10 text-lg text-muted-foreground animate-pulse">
          Loading course details...
        </p>
      </DashboardLayout>
    );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="rounded-xl bg-card p-6 border shadow-md">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <GraduationCap className="text-primary" /> {course?.title}
            </h1>
            <Badge className="text-lg px-4 py-2">{progress}% Completed</Badge>
          </div>
          <Progress value={progress} className="h-2 mt-4" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>📘 Study Resources</CardTitle>
            <CardDescription>
              Access all your course materials and reading lessons below.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Accordion type="multiple" defaultValue={course?.modules?.map((m: any) => `day-${m.day}`)}>
              {course?.modules?.map((mod: any) => (
                <AccordionItem key={mod.id} value={`day-${mod.day}`}>
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <BookOpen className="text-primary h-5 w-5" />
                      <span className="font-semibold text-lg">
                        Day {mod.day}: {mod.title}
                      </span>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent>
                    {mod.submodules.map((sub: any) => (
                      <div key={sub.id} className="flex flex-col border rounded-xl mb-3 p-4 hover:bg-secondary/20 transition shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-lg font-medium ${completedLessons.includes(sub.id) ? "line-through text-muted-foreground" : "text-foreground"}`}>
                            {sub.title}
                          </span>

                          {completedLessons.includes(sub.id) ? (
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="text-green-500 h-5 w-5" />
                              <Button disabled variant="outline" size="sm">Completed</Button>
                            </div>
                          ) : (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="default"
                                  size="sm"
                                  disabled={enrollmentCompleted}
                                  onClick={() => setSelectedLesson(sub.id)}
                                >
                                  Mark as Completed
                                </Button>
                              </AlertDialogTrigger>

                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Confirm Lesson Completion</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Have you reviewed this study resource? Once marked, it can’t be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() =>
                                      selectedLesson && handleLessonComplete(selectedLesson)
                                    }
                                  >
                                    Yes, Mark as Completed
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          )}
                        </div>

                        {sub.content && (
                          <div
                            className="prose prose-slate mt-3 bg-muted/30 p-4 rounded-lg leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: sub.content }}
                          />
                        )}

                        {sub.link && (
                          <a
                            href={sub.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 text-sm underline mt-3 hover:text-blue-800"
                          >
                            🔗 Open Additional Resource
                          </a>
                        )}
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CourseDetail;
