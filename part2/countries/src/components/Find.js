import React from "react"

const Find = (props) =>
  <form>
    {props.text} <input value = {props.value} onChange = {props.onChange}/>
  </form>

export default Find;