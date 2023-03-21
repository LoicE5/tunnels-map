import L, { type LatLngExpression } from 'leaflet'
import config from '../../config.json'
import Tunnel from './Tunnel'

export async function showMap() {
    const default_coords: number[] = config.map.default_coordinates
    const default_zoom: number = config.map.default_zoom
    
    let lmap = L.map('map-container', { preferCanvas: true }).setView(default_coords as LatLngExpression, default_zoom)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(lmap)

    const tunnel = new Tunnel(
        config.map.default_coordinates[0],
        config.map.default_coordinates[1]
    )

    tunnel.render(lmap)
}

export async function getTunnelsFromServer(auth: string = ''):Promise<any> {
    const results = await fetch(`/api?auth=${auth}`)
    const data = await results.text()
    return data
}