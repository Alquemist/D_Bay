import React, {useState, useEffect} from 'react';

import opisi from '../Simple/opisi';
import ItemView from '../Simple/ItemView';
import Details from './Details';
import Basket from '../Simple/Basket';
import CashierForm from './CashierForm';

const ItemList = () => {

    const initKorpa = JSON.parse(localStorage.getItem('korpa'))
    const [korpa, updKorpa] = useState(initKorpa? initKorpa: []); //incijalizacija stanja korpe iz LS
    const [view, changeView] = useState(1); //pseudo router
    //1-ItemList, 2-Details, 3-Kasa
    const [clickedItem, updClickedItem] = useState([]); //promijenjljiva koja određuje koji artikl će se renedrovati ako je view===2

    const items = [
        {naziv: 'Zimocvat', opisi: opisi.zimocvat, src: './img/pic(1).jpg', cijena: 5},
        {naziv: 'Tratinčica', opisi: opisi.tratincica, src: './img/pic(2).jpg', cijena: 5},
        {naziv: 'Ruža', opisi: opisi.ruza, src: './img/pic(3).jpg', cijena: 10},
        {naziv: 'Tulipan', opisi: opisi.tulipan, src: './img/pic(5).jpg', cijena: 10},
        {naziv: 'Krin', opisi: opisi.krin, src: './img/pic(7).jpg', cijena: 12},
        {naziv: 'Orhideja', opisi: opisi.orhideja, src: './img/pic(8).jpg', cijena: 15},
    ];


    // const onItemClick = (id) => {
    //     updClickedItem(id);
    //     changeView(2)
    // };

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
            localStorage.setItem('korpa', JSON.stringify(oldVal));
            changeView(1);
            return [...oldVal];
        })
    };

    
    const itemsInBasket = korpa.map(art => {return art.id})


    console.log('initKorpa', initKorpa, 'korpa', korpa)
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
                    itemInBasket={itemsInBasket.includes(idx)}
                    onItemClick={(id) => {updClickedItem(id); changeView(2) }}/>
                )
            })
        : null
        }
        {
            view === 2 ? <Details item={{...items[clickedItem], id:clickedItem}} onAddItem={onAddItem} changeView={changeView}/>: null
        }
        {
            view === 3 ? <CashierForm/> : null
        }
        </>
    )

};

export default ItemList;