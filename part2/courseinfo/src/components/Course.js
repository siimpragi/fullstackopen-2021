import React from "react";
import Parts from "./Parts";

const Course = ({ course }) => {
  const { parts } = course;
  const total = parts.reduce((sum, p) => (sum += p.exercises), 0);

  return (
    <div>
      <h1>{course.name}</h1>
      <Parts parts={parts} />
      <strong>total of {total} exercises</strong>
    </div>
  );
};

export default Course;
