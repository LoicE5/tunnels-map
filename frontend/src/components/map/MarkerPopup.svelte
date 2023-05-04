<svelte:options accessors={true} />
<script>
    import { onMount } from "svelte";

    let element;
    export function getHTML(){
        return element.outerHTML
    }

    export let data
    export let owned_tunnel

</script>

<style>
    p {
        margin: 8px auto;
    }

    h1 {
        margin: 0px;
        margin-bottom: 12px;
    }

    #main {
        overflow-y: hidden;
        max-height: 500px;
    }

    #main:hover {
        overflow-y: scroll;
    }
</style>

<div bind:this={element} data-owned-tunnel={owned_tunnel} id="main">
    {#each [...data.entries()] as tunnel}
        {#if tunnel[0] == "Nom"}
            <h1>{tunnel[1]}</h1>
        {:else if tunnel[0] == "État critique" || tunnel[0] == "Concédé"}
        <p><b>{tunnel[0]}</b> : {tunnel[1] > 0 ? "Oui" : "Non"}</p>
        {:else if typeof tunnel[1] == "string" && tunnel[1].includes(':00:00.000Z')}
        <p><b>{tunnel[0]}</b> : {tunnel[1].toString().split('T')[0]}</p>
        {:else}
            <p><b>{tunnel[0]}</b> : {tunnel[1]}</p>
        {/if}
    {/each}
</div>
  