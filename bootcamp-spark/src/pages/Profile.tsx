// import DashboardLayout from "@/components/DashboardLayout";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Camera, Mail, User, Calendar, Award } from "lucide-react";
// import { toast } from "sonner";

// const Profile = () => {
//   const handleSave = () => {
//     toast.success("Profile updated successfully!");
//   };

//   const stats = [
//     { label: "Courses Enrolled", value: "3", icon: Award },
//     { label: "Assignments Completed", value: "12", icon: Calendar },
//     { label: "Certificates Earned", value: "1", icon: Award },
//   ];

//   return (
//     <DashboardLayout>
//       <div className="space-y-6">
//         <div>
//           <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
//           <p className="text-muted-foreground">
//             Manage your account information and preferences
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-6">
//           {/* Profile Overview */}
//           <Card className="lg:col-span-1">
//             <CardHeader className="text-center">
//               <div className="relative mx-auto mb-4">
//                 <Avatar className="h-32 w-32">
//                   <AvatarImage src="" alt="Profile" />
//                   <AvatarFallback className="bg-primary text-primary-foreground text-3xl">
//                     AB
//                   </AvatarFallback>
//                 </Avatar>
//                 <Button
//                   size="icon"
//                   className="absolute bottom-0 right-0 rounded-full h-10 w-10"
//                 >
//                   <Camera className="h-5 w-5" />
//                 </Button>
//               </div>
//               <CardTitle>Abdullahi</CardTitle>
//               <CardDescription>Student • Member since March 2024</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-3">
//               {stats.map((stat) => (
//                 <div
//                   key={stat.label}
//                   className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
//                 >
//                   <div className="flex items-center gap-3">
//                     <stat.icon className="h-5 w-5 text-primary" />
//                     <span className="text-sm text-muted-foreground">{stat.label}</span>
//                   </div>
//                   <Badge variant="secondary" className="text-base font-semibold">
//                     {stat.value}
//                   </Badge>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>

//           {/* Profile Form */}
//           <Card className="lg:col-span-2">
//             <CardHeader>
//               <CardTitle>Personal Information</CardTitle>
//               <CardDescription>Update your personal details</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <form className="space-y-6">
//                 <div className="grid sm:grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="firstName">First Name</Label>
//                     <Input id="firstName" defaultValue="Abdullahi" />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="lastName">Last Name</Label>
//                     <Input id="lastName" defaultValue="" placeholder="Enter last name" />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="email">Email Address</Label>
//                   <div className="relative">
//                     <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                     <Input
//                       id="email"
//                       type="email"
//                       defaultValue="abdullahi@example.com"
//                       className="pl-10"
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="username">Username</Label>
//                   <div className="relative">
//                     <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                     <Input
//                       id="username"
//                       defaultValue="abdullahi_dev"
//                       className="pl-10"
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="bio">Bio</Label>
//                   <textarea
//                     id="bio"
//                     className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
//                     placeholder="Tell us about yourself..."
//                     defaultValue="Passionate learner exploring web development and modern technologies."
//                   />
//                 </div>

//                 <div className="flex gap-3">
//                   <Button
//                     type="button"
//                     onClick={handleSave}
//                     className="bg-gradient-to-r from-primary to-primary/80"
//                   >
//                     Save Changes
//                   </Button>
//                   <Button type="button" variant="outline">
//                     Cancel
//                   </Button>
//                 </div>
//               </form>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Change Password Section */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Change Password</CardTitle>
//             <CardDescription>Keep your account secure</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <form className="space-y-4 max-w-md">
//               <div className="space-y-2">
//                 <Label htmlFor="currentPassword">Current Password</Label>
//                 <Input id="currentPassword" type="password" />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="newPassword">New Password</Label>
//                 <Input id="newPassword" type="password" />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="confirmPassword">Confirm New Password</Label>
//                 <Input id="confirmPassword" type="password" />
//               </div>
//               <Button type="button" onClick={() => toast.success("Password updated!")}>
//                 Update Password
//               </Button>
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     </DashboardLayout>
//   );
// };

// export default Profile;




// import { useEffect, useState } from "react";
// import DashboardLayout from "@/components/DashboardLayout";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { toast } from "sonner";

// const Profile = () => {
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState({
//     name: "",
//     email: "",
//     role: "",
//     created_at: "",
//   });
//   const [passwords, setPasswords] = useState({
//     current: "",
//     new: "",
//     confirm: "",
//   });

//   // ---------------- Fetch User Profile ----------------
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await fetch("http://localhost:8000/auth/profile", {
//           credentials: "include",
//         });
//         if (!res.ok) throw new Error("Failed to fetch profile");
//         const data = await res.json();
//         setUser(data);
//       } catch {
//         toast.error("Unable to fetch profile.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProfile();
//   }, []);

//   // ---------------- Update Profile ----------------
//   const handleSave = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("name", user.name);
//       formData.append("email", user.email);

//       const res = await fetch("http://localhost:8000/auth/update-profile", {
//         method: "PUT",
//         body: formData,
//         credentials: "include",
//       });

//       if (!res.ok) throw new Error();
//       toast.success("Profile updated successfully!");
//     } catch {
//       toast.error("Failed to update profile.");
//     }
//   };

//   // ---------------- Update Password ----------------
//   const handlePasswordChange = async () => {
//     if (passwords.new !== passwords.confirm) {
//       toast.error("Passwords do not match!");
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append("current_password", passwords.current);
//       formData.append("new_password", passwords.new);

//       const res = await fetch("http://localhost:8000/auth/update-password", {
//         method: "PUT",
//         body: formData,
//         credentials: "include",
//       });

//       if (!res.ok) throw new Error();
//       toast.success("Password updated successfully!");
//       setPasswords({ current: "", new: "", confirm: "" });
//     } catch {
//       toast.error("Failed to update password.");
//     }
//   };

//   if (loading) return <div className="text-center py-10">Loading profile...</div>;

//   return (
//     <DashboardLayout>
//       <div className="space-y-6">
//         <div>
//           <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
//           <p className="text-muted-foreground">Manage your personal details</p>
//         </div>

//         {/* Profile Info */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Personal Information</CardTitle>
//             <CardDescription>Update your name or email</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="flex items-center gap-4 mb-6">
//               <Avatar className="h-16 w-16">
//                 <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
//               </Avatar>
//               <div>
//                 <h2 className="text-xl font-semibold">{user.name}</h2>
//                 <p className="text-sm text-muted-foreground capitalize">{user.role}</p>
//                 <p className="text-xs text-muted-foreground">
//                   Joined {new Date(user.created_at).toLocaleDateString()}
//                 </p>
//               </div>
//             </div>

//             <div className="space-y-4 max-w-md">
//               <div className="space-y-2">
//                 <Label>Name</Label>
//                 <Input
//                   value={user.name}
//                   onChange={(e) => setUser({ ...user, name: e.target.value })}
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label>Email</Label>
//                 <Input
//                   value={user.email}
//                   onChange={(e) => setUser({ ...user, email: e.target.value })}
//                 />
//               </div>

//               <Button onClick={handleSave}>Save Changes</Button>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Change Password */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Change Password</CardTitle>
//             <CardDescription>Keep your account secure</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-3 max-w-md">
//               <div className="space-y-2">
//                 <Label>Current Password</Label>
//                 <Input
//                   type="password"
//                   value={passwords.current}
//                   onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label>New Password</Label>
//                 <Input
//                   type="password"
//                   value={passwords.new}
//                   onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label>Confirm New Password</Label>
//                 <Input
//                   type="password"
//                   value={passwords.confirm}
//                   onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
//                 />
//               </div>
//               <Button onClick={handlePasswordChange}>Update Password</Button>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </DashboardLayout>
//   );
// };

// export default Profile;



import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Mail, User, Lock } from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const email = localStorage.getItem("emailBootcamp"); // 👈 Email stored after login

  // Fetch user info
  useEffect(() => {
    if (!email) {
      toast.error("No user email found in localStorage");
      return;
    }

    axios
      .get(`http://localhost:8000/auth/profile/${email}`)
      .then((res) => {
        setUser(res.data);
        setName(res.data.name);
      })
      .catch(() => {
        toast.error("Failed to load profile");
      });
  }, [email]);

  // Save changes (Update name)
  const handleSave = async () => {
    if (!email) return toast.error("Email not found");

    const formData = new FormData();
    formData.append("email", email);
    formData.append("name", name);

    try {
      const res = await axios.put("http://localhost:8000/auth/profile/update", formData);
      toast.success(res.data.msg);
    } catch (err) {
      toast.error("Error updating profile");
    }
  };

  // Change password
  const handleChangePassword = async () => {
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    const formData = new FormData();
    formData.append("email", email!);
    formData.append("password", password);

    try {
      const res = await axios.put("http://localhost:8000/auth/profile/update", formData);
      toast.success(res.data.msg);
      setPassword("");
      setConfirmPassword("");
    } catch {
      toast.error("Error updating password");
    }
  };

  if (!user) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-[60vh]">
          <p className="text-muted-foreground text-lg">Loading profile...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
          <p className="text-muted-foreground">
            Manage your account information and preferences
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Overview */}
          <Card className="lg:col-span-1 text-center">
            <CardHeader>
              <Avatar className="h-32 w-32 mx-auto mb-4">
                <AvatarImage src="" alt={user.name} />
                <AvatarFallback className="bg-primary text-primary-foreground text-3xl">
                  {user.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <CardTitle>{user.name}</CardTitle>
              <CardDescription>{user.role?.toUpperCase()} • Joined {new Date(user.created_at).toLocaleDateString()}</CardDescription>
            </CardHeader>
          </Card>

          {/* Profile Update Form */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      className="pl-10"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      className="pl-10"
                      value={user.email}
                      disabled
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button type="button" onClick={handleSave}>
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Change Password */}
        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>Keep your account secure</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4 max-w-md">
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="newPassword"
                    type="password"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    className="pl-10"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>

              <Button type="button" onClick={handleChangePassword}>
                Update Password
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
