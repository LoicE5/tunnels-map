import L, { type LatLngExpression, type Map } from 'leaflet'
import MarkerPopup from './MarkerPopup.svelte'
import config from '../../config.json'

export default class Tunnel {
    latitude: number
    longitude: number
    data:Map
    
    constructor(latitude: number, longitude: number, data:Map) {
        this.longitude = longitude
        this.latitude = latitude
        this.data = data
    }

    render(map: Map) {
        const LeafIcon = L.Icon.extend({
            options: {
                iconSize:     [26, 20.5],
                shadowSize:   [30, 40],
                iconAnchor:   [0, 0],
                shadowAnchor: [2, 42],
                popupAnchor:  [0, 0]
            }
        });
    
        // @ts-ignore
        const icon = new LeafIcon({ iconUrl: config.map.tunnel_icon_path });
        
        // @ts-ignore
        const popup:string = new MarkerPopup({
            target: document.body.querySelector('#invisible-container'),
            accessors: true,
            props: {
                data: this.data
            }
        } as any).getHTML()
    
        L.marker([this.latitude, this.longitude] as LatLngExpression, {icon: icon})
        .addTo(map)
        .bindPopup(popup)
    }

}