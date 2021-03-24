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

    //const urlAPI = "http://gateway.marvel.com/v1/public/characters?limit=9&offset="+offset+"&ts="+timeStamp+"&apikey="+publicKey+"&hash="+hash;
  }

  useEffect(async () => {
    api()
  }, []);
  
  //console.log(arrayData);
  let cards = []
  for(var i=0; i<49; i++){
    arrayData.map(card=>{
      const http = `${card.data.results[i].thumbnail.path}.${card.data.results[i].thumbnail.extension}`
      cards.push(
        <Card titulo={card.data.results[i].name} id={card.data.results[i].id.toString()} key={card.data.results[i].id.toString()}>
          <img id="img" src = {http}/>
        </Card>
      )
      })
  }

 //console.log(cards);
  return (
    <div className="home">
      {cards}
    </div>
  )
}

export default Home;

/*================================================================

const privateKey = "7cd3684824a067744989aa33c44a0fefb24a8740";
const publicKey = "22e9bab7b462ebbd01fee470d5c30192";
const maxCharacters = 1500;




function createHash(timeStamp) {

    const toBeHashed = timeStamp + privateKey + publicKey;
    const hashedMessage = md5(toBeHashed);
    return hashedMessage;

}

function getCharacterList() {  

    //tempo agora
    const timeStamp = Date.now().toString();
    //numero randomico de herois
    const offset = Math.floor((Math.random() * maxCharacters) + 1);
    //hash para validar a requisição
    const hash = createHash(timeStamp);

    
    const urlAPI = "http://gateway.marvel.com/v1/public/characters?limit=9&offset="+offset+"&ts="+timeStamp+"&apikey="+publicKey+"&hash="+hash;

    // sla mas funcionou
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            getImages(data);
        }
    };
    xhttp.open("GET", urlAPI, true);
    xhttp.send();
}
*/