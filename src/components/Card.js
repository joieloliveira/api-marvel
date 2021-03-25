import './card.css';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

function Card(props){

    let history = useHistory();

    const [id, setTId] = useState([]);

    useEffect(async () => {
        setTId(props.id)
      }, []);

    return (
        <a href="">
            <div className="card" onClick={e => alterarInserir(id)}>
                <div className="title">{props.titulo}</div>
                <div className="content">
                    {props.children}
                </div>   
            </div>   
        </a>      
    ); 

    function alterarInserir(id) {
        history.push(`/pageheroes/${id}`);
    }
}

export default Card;

