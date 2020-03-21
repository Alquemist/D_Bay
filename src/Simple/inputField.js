import React, {useState} from 'react';
import '../Styles/FormStyles.css';

const InputField = (props) => { 

    const [InputStyle, updInputStyle] = useState('inputElement'); //dinamička stilizaciju u zavisnoti da li je komponenta valid/invalid

    return(
        <div style={{display: 'block', width: '100%', overflow: 'hidden',}}>
            <label style={{display: 'inline-block', width:'25%'}} className='inputLabel' htmlFor={props.id}>{props.label}</label>
            <input style={{width: '70%'}} className={InputStyle} onInvalid={()=>updInputStyle('inputElement-invalid')}
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