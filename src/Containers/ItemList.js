import React, {useState, useEffect} from 'react';

import opisi from '../Simple/opisi';
import ItemView from '../Simple/ItemView';
import Details from './Details';

const ItemList = () => {

    const [clickedItems, updClickedItem] = useState([]);
    const [view, changeView] = useState(1);
    const [korpa, updKorpa] = useState([])
    //1-ItemList, 2-Details, 3-Korpa, 4-Kasa

    const items = [
        {naziv: 'Zimocvat', opisi: opisi.zimocvat, src: './img/pic(1).jpg', cijena: 5},
        {naziv: 'Tratinčica', opisi: opisi.tratincica, src: './img/pic(2).jpg', cijena: 5},
        {naziv: 'Ruža', opisi: opisi.ruza, src: './img/pic(3).jpg', cijena: 10},
        {naziv: 'Tulipan', opisi: opisi.tulipan, src: './img/pic(5).jpg', cijena: 10},
        {naziv: 'Krin', opisi: opisi.krin, src: './img/pic(7).jpg', cijena: 12},
        {naziv: 'Orhideja', opisi: opisi.orhideja, src: './img/pic(8).jpg', cijena: 15},
    ];

    const onItemClick = (item, id) => {
        console.log(`item clicked: ${item}`)
        clickedItems.unshift(id)
        updClickedItem([...clickedItems]);
        changeView(2)
    };

    const onAddItem = (id, kolicina) => {
        updKorpa(oldVal => {
            oldVal.unshift({id:id, kolicina: kolicina});
            localStorage.setItem('korpa:', JSON.stringify(oldVal));
            changeView(1);
            return [...oldVal];
        })
    };

    console.log('clickedItems', clickedItems, 'view', view, 'korpa', korpa)
    return (
        <>
        {
            view===1
            ? items.map((item, idx) => {
                return (
                    <ItemView key={item.naziv} {...{...item, opisi: item.opisi.split(" ").slice(0,5).join(" ")+"...", id: idx}} onItemClick={onItemClick}/>
                )
            })
        : null
        }
        {
            view === 2 ? <Details item={{...items[clickedItems[0]], id:clickedItems[0]}} onAddItem={onAddItem}/>: null
        }    
    </>
    )

};

export default ItemList;