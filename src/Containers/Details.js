import React, {useState} from 'react';
import '../Styles/Items.css';

const Details = (props) => {
    const item = {...props.item};
    const [kolicina, updKolicina] = useState(1);

    return (
        <div style={{float:'left'}}>
            <div style={{float:'left'}}>
                <h1 className='itemTitle'>{item.naziv}</h1>
            </div>
            <div style={{float:'right'}}>
                <p  className='itemDescript'>{`Cijena: ${item.cijena} KM`}</p>
            </div>
            <div>
                <img src={item.src} alt={item.naziv}  className="itemView"></img>
            </div>
            <div>
                <p className='itemDescript'>{item.opisi}</p>
            </div>
            <form onSubmit={()=>props.onAddItem(item.id, Number(kolicina))}>
                <label htmlFor='kolicina' style={{fontStyle: 'italic', fontWeight: 'bold'}}>Kolicina: </label>
                <input className='inputElement'
                    id='kolicina'
                    type='number'
                    value={kolicina}
                    onChange={(e)=> {e.target.value >= 1 && updKolicina(e.target.value)}}>
                </input> 
                <input className='formButton' id='kolicina' type="submit" value='Dodaj'/>
                <button className='formButton' onClick={()=>props.changeView(1)} style={{float: 'right'}}>{'Nazad X'}</button>
            </form>
            <div>
                <h1 className='itemDescript'>{`Ukupno za ${item.naziv}: ${kolicina*item.cijena} KM`}</h1>
            </div>
        </div>
    )
};

export default Details;