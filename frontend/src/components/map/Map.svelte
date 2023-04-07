<script>
    
    import 'leaflet/dist/leaflet.css'
    import {onMount} from 'svelte'
    import { showMap } from './functions'
    import InvisibleContainer from './InvisibleContainer.svelte';
    import HideTunnels from './HideTunnels.svelte';

    onMount(showMap)

</script>

<style>
    #map-container {
        width: 100vw;
        height: 100vh;
        position: fixed;
    }
</style>

<HideTunnels />

<InvisibleContainer />

<div id="map-container"></div>