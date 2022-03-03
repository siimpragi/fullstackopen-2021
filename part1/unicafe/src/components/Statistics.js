import StatisticLine from "./StatisticLine";

const Statistics = ({ good, neutral, bad }) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return <p>no feedback given</p>;
  }

  const all = good + neutral + bad;
  const average = (good * 1 + neutral * 0 + bad * -1) / all;
  const positive = (good / all) * 100;

  const statistics = [
    { id: 1, text: "good", value: good },
    { id: 2, text: "neutral", value: neutral },
    { id: 3, text: "bad", value: bad },
    { id: 4, text: "all", value: all },
    { id: 5, text: "average", value: average.toPrecision(2) },
    { id: 6, text: "positive", value: positive.toPrecision(2) + "%" },
  ];

  return (
    <table>
      <tbody>
        {statistics.map((s) => (
          <StatisticLine key={s.id} text={s.text} value={s.value} />
        ))}
      </tbody>
    </table>
  );
};

export default Statistics;
