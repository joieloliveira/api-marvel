import './card.css';
import React, { useEffect, useState } from 'react';

function Card(props){

    const [id, setTId] = useState([]);

    useEffect(async () => {
        setTId(props.id)
      }, []);

    return (
        <a href="#">
            <div className="card" onClick={e => alterarInserir(id)}>
                <div className="title">{props.titulo}</div>
                <div className="content">
                    {props.children}
                </div>   
            </div>   
        </a>      
    ); 

    function alterarInserir(id) {
        // action creator -> action
        window.location = `/pageheroes/${id}`
        console.log(id)
    }
}

export default Card;

