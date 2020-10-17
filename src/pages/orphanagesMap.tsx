import React from 'react'
import mapMarker from '../images/map-marker.svg'
import {Link} from 'react-router-dom'
import {FiPlus,FiArrowRight} from 'react-icons/fi'
import '../styles/pages/orphanagesMap.css'

import {Map, TileLayer, Marker, Popup} from 'react-leaflet'
import Leaflet from 'leaflet'
import 'leaflet/dist/leaflet.css'

const mapIcon =  Leaflet.icon({
    iconSize:[40,50],
    iconUrl:mapMarker,
    iconAnchor:[20,50]
})

function Orfanatos(){
    return(
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarker} alt="happy Logo"/>
                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão estaoesperando a sua visita</p>
                </header>
                <footer>
                    <strong>Juazeiro do Norte</strong>
                    <span>Ceará</span>
                </footer>
            </aside>
            <Map 
                center={[-7.2281782,-39.3309997]}
                zoom={15}
                style={{
                    width: '100%',
                    height:'100%'
                }}
            >
               {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>*/}

               <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_TOKENMAPBOX}`}/>
                <Marker 
                    position={[-7.2281782,-39.3309997]}
                    icon={mapIcon}
                >
                    <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                NOME
                <Link to="/orfanatos/1">
                  <FiArrowRight size={20} color="#FFF" />
                </Link>
              </Popup>
                        
                </Marker>
                
            </Map>

            <Link to="/orfanatos/cadastrar" className="cadastrarOrfanato">
                <FiPlus size={32} color="#FFF"/>
            </Link>
        </div>
    );
}

export default Orfanatos;