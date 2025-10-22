// import axios from "axios";
// const API_BASE = "http://127.0.0.1:8000/enrollments";
// export const enrollCourse = async (email: string, courseId: number) => {
//   try {
//     const response = await axios.post("http://localhost:8000/enrollments/", {
//       user_email: email,
//       course_id: courseId,
//     });
//     return response.data;
//   } catch (error: any) {
//     return { status: "error", message: error.message || "Enrollment failed" };
//   }
// };





// export async function getUserEnrolledCourse(email: string) {
//   const res = await fetch(`http://localhost:8000/enrollments/user/${email}`);
//   if (!res.ok) throw new Error("User not enrolled in any course");
//   return res.json();
// }


// export const getCompletedLessons = async (email: string) => {
//   const res = await axios.get(`${API_BASE}/completed_lessons/${encodeURIComponent(email)}`);
//   return res.data; // [{ submodule_id: 1 }, ...]
// };

// export const toggleCompletedLesson = async (email: string, submoduleId: number) => {
//   const res = await axios.post(`${API_BASE}/complete_lesson`, {
//     user_email: email,
//     submodule_id: submoduleId,
//   });
//   return res.data; // { status: "added"|"removed", submodule_id }
// };

// export const markEnrollmentComplete = async (email: string) => {
//   const res = await axios.put(`${API_BASE}/update-status/${encodeURIComponent(email)}`);
//   return res.data;
// };



import axios from "axios";
const API_BASE = "http://127.0.0.1:8000/enrollments";

export const enrollCourse = async (email: string, courseId: number) => {
  const res = await axios.post(`${API_BASE}/`, {
    user_email: email,
    course_id: courseId,
  });
  return res.data;
};

export const getUserEnrolledCourse = async (email: string) => {
  const res = await axios.get(`${API_BASE}/user/${email}`);
  return res.data;
};

// export const getCompletedLessons = async (email: string) => {
//   const res = await axios.get(`${API_BASE}/completed_lessons/${email}`);
//   return res.data; // [{ submodule_id }]
// };

export const completeLesson = async (email: string, submoduleId: number) => {
  const res = await axios.post(`${API_BASE}/complete_lesson`, {
    user_email: email,
    submodule_id: submoduleId,
  });
  return res.data; // { status: "added" }
};

export const getCompletedLessons = async (email: string, courseId?: number) => {
  try {
    const res = await axios.get(`${API_BASE}/completed_lessons/${email}`);
    return res.data; // [{ submodule_id }]
  } catch (error: any) {
    console.error("❌ Failed to fetch completed lessons:", error);
    throw error;
  }
};



// =======================================================
// 4️⃣ MARK A COURSE AS COMPLETED (after reaching 100%)
// =======================================================
export const markEnrollmentComplete = async (email: string, courseId?: number) => {
  try {
    const res = await axios.put(`${API_BASE}/update-status/${email}`);
    return res.data; // { status: "success", message: "Course marked as completed" }
  } catch (error: any) {
    console.error("❌ Failed to mark course complete:", error);
    throw error;
  }
};

export async function checkEnrollmentStatus(email: string) {
  const res = await fetch(`http://localhost:8000/enrollments/check/${email}`);
  if (!res.ok) throw new Error("Failed to check enrollment status");
  return res.json();
}




export const clearCompletedLessons = async (email: string) => {
  const res = await axios.delete(`/enrollments/clear_completed/${email}`);
  return res.data;
};
