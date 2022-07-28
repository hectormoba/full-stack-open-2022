const Total = ({ parts }) => {
  console.log(parts);
  const sum = parts
    .map((element) => element.exercises)
    .reduce((previousValue, currentValue) => {
      return previousValue + currentValue;
    }, 0);

  return (
    <p>
      <em>total of {sum} excercices</em>
    </p>
  );
};

export default Total;
