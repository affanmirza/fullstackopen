import React from 'react'

const PersonsForm = (props) =>
<form onSubmit = {props.onSubmit}>
  <div>name: <input value = {props.valueName} onChange = {props.onChangeName}/></div>
  <div>number: <input value = {props.valueNumber} onChange = {props.onChangeNumber}/></div>
  <div> <button type="submit">add</button> </div>
</form>

export default PersonsForm;