import React from 'react';
import './ItemView.css';


const ItemList = (props) => {
    //console.log(props.opisi)
    return (
        <div onClick={() => props.onItemClick(props.naziv, props.id)} style={{cursor: "pointer"}}>
            <div>
                <h1>{props.naziv}</h1>
            </div>
            <div>
                <img src={props.src} alt={props.naziv} className="ItemView"></img>
            </div>
            <div>
                <p>{props.opisi}</p>
            </div>
        </div>
    )
}
    
export default ItemList;