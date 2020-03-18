import React, {useState} from 'react';

const Basket = (props) => {

    const [details, setDetails] = useState(0)

    const [brojArtikala, ukupnaCijena] = 
        props.korpa.length?
        (() => {
        let [brojArtikala, ukupnaCijena] = [0, 0];
        for (const item of props.korpa) {
            brojArtikala += item.kolicina
            ukupnaCijena += item.kolicina * (props.items[item.id].cijena)
        };
        console.log(brojArtikala, ukupnaCijena)
        return [brojArtikala, ukupnaCijena];
    })()
    :[0,0];

    const BasketWidget = (props) => {
        return(
            <div>
                <p>{`Vaša korpa:  Artikala: ${props.brojArtikala}  Ukupno: ${props.ukupnaCijena} KM`}</p>
                <form onSubmit={()=>props.setDetails(1)}>
                    <label htmlFor='detalji'>Detaljno: </label>
                    <div>
                        <input id='detalji' type="submit" value='>>>'/>
                    </div>
                    {/* <button id='detalji' onClick={()=>setDetails(1)}>>></button> */}
                </form>
            </div>
        )
    };
    
    const BasketDetails = (props) => {
        return(
            <table>
                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Količina</th>
                        <th>Cijena</th>
                        <th>Ukloni</th>
                    </tr>
                </thead>
                <tbody>
                    {props.korpa.map((art, idx) => {
                        const item = props.items[art.id];
                        console.log(item)
                        return (
                            <tr key={art.id}>
                                <td>{item.naziv}</td>
                                <td>
                                    <input
                                        value={art.kolicina}
                                        disabled={props.disabled}
                                        onChange={(e)=>{
                                            const korpa = [...props.korpa]
                                            korpa[idx] = {id: art.id, kolicina: e.target.value};
                                            props.updKorpa(korpa)
                                        }}
                                    />
                                </td>
                                <td>{item.cijena*art.kolicina}</td>
                                <td>
                                    <button 
                                        disabled={props.disabled}
                                        onClick={()=>{
                                            props.updKorpa((oldVal)=>{
                                                oldVal.splice(idx, 1)
                                                return [...oldVal]
                                            })
                                    }}>X</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    };

    return(
        <>
        {
        details?
        <>
        <BasketDetails items={props.items} korpa={props.korpa} updKorpa={props.updKorpa} disabled={props.view===3}/>:
        {
        props.view!==3?
        <div>
            <label htmlFor='naKasu'>{`Ukupno ${ukupnaCijena} KM `}</label>
            <button id='naKasu' onClick={()=>props.changeView(3)}>Na Kasu >></button>
        </div>
        :null
        }
        </>
        : <BasketWidget brojArtikala={brojArtikala} ukupnaCijena={ukupnaCijena} setDetails={setDetails}/>
        }
        </>
    )
};


export default Basket;