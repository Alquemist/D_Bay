import React, {useState, useEffect} from 'react';

import opisi from '../Simple/opisi';
import ItemView from '../Simple/ItemView';
import Details from './Details';
import Basket from '../Simple/Basket';
import CashierForm from './CashierForm';

const ItemList = () => {

    const [clickedItems, updClickedItem] = useState([]);
    const [view, changeView] = useState(1);
    const [korpa, updKorpa] = useState([{id:1, kolicina:2}])
    //1-ItemList, 2-Details, 3-Kasa

    const items = [
        {naziv: 'Zimocvat', opisi: opisi.zimocvat, src: './img/pic(1).jpg', cijena: 5},
        {naziv: 'Tratinčica', opisi: opisi.tratincica, src: './img/pic(2).jpg', cijena: 5},
        {naziv: 'Ruža', opisi: opisi.ruza, src: './img/pic(3).jpg', cijena: 10},
        {naziv: 'Tulipan', opisi: opisi.tulipan, src: './img/pic(5).jpg', cijena: 10},
        {naziv: 'Krin', opisi: opisi.krin, src: './img/pic(7).jpg', cijena: 12},
        {naziv: 'Orhideja', opisi: opisi.orhideja, src: './img/pic(8).jpg', cijena: 15},
    ];

    // let brojArtikala, ukupnaCijena = [0, 0];
    // for (const item of korpa) {
    //     console.log(item, brojArtikala)
    //     brojArtikala += item.kolicina? item.kolicina: 0
    //     ukupnaCijena += item.kolicina? item.kolicina * (items[item.id].cijena): 0
    // };


    const onItemClick = (item, id) => {
        console.log(`item clicked: ${item}`)
        clickedItems.unshift(id)
        updClickedItem([...clickedItems]);
        changeView(2)
    };

    const onAddItem = (id, kolicina) => {
        updKorpa(oldVal => {
            console.log('oldVal:', oldVal)
            if (oldVal.length) {
                const idx = oldVal.findIndex(art => art.id===id)
                console.log('idx:', idx)
                idx<0?
                oldVal.unshift({id:id, kolicina: kolicina}):
                oldVal[idx].kolicina += kolicina;
            } else {
                oldVal.unshift({id:id, kolicina: kolicina});
            }
            
            localStorage.setItem('korpa:', JSON.stringify(oldVal));
            changeView(1);
            return [...oldVal];
        })
    };

    

    console.log('clickedItems', clickedItems, 'korpa', korpa)
    console.log(korpa.length)
    return (
        <>
        {
            korpa.length?
            <Basket
                korpa={korpa}
                items={items}
                updKorpa={updKorpa}
                view={view}
                changeView={changeView}
            />
            :null
        }
        {
            view===1
            ? items.map((item, idx) => {
                return (
                    <ItemView key={item.naziv}
                    {...{...item, opisi: item.opisi.split(" ").slice(0,5).join(" ")+"...", id: idx}}
                    clickedItems={clickedItems}
                    onItemClick={onItemClick}/>
                )
            })
        : null
        }
        {
            view === 2 ? <Details item={{...items[clickedItems[0]], id:clickedItems[0]}} onAddItem={onAddItem}/>: null
        }
        {
            view === 3 ? <CashierForm/> : null
        }
        </>
    )

};

export default ItemList;