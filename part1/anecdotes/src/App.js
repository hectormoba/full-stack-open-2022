import { useState, useEffect } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState(new Uint8Array(anecdotes.length));
  const [mostVotes, setMostVotes] = useState(0);

  const randomSelection = () => {
    const max = anecdotes.length - 1;
    const min = 0;

    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  useEffect(() => {
    let copiedArray = [...vote];
    let mostVoted = copiedArray.sort((a, z) => z - a)[0];
    let index = vote.indexOf(mostVoted);

    setMostVotes(index);
  }, [vote]);

  const handleClickRandom = () => setSelected(randomSelection());

  const handleClickVote = () => {
    let newArray = [...vote];
    newArray[selected] += 1;
    setVote(newArray);
  };

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {vote[selected]} vote/s</p>
      <button onClick={handleClickRandom}>Random anecdote</button>
      <button onClick={handleClickVote}>vote</button>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[mostVotes]}</p>
      <p>has {vote[mostVotes]} vote/s</p>
    </div>
  );
};

export default App;
