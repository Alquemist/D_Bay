import React, {useState} from 'react';
import InputField from '../Simple/inputField';
import '../Styles/FormStyles.css';

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
        {id: 'tel', label: 'Telefon', type: 'tel', placeholder: '000 111 222', pattern: "[0-9]{3} [0-9]{3} [0-9]{3}", required: true, onChange: onInputChange},
        {id: 'email', label: 'Email', type: 'email', placeholder: 'email', required: true, onChange: onInputChange}
    ];


    const onFormSubmit = () => {
        alert(JSON.stringify(values))
    };

    return(
        <>
        <form className='formParent' onSubmit={(e)=>{onFormSubmit(); e.preventDefault()}}>
            {
                formFields.map(field => {return <InputField key={field.id} {...field} onInputChange={onInputChange}/>} )
            }
            <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                <input className='formButton' style={{margin: '5px 5px 5px 0'}} type="submit" value='Završi'/>
            </div>
        </form>
        </>
    )
};

export default CashierForm;