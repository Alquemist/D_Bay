import React, {useState} from 'react';
import InputField from '../Simple/inputField';

const CashierForm = () => {

    const defValues = {
        ime: undefined,
        prezime: undefined,
        addr: undefined,
        tel: undefined,
        email: undefined,
    };

    const [values, updValues] = useState(defValues);

    const onInputChange = (e, id) => {
        updValues({...values, [id]:e.target.value})
    };

    const formFields = [
        {id: 'ime', label: 'Ime', type: 'text', required: true, onChange: onInputChange},
        {id: 'prezime', label: 'Prezime', type: 'text', required: true, onChange: onInputChange},
        {id: 'addr', label: 'Adresa', type: 'text', placeholder: 'adresa', required: true, onChange: onInputChange},
        {id: 'tel', label: 'Br. telefona', type: 'tel', placeholder: '000 111 222', pattern: "[0-9]{3} [0-9]{3} [0-9]{3}", required: true, onChange: onInputChange},
        {id: 'email', label: 'Email', type: 'email', placeholder: 'email', required: true, onChange: onInputChange}
    ];


    const onFormSubmit = () => {
        alert(JSON.stringify(values))
    };

    return(
        <form onSubmit={(e)=>{onFormSubmit(); e.preventDefault()}}>
            {
                formFields.map(field => {return <InputField key={field.id} {...field} onInputChange={onInputChange}/>} )
            }
            <div>
                <input type="submit" value='Završi'/>
            </div>
        </form>
    )
};

export default CashierForm;