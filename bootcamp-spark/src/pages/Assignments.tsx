// // import { useState } from "react";
// // import DashboardLayout from "@/components/DashboardLayout";
// // import { Button } from "@/components/ui/button";
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Badge } from "@/components/ui/badge";
// // import { Input } from "@/components/ui/input";
// // import { Textarea } from "@/components/ui/textarea";
// // import { FileText, CheckCircle2, Clock, XCircle, Link as LinkIcon } from "lucide-react";
// // import { toast } from "sonner";

// // const Assignments = () => {
// //   const [assignmentLink, setAssignmentLink] = useState("");
// //   const [notes, setNotes] = useState("");

// //   const submissions = [
// //     {
// //       id: 1,
// //       title: "HTML & CSS Portfolio Project",
// //       submittedDate: "Mar 15, 2024",
// //       status: "graded",
// //       score: "95/100",
// //       feedback: "Excellent work! Great attention to detail.",
// //     },
// //     {
// //       id: 2,
// //       title: "JavaScript Calculator App",
// //       submittedDate: "Mar 22, 2024",
// //       status: "submitted",
// //       score: null,
// //       feedback: null,
// //     },
// //     {
// //       id: 3,
// //       title: "React Todo Application",
// //       submittedDate: null,
// //       status: "pending",
// //       score: null,
// //       feedback: null,
// //     },
// //   ];

// //   const handleSubmit = () => {
// //     if (!assignmentLink.trim()) {
// //       toast.error("Please provide a link to your assignment");
// //       return;
// //     }
// //     toast.success("Assignment submitted successfully! 🎉");
// //     setAssignmentLink("");
// //     setNotes("");
// //   };

// //   const getStatusBadge = (status: string) => {
// //     switch (status) {
// //       case "graded":
// //         return <Badge className="bg-accent text-accent-foreground"><CheckCircle2 className="h-3 w-3 mr-1" />Graded</Badge>;
// //       case "submitted":
// //         return <Badge className="bg-info text-white"><Clock className="h-3 w-3 mr-1" />Under Review</Badge>;
// //       case "pending":
// //         return <Badge variant="secondary"><XCircle className="h-3 w-3 mr-1" />Not Submitted</Badge>;
// //       default:
// //         return null;
// //     }
// //   };

// //   return (
// //     <DashboardLayout isEnrolled={true}>
// //       <div className="space-y-6">
// //         {/* Page Header */}
// //         <div>
// //           <h1 className="text-3xl font-bold mb-2">Assignments</h1>
// //           <p className="text-muted-foreground">
// //             Submit your work and track your progress
// //           </p>
// //         </div>

// //         {/* Current Assignment */}
// //         <Card className="border-primary/20 shadow-lg">
// //           <CardHeader>
// //             <div className="flex justify-between items-start">
// //               <div>
// //                 <CardTitle className="text-2xl">React Todo Application</CardTitle>
// //                 <CardDescription className="mt-2">
// //                   Due Date: April 5, 2024 • 100 points
// //                 </CardDescription>
// //               </div>
// //               <Badge variant="outline" className="text-warning border-warning">
// //                 Due in 5 days
// //               </Badge>
// //             </div>
// //           </CardHeader>
// //           <CardContent className="space-y-6">
// //             {/* Instructions */}
// //             <div className="rounded-lg bg-secondary/50 p-4">
// //               <h3 className="font-semibold mb-2">Instructions</h3>
// //               <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
// //                 <li>Create a functional todo app using React hooks</li>
// //                 <li>Implement add, edit, delete, and mark as complete features</li>
// //                 <li>Use local storage to persist data</li>
// //                 <li>Apply proper styling with CSS or Tailwind</li>
// //                 <li>Submit your code as a ZIP file or GitHub repository link</li>
// //               </ul>
// //             </div>

// //             {/* Link Submission */}
// //             <div className="space-y-4">
// //               <div className="space-y-2">
// //                 <label className="text-sm font-medium flex items-center gap-2">
// //                   <LinkIcon className="h-4 w-4" />
// //                   Assignment Link
// //                 </label>
// //                 <Input
// //                   placeholder="https://github.com/username/project or https://drive.google.com/..."
// //                   value={assignmentLink}
// //                   onChange={(e) => setAssignmentLink(e.target.value)}
// //                   className="w-full"
// //                 />
// //                 <p className="text-xs text-muted-foreground">
// //                   Submit a link to your GitHub repo, Google Drive, deployed project, or any other hosting platform
// //                 </p>
// //               </div>

// //               {/* Notes */}
// //               <div className="space-y-2">
// //                 <label className="text-sm font-medium">Additional Notes (Optional)</label>
// //                 <Textarea
// //                   placeholder="Add any comments or notes about your submission..."
// //                   value={notes}
// //                   onChange={(e) => setNotes(e.target.value)}
// //                   className="min-h-[100px]"
// //                 />
// //               </div>

// //               {/* Submit Button */}
// //               <Button
// //                 onClick={handleSubmit}
// //                 disabled={!assignmentLink.trim()}
// //                 className="w-full sm:w-auto bg-gradient-to-r from-primary to-primary/80"
// //                 size="lg"
// //               >
// //                 Submit Assignment
// //               </Button>
// //             </div>
// //           </CardContent>
// //         </Card>

// //         {/* Past Submissions */}
// //         <div className="space-y-4">
// //           <h2 className="text-2xl font-bold">Past Submissions</h2>
// //           <div className="grid gap-4">
// //             {submissions.map((submission) => (
// //               <Card key={submission.id} className="hover:shadow-md transition-shadow">
// //                 <CardHeader>
// //                   <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
// //                     <div className="flex-1">
// //                       <CardTitle className="text-lg flex items-center gap-2">
// //                         <FileText className="h-5 w-5 text-primary" />
// //                         {submission.title}
// //                       </CardTitle>
// //                       <CardDescription className="mt-1">
// //                         {submission.submittedDate
// //                           ? `Submitted on ${submission.submittedDate}`
// //                           : "Not submitted yet"}
// //                       </CardDescription>
// //                     </div>
// //                     <div className="flex flex-col items-end gap-2">
// //                       {getStatusBadge(submission.status)}
// //                       {submission.score && (
// //                         <span className="text-lg font-bold text-accent">
// //                           {submission.score}
// //                         </span>
// //                       )}
// //                     </div>
// //                   </div>
// //                 </CardHeader>
// //                 {submission.feedback && (
// //                   <CardContent>
// //                     <div className="rounded-lg bg-accent/10 border border-accent/20 p-4">
// //                       <p className="text-sm font-medium text-accent mb-1">Instructor Feedback</p>
// //                       <p className="text-sm text-muted-foreground">{submission.feedback}</p>
// //                     </div>
// //                   </CardContent>
// //                 )}
// //               </Card>
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     </DashboardLayout>
// //   );
// // };

// // export default Assignments;


// import { useState } from "react";
// import DashboardLayout from "@/components/DashboardLayout";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { FileText, CheckCircle2, Clock, XCircle, Link as LinkIcon } from "lucide-react";
// import { toast } from "sonner";

// const Assignments = () => {
//   const [assignmentLink, setAssignmentLink] = useState("");
//   const [notes, setNotes] = useState("");

//   const submissions = [
//     {
//       id: 1,
//       title: "HTML & CSS Portfolio Project",
//       submittedDate: "Mar 15, 2024",
//       status: "graded",
//       score: "95/100",
//       feedback: "Excellent work! Great attention to detail.",
//     },
//     {
//       id: 2,
//       title: "JavaScript Calculator App",
//       submittedDate: "Mar 22, 2024",
//       status: "submitted",
//       score: null,
//       feedback: null,
//     },
//     {
//       id: 3,
//       title: "React Todo Application",
//       submittedDate: null,
//       status: "pending",
//       score: null,
//       feedback: null,
//     },
//   ];

//   const handleSubmit = () => {
//     if (!assignmentLink.trim()) {
//       toast.error("Please provide a valid assignment link");
//       return;
//     }

//     toast.success("Assignment submitted successfully!");
//     setAssignmentLink("");
//     setNotes("");
//   };

//   const getStatusBadge = (status: string) => {
//     switch (status) {
//       case "graded":
//         return (
//           <Badge className="bg-green-100 text-green-700 border-green-200 flex items-center gap-1">
//             <CheckCircle2 className="h-3 w-3" /> Graded
//           </Badge>
//         );
//       case "submitted":
//         return (
//           <Badge className="bg-blue-100 text-blue-700 border-blue-200 flex items-center gap-1">
//             <Clock className="h-3 w-3" /> Under Review
//           </Badge>
//         );
//       case "pending":
//         return (
//           <Badge className="bg-gray-100 text-gray-600 border-gray-200 flex items-center gap-1">
//             <XCircle className="h-3 w-3" /> Not Submitted
//           </Badge>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <DashboardLayout>
//       <div className="space-y-8">
//         {/* Header */}
//         <div className="text-center sm:text-left">
//           <h1 className="text-3xl font-bold tracking-tight">Assignments</h1>
//           <p className="text-muted-foreground mt-1">
//             Submit your work and track feedback from your instructor.
//           </p>
//         </div>

//         {/* Current Assignment */}
//         <Card className="border border-primary/10 shadow-md hover:shadow-lg transition-all">
//           <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
//             <div>
//               <CardTitle className="text-xl font-semibold">React Todo Application</CardTitle>
//               <CardDescription>Due Date: April 5, 2024 • 100 points</CardDescription>
//             </div>
//             <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Due in 5 days</Badge>
//           </CardHeader>

//           <CardContent className="space-y-6">
//             {/* Instructions */}
//             <div className="bg-muted/50 rounded-lg p-4 border border-muted">
//               <h3 className="font-semibold mb-2">Instructions</h3>
//               <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
//                 <li>Build a functional Todo App using React hooks.</li>
//                 <li>Include Add, Edit, Delete, and Complete features.</li>
//                 <li>Use Local Storage for persistence.</li>
//                 <li>Style with CSS or Tailwind.</li>
//                 <li>Submit via GitHub or Google Drive link.</li>
//               </ul>
//             </div>

//             {/* Submission Form */}
//             <div className="space-y-4">
//               <div>
//                 <label className="text-sm font-medium flex items-center gap-2 mb-1">
//                   <LinkIcon className="h-4 w-4" /> Assignment Link
//                 </label>
//                 <Input
//                   placeholder="https://github.com/username/project"
//                   value={assignmentLink}
//                   onChange={(e) => setAssignmentLink(e.target.value)}
//                 />
//               </div>

//               <div>
//                 <label className="text-sm font-medium mb-1">Notes (Optional)</label>
//                 <Textarea
//                   placeholder="Add any extra notes for your instructor..."
//                   value={notes}
//                   onChange={(e) => setNotes(e.target.value)}
//                   className="min-h-[100px]"
//                 />
//               </div>

//               <Button
//                 onClick={handleSubmit}
//                 disabled={!assignmentLink.trim()}
//                 className="w-full sm:w-auto bg-gradient-to-r from-primary to-primary/80"
//               >
//                 Submit Assignment
//               </Button>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Past Submissions */}
//         <section>
//           <h2 className="text-2xl font-bold mb-4">Past Submissions</h2>
//           <div className="grid gap-4">
//             {submissions.map((submission) => (
//               <Card
//                 key={submission.id}
//                 className="border border-muted/30 hover:shadow-md transition-all"
//               >
//                 <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
//                   <div>
//                     <CardTitle className="text-base flex items-center gap-2 font-medium">
//                       <FileText className="h-4 w-4 text-primary" />
//                       {submission.title}
//                     </CardTitle>
//                     <CardDescription>
//                       {submission.submittedDate
//                         ? `Submitted on ${submission.submittedDate}`
//                         : "Not submitted yet"}
//                     </CardDescription>
//                   </div>
//                   <div className="flex flex-col sm:items-end gap-2">
//                     {getStatusBadge(submission.status)}
//                     {submission.score && (
//                       <span className="text-sm font-semibold text-green-700">{submission.score}</span>
//                     )}
//                   </div>
//                 </CardHeader>

//                 {submission.feedback && (
//                   <CardContent>
//                     <div className="bg-green-50 border border-green-100 rounded-lg p-3">
//                       <p className="text-sm font-medium text-green-800 mb-1">Instructor Feedback</p>
//                       <p className="text-sm text-muted-foreground">{submission.feedback}</p>
//                     </div>
//                   </CardContent>
//                 )}
//               </Card>
//             ))}
//           </div>
//         </section>
//       </div>
//     </DashboardLayout>
//   );
// };

// export default Assignments;



// src/pages/student/Assignments.tsx
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import axios from "axios";

interface Assignment {
  id: number;
  course_id: number;
  title: string;
  instructions?: string;
}

interface Submission {
  id: number;
  assignment_id: number;
  submitted_link: string;
  grade: string;
  submitted_at: string | null;
}
const API_URL=import.meta.env.VITE_API_URL
const BASE = `${API_URL}/assignments`;

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<number | "">("");
  const [link, setLink] = useState("");
  const [notes] = useState(""); // you said no notes — left in case you want later
  const email = localStorage.getItem("emailBootcamp") || "";

  useEffect(() => {
    fetchAssignments();
    fetchSubmissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const axiosConfig = {
    headers: {
      "x-user-email": email,
    },
  };

  async function fetchAssignments() {
    try {
      const res = await axios.get(`${BASE}/my`, axiosConfig);
      setAssignments(res.data || []);
    } catch (err) {
      console.error("Error fetching assignments:", err);
      toast.error("Failed to load assignments");
    }
  }

  async function fetchSubmissions() {
    try {
      const res = await axios.get(`${BASE}/submissions/me`, axiosConfig);
      setSubmissions(res.data || []);
    } catch (err) {
      console.error("Error fetching submissions:", err);
      toast.error("Failed to load submissions");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedAssignmentId) {
      toast.error("Select an assignment");
      return;
    }
    if (!link.trim()) {
      toast.error("Please paste your project link");
      return;
    }

    try {
      const params = new URLSearchParams();
      params.append("assignment_id", String(selectedAssignmentId));
      params.append("submitted_link", link.trim());

      // POST as URL encoded query params (fast to integrate), or send JSON body
      await axios.post(
        `${BASE}/submit?assignment_id=${selectedAssignmentId}&submitted_link=${encodeURIComponent(link.trim())}`,
        {}, // empty body
        axiosConfig
      );

      toast.success("Submission uploaded");
      setLink("");
      setSelectedAssignmentId("");
      await fetchSubmissions();
    } catch (err) {
      console.error("Submit error:", err);
      toast.error("Submission failed");
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Assignments</h1>
          <p className="text-muted-foreground">Only assignments for your enrolled courses are shown.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Submit Assignment</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Select assignment</label>
                <Select
  value={selectedAssignmentId === "" ? "" : String(selectedAssignmentId)}
  onValueChange={(v) =>
    setSelectedAssignmentId(v === "" ? "" : Number(v))
  }
  disabled={assignments.length === 0} // disable if no assignments
>
  <SelectTrigger>
    <SelectValue placeholder={assignments.length === 0 ? "No assignments available" : "Choose assignment"} />
  </SelectTrigger>

  {assignments.length > 0 && (
    <SelectContent>
      {assignments.map((a) => (
        <SelectItem key={a.id} value={String(a.id)}>
          {a.title}
        </SelectItem>
      ))}
    </SelectContent>
  )}
</Select>

              </div>

              <div>
                <label className="text-sm font-medium">Project link</label>
                <Input value={link} onChange={(e) => setLink(e.target.value)} placeholder="https://github.com/your-repo or drive link" />
                <p className="text-xs text-muted-foreground mt-1">Provide a URL to your repository or deployed project.</p>
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="bg-gradient-to-r from-primary to-primary/80">Submit</Button>
                <Button variant="outline" type="button" onClick={() => { setLink(""); setSelectedAssignmentId(""); }}>Reset</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div>
          <h2 className="text-lg font-semibold">Your Submissions</h2>
          <div className="space-y-3 mt-4">
            {submissions.length === 0 ? (
              <p className="text-sm text-muted-foreground">No submissions yet.</p>
            ) : (
              submissions.map(s => (
                <Card key={s.id} className="hover:shadow-md">
                  <CardHeader>
                    <div className="flex justify-between">
                      <div>
                        <div className="font-medium">Assignment ID: {s.assignment_id}</div>
                        <div className="text-sm text-muted-foreground">
                          Submitted: {s.submitted_at ? new Date(s.submitted_at).toLocaleString() : "—"}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{s.grade || "Pending"}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <a href={s.submitted_link} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                      View submission
                    </a>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
