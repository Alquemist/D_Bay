import React from 'react';
import '../Styles/Items.css';


const ItemList = (props) => {

    const itemTitle = props.itemInBasket ? `itemTitle itemTitle-selected`: 'itemTitle'

    return (
        <div onClick={() => props.onItemClick(props.id)} style={{cursor: "pointer"}}>
            <div>
                <h1 className={itemTitle}>{props.naziv}</h1>
            </div>
            <div>
                <img src={props.src} alt={props.naziv} className="itemView"></img>
            </div>
            <div>
                <p className='itemDescript' style={{marginTop: '2px'}}>{props.opisi}</p>
            </div>
        </div>
    )
}
    
export default ItemList;