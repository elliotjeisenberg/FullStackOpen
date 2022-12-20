import React from 'react'
import { useState } from 'react'

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>
}

const StatisticsLine = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)


const Statistics = ({good, neutral, bad}) => {
  if (good || neutral || bad) {
    return (
      <div>
        <h2>Statistics</h2>
        <table>
          <StatisticsLine text='good' value={good}/>
          <StatisticsLine text='neutral' value={neutral}/>
          <StatisticsLine text='bad' value={bad}/>
          <StatisticsLine text='all' value={good + neutral + bad}/>
          <StatisticsLine text='average' value={(good - bad)/(good + neutral + bad)}/>
          <StatisticsLine text='positive' value={good / (good + neutral + bad)}/>
        </table>
      </div>
    )
  } else {
    return (
      <div>
        <h2>Statistics</h2>
        <p>You have no statistics to show</p>
      </div>
    ) 
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const plusGood = () => setGood(good + 1)
  const plusNeutral = () => setNeutral(neutral + 1)
  const plusBad = () => setBad(bad + 1)

  return (
    <div>
      <h2>Give Feedback</h2>
      <div>
        <Button handleClick={plusGood} text='good' />
        <Button handleClick={plusNeutral} text='neutral' />
        <Button handleClick={plusBad} text='bad' />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App