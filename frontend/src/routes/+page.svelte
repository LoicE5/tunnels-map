<script lang="ts">
    import axios from 'axios'
    import { onMount } from 'svelte';
    import config from '../config.json'

    let rootServerMessage:string = ''

    onMount(async ():Promise<void>=>{
        rootServerMessage = (await axios.get(config.server)).data
    })

</script>

<h1>Welcome to SvelteKit</h1>

<h2>The servers says {rootServerMessage}</h2>

