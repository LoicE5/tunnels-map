<svelte:options accessors={true} />
<script>
    import { onMount } from "svelte";



    let element;
    export function getHTML(){
        return element.outerHTML
    }

    export let data

</script>

<style>
    p {
        margin: 8px auto;
    }

    h1 {
        margin: 0px;
        margin-bottom: 12px;
    }
</style>

<div bind:this={element}>
    {#each [...data.entries()] as tunnel}
        {#if tunnel[0] == "Nom"}
            <h1>{tunnel[1]}</h1>
        {:else if tunnel[0] == "État critique"}
        <p><b>{tunnel[0]}</b> : {tunnel[1] > 0 ? "Oui" : "Non"}</p>
        {:else}
            <p><b>{tunnel[0]}</b> : {tunnel[1]}</p>
        {/if}
    {/each}
</div>
  