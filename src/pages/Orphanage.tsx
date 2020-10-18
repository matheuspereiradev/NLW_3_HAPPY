import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";

import '../styles/pages/orphanage.css';
import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";
import api from "../services/api";
import { useParams } from "react-router-dom";

interface Orfanato{
  abre_as:string,
  latitude:number,
  longitude:number,
  nome:string,
  sobre:string,
  instrucoes:string,
  aberto_final_semana:string,
  imagens:{
    id:number,
    url:string
  }[]
}

interface routeParam{
  id:string
}

export default function Orphanage() {

  const params =useParams<routeParam>();
  const [orfanato,setOrfanato] = useState<Orfanato>();
  const [indexImage,setIndexImage] = useState(0);

    useEffect(()=>{
        api.get(`/orfanatos/${params.id}`).then(
            orfanato=>{
               setOrfanato(orfanato.data)
            }
        )
    },[params.id])//se mudar o id do parametro

  if(!orfanato){
    return (
      <p>carregando...</p>
    )
      
  }  

  return (
    <div id="page-orphanage">
      
    <Sidebar/>

      <main>
        <div className="orphanage-details">
          
          <img src={orfanato.imagens[indexImage].url} alt={orfanato.nome} />

          <div className="images">
            {orfanato.imagens.map((img,index)=>{
              return(
                <button 
                key={img.id} 
                className={indexImage===index ? "active" : "" }
                type="button" 
                onClick={()=>{
                  setIndexImage(index)
                }}>
                  <img src={img.url} alt={orfanato.nome} />
                </button>
              )
            })}
            
          </div>
          
          <div className="orphanage-details-content">
          <h1>{orfanato.nome}</h1>
          <p>{orfanato.sobre}</p>

            <div className="map-container">
              <Map 
                center={[orfanato.latitude,orfanato.longitude]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer 
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_TOKENMAPBOX}`}
                />
                <Marker interactive={false} icon={mapIcon} position={[orfanato.latitude,orfanato.longitude]} />
              </Map>

              <footer>
                <a target= "_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${orfanato.latitude},${orfanato.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orfanato.instrucoes}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orfanato.abre_as}
              </div>

              

              { orfanato.aberto_final_semana ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  Atendemos <br />
                  fim de semana
                </div>
              ) : (
                <div className="dont-open-on-weekends">
                  <FiInfo size={32} color="#FF669D"/>
                  Não Atendemos <br />
                  fim de semana
                </div>
              ) } 
            </div>

            

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}