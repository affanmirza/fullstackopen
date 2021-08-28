import React from 'react'
import Person from './Person'

const Persons = ({array, onClick}) =>
<div>
  {array.map(
  (person) => <Person key={person.id} name = {person.name} number={person.number} onClick={() => onClick(person.id)}/>
  )}
</div>

export default Persons;