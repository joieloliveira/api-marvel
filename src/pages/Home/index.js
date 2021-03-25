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
        const { data } = await axios("http://gateway.marvel.com/v1/public/characters?limit=50&offset="+offset+"&ts="+timeStamp+"&apikey="+publicKey+"&hash="+hash)
        console.log(data);
        console.log(data.data.results[0].id);
        setArrayData([data]);
      } catch (err) {
        //console.log(err)
      }
  }

  useEffect( () => {
    api()
  }, []);

  let cards = []
    for(var i=0; i<12; i++){
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
        <a href="/">previus</a>
        <a href="/">1</a>
        <a href="/">2</a>
        <a href="/">3</a>
        <a href="/">4</a>
        <a href="/">next</a>
      </div>
    </div>
  )
}

export default Home;