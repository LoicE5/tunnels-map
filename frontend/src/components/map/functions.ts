import L from 'leaflet'
import config from '../../config.json'

export function showMap():void {
    const default_coords:Array<number> = config.map.default_coordinates
    const default_zoom: number = config.map.default_zoom
    
    let lmap = L.map('map-container', { preferCanvas: true }).setView(default_coords, default_zoom)
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(lmap)

    createTunnelMarker(`<h1>Tunnel n° qqchose</h1><h2>Pologne</h2><button>bouton</button>`, config.map.default_coordinates, lmap)
}

export function createTunnelMarker(content:string, coords:Array<number>, map:any):void{

    const LeafIcon = L.Icon.extend({
        options: {
            iconSize:     [26, 20.5],
            shadowSize:   [30, 40],
            iconAnchor:   [0, 0],
            shadowAnchor: [2, 42],
            popupAnchor:  [0, 0]
        }
    });

    const icon = new LeafIcon({iconUrl: config.map.tunnel_icon_path});

    L.marker(coords, {icon: icon})
    .addTo(map)
    .bindPopup(content)
}

