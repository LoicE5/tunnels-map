import L, { type LatLngExpression, type Map } from 'leaflet'
import MarkerPopup from './MarkerPopup.svelte'
import config from '../../config.json'

export default class Tunnel {
    latitude: number
    longitude: number
    data: Map
    owned_tunnel:boolean
    
    constructor(latitude: number, longitude: number, data:Map, owned_tunnel: boolean) {
        this.longitude = longitude
        this.latitude = latitude
        this.data = data
        this.owned_tunnel = owned_tunnel
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
        const icon = new LeafIcon({ iconUrl: this.owned_tunnel ? config.map.owned_tunnel_icon_path : config.map.tunnel_icon_path });
        
        // @ts-ignore
        const popup:string = new MarkerPopup({
            target: document.body.querySelector('#invisible-container'),
            accessors: true,
            props: {
                data: this.data,
                owned_tunnel: this.owned_tunnel
            }
        } as any).getHTML()
    
        L.marker([this.latitude, this.longitude] as LatLngExpression, {icon: icon})
        .addTo(map)
        .bindPopup(popup)
    }

}