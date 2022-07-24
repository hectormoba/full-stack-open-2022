import StatisticLine from "./StatisticLine";

export default function Statistics({ good, bad, neutral }) {
  let all = good + bad + neutral;

  const calculateAverage = () => {
    return neutral === all ? "0" : (good + bad * -1) / (all - neutral);
  };

  const positiveFeedback = () => {
    return `${(good / all) * 100}%`;
  };

  return (
    <div>
      {all === 0 ? (
        <p>No feedback</p>
      ) : (
        <>
          <h2>statistics</h2>
          <table>
            <tbody>
              <StatisticLine text="good" value={good} />
              <StatisticLine text="neutral" value={neutral} />
              <StatisticLine text="bad" value={bad} />
              <StatisticLine text="all" value={all} />
              <StatisticLine text="average" value={calculateAverage()} />
              <StatisticLine
                text="positive feedback"
                value={positiveFeedback()}
              />
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
