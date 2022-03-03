const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        id: 1,
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        id: 2,
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        id: 3,
        name: "State of a component",
        exercises: 14,
      },
    ],
  };
  const { parts } = course;

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

const Header = ({ course }) => <h1>{course.name}</h1>;

const Content = ({ parts }) => (
  <div>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </div>
);

const Part = ({ part }) => {
  const { name, exercises } = part;
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((sum, p) => (sum += p.exercises), 0);
  return <p>Number of exercises {total}</p>;
};

export default App;
