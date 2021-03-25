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
        // action creator -> action
        history.push(`/pageheroes/${id}`);
        console.log(id)
    }
}

export default Card;

