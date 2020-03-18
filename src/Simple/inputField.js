import React from 'react';

const InputField = (props) => {

    return(
        <div>
            <label htmlFor={props.id}>{props.label}</label>
            <input
                id={props.id}
                type={props.type}
                placeholder={props.placeholder? props.placeholder: props.label}
                required={props.required}
                onChange={(e)=>props.onInputChange(e, props.id)}
                pattern={props.pattern}>
            </input>
        </div>
    )
};

export default InputField;