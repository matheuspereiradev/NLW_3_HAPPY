import React,{useEffect, useState} from 'react';
import mapMarker from '../images/map-marker.svg';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import '../styles/pages/orphanagesMap.css';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import mapIcon from '../utils/mapIcon';
import api from '../services/api';
 
interface ListOrfanatos{
    id:number,
    latitude:number,
    longitude:number,
    nome:string
}

function Orfanatos() {

    const [listOrfanatos,setOrfanatos] = useState<ListOrfanatos[]>([])

    console.log(listOrfanatos)

    useEffect(()=>{
        api.get('/orfanatos').then(
            orfanato=>{
               setOrfanatos(orfanato.data)
            }
        )
    },[])

    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarker} alt="happy Logo" />
                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão estaoesperando a sua visita</p>
                </header>
                <footer>
                    <strong>Juazeiro do Norte</strong>
                    <span>Ceará</span>
                </footer>
            </aside>
            <Map
                center={[-7.2281782, -39.3309997]}
                zoom={15}
                style={{
                    width: '100%',
                    height: '100%'
                }}
            >
                {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>*/}

                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_TOKENMAPBOX}`} />
                
                {listOrfanatos.map(orf=>{
                    return(
                    <Marker
                        position={[orf.latitude, orf.longitude]}
                        icon={mapIcon}
                        key={orf.id}
                    >
                        <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                           {orf.nome}
                    <Link to={`/orfanatos/${orf.id}`}>
                                <FiArrowRight size={20} color="#FFF" />
                            </Link>
                        </Popup>
    
                    </Marker>
                    );
                })}
                    
                    

            </Map>

            <Link to="/orfanatos/cadastrar" className="cadastrarOrfanato">
                <FiPlus size={32} color="#FFF" />
            </Link>
        </div>
    );
}

export default Orfanatos;