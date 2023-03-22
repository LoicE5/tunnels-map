import L, { map, type LatLngExpression } from 'leaflet'
import config from '../../config.json'
import Tunnel from './Tunnel'
import axios from 'axios'

export async function showMap() {
    const default_coords: number[] = config.map.default_coordinates
    const default_zoom: number = config.map.default_zoom
    
    let lmap = L.map('map-container', { preferCanvas: true }).setView(default_coords as LatLngExpression, default_zoom)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(lmap)

    // Tunnels

    const tunnels = await getTunnelsFromServer()

    for (const tunnel of tunnels) {
        // @ts-ignore
        let tunnelFR:Map = new Map()
        const mapping = config.tunnels_data_mapping

        console.log(mapping)

        // @ts-ignore
        for (const english in mapping) {
            const french = mapping[english]
            const value = tunnel[english]

            if (value || value == 0) tunnelFR.set(french, value)
        }

        console.log(tunnelFR)

        const tunnelObj = new Tunnel(
            tunnel.latitude,
            tunnel.longitude,
            tunnelFR
        )
    
        tunnelObj.render(lmap)
    }

    console.log(tunnels)




}

export async function getTunnelsFromServer():Promise<any> {
    const results = await axios.post("/api/tunnels", {
        session_id: window.sessionStorage.getItem('session_id') || null
    })
    const data = results.data
    return data
}