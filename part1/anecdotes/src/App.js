import React, { useState } from 'react'

const Header = ({ title }) => (
  <h2>{title}</h2>
)

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Display = ({ anecdote, numOfVotes }) => (
  <>
  {anecdote}
  <div>has {numOfVotes} votes</div>
  </>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(7).fill(0))

  const randomize = () => {
    setSelected(Math.floor(Math.random() * 7))
  }

  const upvote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const mostVoted = Math.max(...votes)

  return (
    <div>
      <Header title = "Anecdote of the day"/>
      <Display anecdote = {anecdotes[selected]} numOfVotes = {votes[selected]}/>
      <Button handleClick = {upvote} text = "vote" />
      <Button handleClick = {randomize} text = "next anecdote" />
      <Header title = "Anecdote with most votes"/>
      <Display anecdote = {anecdotes[votes.indexOf(mostVoted)]} numOfVotes = {mostVoted} />
    </div>
  )
}

export default App