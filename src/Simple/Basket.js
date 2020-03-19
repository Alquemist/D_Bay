import React, {useState} from 'react';
import '../Styles/Basket.css';

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
                <p className='basketTitle'><span style={{fontWeight: 'bold'}}>Vaša korpa:  </span>{`Artikala: ${props.brojArtikala}  Ukupno: ${props.ukupnaCijena} KM`}</p>
                <button className='basketButton' onClick={()=>setDetails(1)}>Detalji ></button>
                {
                    props.naKasu
                }
            </div>
        )
    };
    
    const BasketDetails = (props) => {
        return(
            <>
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
                        //console.log(item)
                        return (
                            <tr key={art.id}>
                                <td>{item.naziv}</td>
                                <td>
                                    <input className='inputStyle'
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
                <button className='basketButton' onClick={()=>setDetails(0)}>{'<Manje'}</button>
                {props.naKasu}
            </>
        )
    };

    const naKasu = (
        props.view!==3?
        <button className='basketButton' id='naKasu' onClick={()=>props.changeView(3)} style={{float: 'right'}}>Na Kasu >></button>:
        null
        );

    return(
        <>
        {
        details?
        <BasketDetails
            items={props.items}
            korpa={props.korpa}
            naKasu={naKasu}
            updKorpa={props.updKorpa}
            disabled={props.view===3}
        />:
        <BasketWidget
            brojArtikala={brojArtikala}
            ukupnaCijena={ukupnaCijena}
            naKasu={naKasu}
        />
        }
        </>
    )
};


export default Basket;