const API_URL=import.meta.env.VITE_API_URL
export async function fetchCourses() {
    try {
      const response = await fetch(`${API_URL}/courses/`);
      if (!response.ok) throw new Error("Failed to fetch courses");
      return await response.json();
    } catch (error) {
      console.error("Error fetching courses:", error);
      throw error;
    }
  }
  



export const fetchCourseById = async (id: number) => {
  const res = await fetch(`${API_URL}/courses/${id}`);
  if (!res.ok) throw new Error("Failed to fetch course");
  return res.json();
};
