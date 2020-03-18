import React, {useState} from 'react';

const Details = (props) => {
    const item = {...props.item}
    const [kolicina, updKolicina] = useState(1);

    return (
        <div>
            <div>
                <h1>{item.naziv}</h1>
                <h1>{`Cijena: ${item.cijena} KM`}</h1>
            </div>
            <div>
                <img src={item.src} alt={item.naziv} className="ItemView"></img>
            </div>
            <div>
                <p>{item.opisi}</p>
            </div>
            <form onSubmit={()=>props.onAddItem(item.id, Number(kolicina))}>
                <label htmlFor='kolicina'>Kolicina: </label>
                <input id='kolicina' type='number' value={kolicina} onChange={(e)=> {e.target.value >= 1 && updKolicina(e.target.value)}}></input> {/*min attr nije dovoljan*/}
                <input id='kolicina' type="submit" value='Dodaj'/>
                {/* <button onClick={()=>props.onAddItem(item.id, Number(kolicina))}>Dodaj i završi</button> */}
            </form>
            <div>
                <h1>{`Ukupno za ${item.naziv}: ${kolicina*item.cijena} KM`}</h1>
            </div>
        </div>
    )
};

export default Details;