import './index.css';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import md5 from 'md5';
import { Container, Jumbotron } from 'reactstrap';

const privateKey = "dfdd12b7f3dcc2923b903d91f034e4f9b26f5706";
const publicKey = "5335615c429ef88bb477be5acd7c2d86";
const maxCharacters = 1500;

function Heroes (props) {

  const [arrayDataHeroe, setArrayDataHeroe] = useState([]);
  /* const [arrayDataSeries, setArrayDataSeries] = useState([]); */

  const id = props.match.params.id

  const createHash = (timeStamp) => {

    const toBeHashed = timeStamp + privateKey + publicKey;
    const hashedMessage = md5(toBeHashed);
    return hashedMessage;

  }
//Conexão para buscar o heroi escolhido===========================================
  const apiHeroe = async (req, res) => {  

    //tempo agora
    const timeStamp = Date.now().toString();
    //numero randomico de herois
    const offset = Math.floor((Math.random() * maxCharacters) + 1);
    //hash para validar a requisição
    const hash = createHash(timeStamp);

    try {
      const { data } = await axios("http://gateway.marvel.com/v1/public/characters/"+id+"?limit=1&offset="+offset+"&ts="+timeStamp+"&apikey="+publicKey+"&hash="+hash)
      console.log(data);
      //console.log(data.data.results[0].stories.collectionURI);
      setArrayDataHeroe([data]);
    } catch (err) {
      //console.log(err)
    }

    //const urlAPI = "http://gateway.marvel.com/v1/public/characters?limit=9&offset="+offset+"&ts="+timeStamp+"&apikey="+publicKey+"&hash="+hash;
  }
//Conexão para buscar as series===========================================
  /* const apiSeries = async (req, res) => {  

    //tempo agora
    const timeStamp = Date.now().toString();
    //numero randomico de herois
    const offset = Math.floor((Math.random() * maxCharacters) + 1);
    //hash para validar a requisição
    const hash = createHash(timeStamp);

    try {
      const { data } = await axios("http://gateway.marvel.com/v1/public/characters/"+id+"/series?limit=10&offset="+offset+"&ts="+timeStamp+"&apikey="+publicKey+"&hash="+hash)
      console.log(data);
      //console.log(data.data.results[0].stories.collectionURI);
      setArrayDataSeries([data]);
    } catch (err) {
      //console.log(err)
    }

    //const urlAPI = "http://gateway.marvel.com/v1/public/characters?limit=9&offset="+offset+"&ts="+timeStamp+"&apikey="+publicKey+"&hash="+hash;
  } */

  /* console.log(arrayDataSeries); */

  useEffect(async () => {
    apiHeroe()
    //apiSeries()
  }, []);

   /* let cards = []
  for(var i=0; i<49; i++){
    arrayData.map(card=>{
      const http = `${card.data.results[i].thumbnail.path}.${card.data.results[i].thumbnail.extension}`
      cards.push(
        <Card titulo={card.data.results[i].name} id={card.data.results[i].id.toString()} key={card.data.results[i].id.toString()}>
          <img id="img" src = {http}/>
        </Card>
      )
      })
  }  */

  let mkPageHeroeChoose = []
  arrayDataHeroe.map(page=>{
      const thumbnail = `${page.data.results[0].thumbnail.path}.${page.data.results[0].thumbnail.extension}`;
      //console.log(page.data.results[0].series.items[1].resourceURI);
      mkPageHeroeChoose.push(
      <div className="cardHeroeDescription" key={mkPageHeroeChoose.toString()}>
          <div className="Title"><strong>{page.data.results[0].name}</strong></div> 
          <div className="boxImgDescription">
            <div className="boxImg">
              <img id="img" src = {thumbnail}/>
            </div>

            <div className="boxDescription">
              <p><strong>Descrição:</strong> {page?.data.results[0].description ? page.data.results[0].description : 'There is no information or description of this hero'}</p> 
            </div>
          </div>
      </div>
      )
    }
  )

  //<DescriptionHero>{item?.description ? item.description : 'There is no information or description of this hero'}</DescriptionHero>
  /* let series = []
  arrayDataSeries.map(page=>{
      //const thumbnail = `${page.data.results[0].thumbnail.path}.${page.data.results[0].thumbnail.extension}`;
      //console.log(page.data.results[0].series.items[1].resourceURI);
      mkPageHeroeChoose.push(
      <div key={mkPageHeroeChoose.toString()}>
        <div className="thumbnailDescription">
          
          <div className="thumbnail">
          </div>

          <div className="description">
            <p>{page.data.results[0].series.items.resourceURI}</p> 
          </div>

        </div>
      </div>
      )
    }
  ) */

  return(
    <Container className="boxPageHeroe">
      <div>{mkPageHeroeChoose}</div>
    </Container>
  )
}

export default Heroes;
