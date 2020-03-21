import React, {useState} from 'react';
import InputField from '../Simple/inputField';
import '../Styles/FormStyles.css';

const CashierForm = (props) => {

    const defValues = {  //u konkretnom primjeru može i bez ovoga ali inače je bolje imati inicijalizovane ključeve
        ime: undefined,
        prezime: undefined,
        addr: undefined,
        tel: undefined,
        email: undefined,
    };

    const [values, updValues] = useState(defValues); //Vrijednosti polja u formi se čuvaju u "values"

    const onInputChange = (e, id) => { //CallBack koji se poziva onChange u input polju
        updValues({...values, [id]:e.target.value})
    };

    const formFields = [  //Atributi svih komponenti u formi
        {id: 'ime', label: 'Ime', type: 'text', required: true, onChange: onInputChange},
        {id: 'prezime', label: 'Prezime', type: 'text', required: true, onChange: onInputChange},
        {id: 'addr', label: 'Adresa', type: 'text', placeholder: 'adresa', required: true, onChange: onInputChange},
        {id: 'tel', label: 'Telefon', type: 'tel', placeholder: '000 111 222', pattern: "[0-9]{3} [0-9]{3} [0-9]{3}", required: true, onChange: onInputChange},
        {id: 'email', label: 'Email', type: 'email', placeholder: 'email', required: true, onChange: onInputChange}
    ];


    const onFormSubmit = () => { //Ovde bi tipično išao neki axios upit ili slično
        alert(JSON.stringify(values));
        props.changeView(1);
    };

    return(
        <>
        <form className='formParent' onSubmit={(e)=>{onFormSubmit(); e.preventDefault()}}>  {/* preventDefault je karakterističan za react */}
            {
                formFields.map(field => {return <InputField key={field.id} {...field} onInputChange={onInputChange}/>}) //generisanje forme 
            }
            <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                <input className='formButton' style={{margin: '5px 5px 5px 0'}} type="submit" value='Završi'/>
            </div>
        </form>
        </>
    )
};

export default CashierForm;