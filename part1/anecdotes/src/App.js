import { useState } from "react";
import Anecdote from "./components/Anecdote";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState({ 0: 0 });

  const selectRandom = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  };

  const voteFor = (index) => {
    const updatedPoints = { ...points };
    if (updatedPoints[index] === undefined) {
      updatedPoints[index] = 0;
    }
    updatedPoints[index] += 1;
    setPoints(updatedPoints);
  };

  const leaderboard = Object.entries(points)
    .sort(([_i1, v1], [_i2, v2]) => v2 - v1)
    .map(([i, _v]) => i);

  return (
    <div>
      <h1>anecdote of the day</h1>
      <Anecdote
        anecdote={anecdotes[selected]}
        votes={points[selected] ? points[selected] : 0}
      />
      <button onClick={() => voteFor(selected)}>vote</button>
      <button onClick={selectRandom}>next anecdote</button>

      <h2>anecdote with most votes</h2>
      <Anecdote
        anecdote={anecdotes[leaderboard[0]]}
        votes={points[leaderboard[0]]}
      />
    </div>
  );
};

export default App;
