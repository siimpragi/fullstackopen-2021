const Anecdote = ({ anecdote, votes }) => (
  <div>
    <p>{anecdote}</p>
    has {votes} votes
  </div>
);

export default Anecdote;
