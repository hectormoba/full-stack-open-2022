const Part = ({ element }) => {
  const { part, excercises } = element;

  return (
    <p>
      {part} {excercises}
    </p>
  );
};

export default Part;
