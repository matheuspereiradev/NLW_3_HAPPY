import Leaflet from 'leaflet'

import mapMarker from '../images/map-marker.svg'

const mapIcon =  Leaflet.icon({
    iconSize:[40,50],
    iconUrl:mapMarker,
    iconAnchor:[20,50]
})

export default mapIcon;