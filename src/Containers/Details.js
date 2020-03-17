import React from 'react';

const details = (item) => {
    console.log(item.kolicina, item.cijena);
    const kolicina = 1;
    return (
        <div>
            <div>
                <h1>{item.naziv}</h1>
                <h1>{`Cijena: ${item.cijena}`}</h1>
            </div>
            <div>
                <img src={item.src} alt={item.naziv} className="ItemView"></img>
            </div>
            <div>
                <p>{item.opisi}</p>
            </div>
            <div>
                <p>Kolicina:</p>
                <input type={'number'} defaultValue={1}></input>
                <button onClick={()=>console.log('dodajem u korpu')}>Dodaj u korpu</button>
            </div>
            <div>
                <h1>{`Ukupno za ${item.naziv}: ${kolicina*item.cijena}`}</h1>
            </div>
        </div>
    )
};

export default details;