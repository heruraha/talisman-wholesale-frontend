import React from 'react'
import PropTypes from 'prop-types'
import Toggle from 'react-toggle'
import { Check, X } from 'react-feather'
import './Switch.scss'

const Switch = (props) => {  
  const inputWrapClass = `
    form-group  
    ${props.className && props.className}`;
  
    const ToggleBtn = <Toggle
      id={props.id}
      name={props.id}
      defaultChecked={props.defaultChecked}
      icons={false}
      onChange={props.onChange}
      disabled={props.disabled}
      />

      return (
        <div className={inputWrapClass}>
          {props.label ?
          <>
          <label htmlFor={props.id}>{props.label}</label>
          <div className="d-flex align-items-center">
            {ToggleBtn} {props.helpText && <small className="ml-2 label mb-0">{props.helpText}</small>}
          </div>
          </>
          :
          ToggleBtn
          }
          
        </div>
      );

}

Switch.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool
}
  
export default Switch;