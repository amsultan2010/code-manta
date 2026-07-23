import Link from "next/link";
import { courses } from "@/lib/curriculum";

export default function CoursesPage() {
  return (
    <main className="page">
      <p className="page-kicker">Courses</p>
      <h1 className="page-title">Bronze, Silver, Gold</h1>
      <p className="page-lede">
        Start with Bronze. Silver and Gold open later. You can browse everything, but
        the recommended order is surface to deep water.
      </p>

      <div className="course-list">
        {courses.map((course) => (
          <article key={course.id} className="course-card">
            <p className="badge">
              {course.status === "live" ? "Live" : "Coming soon"} · ~{course.estimatedHours} hr
            </p>
            <h2>{course.name}</h2>
            <p>{course.tagline}</p>
            <p>{course.win}</p>
            {course.status === "live" ? (
              <p style={{ marginTop: "1rem" }}>
                <Link href={`/courses/${course.id}`} className="btn btn-solid">
                  Open {course.name}
                </Link>
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </main>
  );
}
