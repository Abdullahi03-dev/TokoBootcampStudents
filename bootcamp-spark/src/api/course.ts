export async function fetchCourses() {
    try {
      const response = await fetch("http://localhost:8000/courses/");
      if (!response.ok) throw new Error("Failed to fetch courses");
      return await response.json();
    } catch (error) {
      console.error("Error fetching courses:", error);
      throw error;
    }
  }
  



export const fetchCourseById = async (id: number) => {
  const res = await fetch(`http://localhost:8000/courses/${id}`);
  if (!res.ok) throw new Error("Failed to fetch course");
  return res.json();
};
