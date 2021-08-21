import React, { useState } from 'react'

const Header = ({ title }) => (
    <h1>{title}</h1>
  )

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({ good, neutral, bad }) => {
  let total = good + neutral + bad
  const average = ((good * 1) + (bad * -1)) / total
  const positive = ((good / total) * 100 + " %")

  if (total > 0) {
    return (
      <div>
        <table>
          <tbody>
            <StatisticLine feedback = "good" num = {good}/>
            <StatisticLine feedback = "neutral" num = {neutral}/>
            <StatisticLine feedback = "bad" num = {bad}/>
            <StatisticLine feedback = "all" num = {total}/>
            <StatisticLine feedback = "average" num = {average}/>
            <StatisticLine feedback = "positive" num = {positive}/>
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div>
      <p>no feedback given</p>
    </div>
  )
}
  
const StatisticLine = ({ feedback, num }) => {
  return (
    <tr>
      <td>{feedback}</td>
      <td>{num}</td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const incrementGood = () => {
    setGood(good + 1)
  }

  const incrementNeutral = () => {
    setNeutral(neutral + 1)
  }

  const incrementBad = () => {
    setBad(bad + 1)
  }

    return (
      <div>
        <Header title = "give feedback"/>
        <Button handleClick = {incrementGood} text = "good" />
        <Button handleClick = {incrementNeutral} text = "neutral" />
        <Button handleClick = {incrementBad} text = "bad" />
        <Header title = "statistics"/>
        <Statistics good = {good} neutral = {neutral} bad = {bad}/>
      </div>
    )
  }
export default App