import './index.css';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import md5 from 'md5';

import Card from '../../components/Card';

const privateKey = "dfdd12b7f3dcc2923b903d91f034e4f9b26f5706";
const publicKey = "5335615c429ef88bb477be5acd7c2d86";
const maxCharacters = 1500;

function Home() {

  const [arrayData, setArrayData] = useState([]);

  const [offset, setOffset] = useState(0);
  const [paginaStap, setPaginaStap] = useState(12);

  const createHash = (timeStamp) => {

      const toBeHashed = timeStamp + privateKey + publicKey;
      const hashedMessage = md5(toBeHashed);
      return hashedMessage;

  }

  const api = async (req, res) => {  

      //tempo agora
      const timeStamp = Date.now().toString();
      //numero randomico de herois
      const offset = Math.floor((Math.random() * maxCharacters) + 1);
      //hash para validar a requisição
      const hash = createHash(timeStamp);

      try {
        const { data } = await axios("http://gateway.marvel.com/v1/public/characters?limit=48&offset="+offset+"&ts="+timeStamp+"&apikey="+publicKey+"&hash="+hash)
        console.log(data);
        console.log(data.data.results[0].id);
        setArrayData([data]);
      } catch (err) {
        //console.log(err)
      }
  }

  useEffect( () => {
    api();
  }, []);
 
  const pagination = (props) => {
    if(props==1){
      setOffset(0);
      setPaginaStap(12)
    }else
    if(props==2){
      setOffset(12);
      setPaginaStap(24)
    }else
    if(props==3){
      setOffset(24);
      setPaginaStap(36)
    }else
    if(props==4){
      setOffset(36);
      setPaginaStap(48)
    }
  //history.push(`/${id}`);
  }

  console.log(offset,paginaStap);

  let cards = []
    for(var i=offset; i<paginaStap; i++){
      arrayData.map(card=>{
        const http = `${card.data.results[i].thumbnail.path}.${card.data.results[i].thumbnail.extension}`
        cards.push(
          <Card titulo={card.data.results[i].name} id={card.data.results[i].id.toString()} key={card.data.results[i].id.toString()}>
            <img id="img" src = {http}/>
          </Card>
        )
        })
    }
    
  return (
    <div className="boxHome"> 
      <div className="home">
        {cards}
      </div>
      <div className="paginacao">
        <div href="/">previus</div>
        <button  onClick={e => pagination(1)}>1</button>
        <button  onClick={e => pagination(2)}>2</button>
        <button  onClick={e => pagination(3)}>3</button>
        <button  onClick={e => pagination(4)}>4</button>
        <div href="/">next</div>
      </div>
    </div>
  )
}

export default Home;