import React from 'react'
import mapMarker from '../images/map-marker.svg'
import {Link} from 'react-router-dom'
import {FiPlus} from 'react-icons/fi'
import '../styles/pages/orphanagesMap.css'

import {Map, TileLayer} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
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

            </Map>

            <Link to="" className="cadastrarOrfanato">
                <FiPlus size={32} color="#FFF"/>
            </Link>
        </div>
    );
}

export default Orfanatos;