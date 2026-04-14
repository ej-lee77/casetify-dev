import React from 'react'
import "../scss/input.scss"

export default function FormInput({inputType, label, required=null}) {
  return (
    <div className='input-div'>
        <input type={inputType} required={required !== null}/>
        <label>{label}</label>
        <span></span>
    </div>
  )
}
