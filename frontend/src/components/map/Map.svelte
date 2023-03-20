<script>
    
    import 'leaflet/dist/leaflet.css'
    import {onMount} from 'svelte'
    import { showMap } from './functions'

    onMount(showMap)

    fetch('/api').then(res=>res.text().then(txt=>console.log(txt)))

</script>

<style>
    #map-container {
        width: 100vw;
        height: 100vh;
        position: fixed;
    }
</style>

<div id="map-container"></div>