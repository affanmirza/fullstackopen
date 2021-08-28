import React from 'react'

const Filter = (props) =>
<form>
  {props.text} <input value = {props.value} onChange = {props.onChange}/>
</form>

export default Filter;