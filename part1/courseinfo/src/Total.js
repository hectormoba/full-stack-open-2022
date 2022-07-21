const Total = ({ content }) => {
  const total = content
    .map((element) => element.excercises)
    .reduce((previousValue, currentValue) => {
      return previousValue + currentValue;
    }, 0);

  return <p>Number of excercises {total}</p>;
};

export default Total;
