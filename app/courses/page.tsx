import { redirect } from "next/navigation";

/** Marketing “Courses” lives on the landing page section. */
export default function CoursesIndexRedirect() {
  redirect("/#progression");
}
