// import { useEffect, useState } from "react";
// import axios from "axios";
// import DashboardLayout from "@/components/DashboardLayout";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Bell, Calendar, AlertCircle, CheckCircle } from "lucide-react";

// // 🧾 Announcement Type
// interface Announcement {
//   id: number;
//   title: string;
//   description: string;
//   link?: string;
//   date: string;
//   type?: string; // optional, can be added dynamically
//   priority?: "low" | "medium" | "high";
// }

// const Announcements = () => {
//   const [announcements, setAnnouncements] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchAnnouncements();
//   }, []);

//   const fetchAnnouncements = async () => {
//     try {
//       const res = await axios.get<Announcement[]>("http://localhost:8000/announcements"); // update to your backend URL
//       const data = res.data.map((item) => ({
//         ...item,
//         type: "update", // default type; can be adjusted if you have type in DB
//         priority: "low", // default priority; adjust if you store it in DB
//         date: new Date(item.date).toLocaleDateString("en-US", {
//           month: "long",
//           day: "numeric",
//           year: "numeric",
//         }),
//       }));
//       setAnnouncements(data);
//     } catch (error) {
//       console.error("Failed to fetch announcements:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getTypeIcon = (type?: string) => {
//     switch (type) {
//       case "important":
//         return <AlertCircle className="h-5 w-5 text-destructive" />;
//       case "event":
//         return <Calendar className="h-5 w-5 text-info" />;
//       case "celebration":
//         return <CheckCircle className="h-5 w-5 text-accent" />;
//       default:
//         return <Bell className="h-5 w-5 text-primary" />;
//     }
//   };

//   const getPriorityBadge = (priority?: string) => {
//     switch (priority) {
//       case "high":
//         return <Badge className="bg-destructive text-destructive-foreground">High Priority</Badge>;
//       case "medium":
//         return <Badge className="bg-warning text-white">Medium Priority</Badge>;
//       default:
//         return <Badge variant="secondary">Info</Badge>;
//     }
//   };

//   if (loading) {
//     return (
//       <DashboardLayout>
//         <div className="text-center py-10 text-muted-foreground">Loading announcements...</div>
//       </DashboardLayout>
//     );
//   }

//   return (
//     <DashboardLayout>
//       <div className="space-y-6">
//         {/* Page Header */}
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold mb-2">Announcements</h1>
//             <p className="text-muted-foreground">Stay updated with the latest news and updates</p>
//           </div>
//           <Badge className="text-lg px-4 py-2 bg-primary text-primary-foreground">
//             {announcements.length} Total
//           </Badge>
//         </div>

//         {/* Announcements List */}
//         <div className="space-y-4">
//           {announcements.map((announcement) => (
//             <Card
//               key={announcement.id}
//               className="hover:shadow-lg transition-all duration-300 border-l-4"
//               style={{
//                 borderLeftColor:
//                   announcement.priority === "high"
//                     ? "hsl(var(--destructive))"
//                     : announcement.priority === "medium"
//                     ? "hsl(var(--warning))"
//                     : "hsl(var(--border))",
//               }}
//             >
//               <CardHeader>
//                 <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
//                   <div className="flex-1">
//                     <div className="flex items-start gap-3 mb-2">
//                       {getTypeIcon(announcement.type)}
//                       <CardTitle className="text-xl">{announcement.title}</CardTitle>
//                     </div>
//                     <CardDescription className="flex items-center gap-2">
//                       <Calendar className="h-4 w-4" />
//                       {announcement.date}
//                     </CardDescription>
//                   </div>
//                   {getPriorityBadge(announcement.priority)}
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-muted-foreground leading-relaxed">{announcement.description}</p>
//                 {announcement.link && (
//                   <a
//                     href={announcement.link}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-500 underline mt-2 inline-block"
//                   >
//                     Learn More
//                   </a>
//                 )}
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// };

// export default Announcements;





import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Calendar, AlertCircle, CheckCircle } from "lucide-react";

interface Announcement {
  id: number;
  title: string;
  description: string;
  link?: string;
  date: string;
  course_id: number;
}

const Announcements = () => {
  const API_URL=import.meta.env.VITE_API_URL
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const email = localStorage.getItem("emailBootcamp");
        if (!email) return;

        const res = await axios.get(`${API_URL}/announcements/user/${email}`);
        const data = res.data.map((item: any) => ({
          ...item,
          date: new Date(item.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
        }));
        setAnnouncements(data);
      } catch (error) {
        console.error("Failed to fetch announcements:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-center py-10 text-muted-foreground">Loading announcements...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Announcements</h1>
            <p className="text-muted-foreground">Stay updated with your enrolled courses</p>
          </div>
          <Badge className="text-lg px-4 py-2 bg-primary text-primary-foreground">
            {announcements.length} Total
          </Badge>
        </div>

        <div className="space-y-4">
          {announcements.map((announcement) => (
            <Card
              key={announcement.id}
              className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary"
            >
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-2">
                      <Bell className="h-5 w-5 text-primary" />
                      <CardTitle className="text-xl">{announcement.title}</CardTitle>
                    </div>
                    <CardDescription className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {announcement.date}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{announcement.description}</p>
                {announcement.link && (
                  <a
                    href={announcement.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline mt-2 inline-block"
                  >
                    Learn More
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Announcements;
