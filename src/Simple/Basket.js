import React, {useState} from 'react';
import '../Styles/Basket.css';

const Basket = (props) => {

    // U okviru Basket komponente definisane su dvije child komponente "BasketWidget" i "BasketDetails" 
    // U zavisnosti od vrijednosti promijenljive details renderuje se jedna ili druga
    // BasketWidget prikazuje samo osnovne podatke o stanju korpe i šredi prostor
    // Pritiskom na dugme "Detalji" prikazuju se detaljni podaci o korpi "BasketDetails"
    // U detaljnom prikazu imamo mogućnost dodavanja ili brisanja artikala iz korpe


    const [details, setDetails] = useState(0)

    const [brojArtikala, ukupnaCijena] = //inicijalizacija promijenljivih na osnovu korpe
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

        const onChangeItem = (artId, kolicina) => {
            
        }
        
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
                                            korpa[idx] = {id: art.id, kolicina: Number(e.target.value)};
                                            localStorage.setItem('korpa', JSON.stringify(korpa));
                                            props.updKorpa(korpa)
                                        }}
                                    />
                                </td>
                                <td>{item.cijena*art.kolicina}</td>
                                <td style={{paddingTop: '2px', paddingBottom: '2px'}}>
                                    <button className='removeItem'
                                        disabled={props.disabled}
                                        onClick={()=>{
                                            props.updKorpa((oldVal)=>{
                                                oldVal.splice(idx, 1)
                                                localStorage.setItem('korpa', JSON.stringify(oldVal))
                                                return [...oldVal]
                                            })
                                    }}>X</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
                <button className='basketButton' onClick={()=>setDetails(0)}>{'< Manje'}</button>
                {props.naKasu}
            </>
        )
    };

    const naKasu = (
        props.view!==3?
        <button className='basketButton' style={{float: 'right'}} onClick={()=>props.changeView(3)}>Kasa >></button>:
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
            disabled={props.view===3}
            updKorpa={props.updKorpa}
            
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