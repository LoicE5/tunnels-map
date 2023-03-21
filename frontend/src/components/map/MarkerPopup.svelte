<svelte:options accessors={true} />
<script>  
    let element;
    export function getHTML(){
        return element.outerHTML
    }
</script>


<div bind:this={element}>
    <h1>Tunnel n° qqchose</h1>
    <h2>Pologne 🇵🇱</h2>
    <button>bouton</button>
</div>
  