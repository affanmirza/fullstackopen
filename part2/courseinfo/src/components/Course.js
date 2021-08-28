import React from 'react'

const Course = ({ course }) => {
  return(
    <>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course} />
    </>
  )
}
  
const Header = ({ course }) => {
  return (
    <h2>{course.name}</h2>
  )
}
  
const Total = ({ course }) => {
  const partArray = course.parts
  const exerciseNums = partArray.map(x => x.exercises)
  const reducer = (a,b) => a + b
  const sum = exerciseNums.reduce(reducer, 0)
  return(
    <p><b>total of {sum} exercises</b></p>
  ) 
}
  
const Part = ({ part }) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}
  
const Content = ({ course }) => {
  const partArray = course.parts
  return (
    <div>
      {partArray.map(element => <Part key= {element.id} part={element}/>)}
    </div>
  )
}

export default Course