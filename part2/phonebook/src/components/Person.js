import React from 'react'


const Person = (props) =>
  <div>
    {props.name} {props.number}
    <button onClick={props.onClick}>
    delete
  </button>
  </div>

export default Person;