import React from "react";

const Parts = ({ parts }) => (
  <ul>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </ul>
);

const Part = ({ part }) => {
  const { name, exercises } = part;

  return (
    <li>
      {name} {exercises}
    </li>
  );
};

export default Parts;
