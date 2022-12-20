import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [votes, setVotes] = useState({0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0})
  const [selected, setSelected] = useState(0)

  const randomAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const voteForAnecdote = () => {
    const _votes = {...votes}
    _votes[selected] = _votes[selected] + 1
    setVotes(_votes)
  }

  return (
    <div>
      <h3>Anecdote of the day</h3>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={randomAnecdote}>random anecdote</button>
      <button onClick={voteForAnecdote}>vote</button>
      <h3>Anecdote with most votes</h3>
      <p>{anecdotes[Object.keys(votes).reduce((a, b) => votes[a] > votes[b] ? a : b)]}</p>
      <p>has {votes[Object.keys(votes).reduce((a, b) => votes[a] > votes[b] ? a : b)]} votes</p>

    </div>
  )
}

export default App