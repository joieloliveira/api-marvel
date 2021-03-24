import './header.css';
import React from 'react'

import HeaderImg from '../img/marvelHeader.jpg';

function Header(){
    
    return (
        <div className="header">
            <img id="img" src={HeaderImg} alt="HeaderImg" />
            
        </div>
    );  
}
export default Header;

