import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        part: "Fundamentals of React",
        excercises: 10,
      },
      {
        part: "Using props to pass data",
        excercises: 7,
      },
      {
        part: "State of a component",
        excercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content content={course.parts} />
      <Total content={course.parts} />
    </div>
  );
};

export default App;
