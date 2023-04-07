<script>
    // @ts-nocheck
    // Source : https://codepen.io/maheshwaghmare/pen/QxdpqG

    import config from '../../config.json'
    import {onMount} from 'svelte'

    let b = false


    async function removeNonOwnedTunnels(){
        const tunnelsToRemove = document.querySelectorAll(`img[src="${config.map.tunnel_icon_path}"]`)

        for(let tunnel of tunnelsToRemove){
            if(!b){
                tunnel.style.visibility = "hidden"
                b = true
            } 
            else {
                tunnel.style.visibility = "visible"
                b = false
            }
        }

    }
</script>

<style>
    .switch-container {
        position: fixed;
        z-index: 3;
        left: 50px;
        top: 10px;
    }

    .switch-container:hover::after {
        content: 'Si activé, vous ne verrez que les tunnels dont vous êtes propriétaires.';
        display: block;
        background-color: white;
        max-width: 100px;
        border-radius: 10px;
        padding: 5px;
        margin-top: 10px;
    }

    .switch {
    display: inline-block;
    position: relative;
    width: 50px;
    height: 25px;
    border-radius: 20px;
    background: #dfd9ea;
    transition: background 0.28s cubic-bezier(0.4, 0, 0.2, 1);
    vertical-align: middle;
    cursor: pointer;
}
.switch::before {
    content: '';
    position: absolute;
    top: 1px;
    left: 2px;
    width: 22px;
    height: 22px;
    background: #fafafa;
    border-radius: 50%;
    transition: left 0.28s cubic-bezier(0.4, 0, 0.2, 1), background 0.28s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}
.switch:active::before {
    box-shadow: 0 2px 8px rgba(0,0,0,0.28), 0 0 0 20px rgba(128,128,128,0.1);
}
input:checked + .switch {
    background: #72da67;
}
input:checked + .switch::before {
    left: 27px;
    background: #fff;
}
input:checked + .switch:active::before {
    box-shadow: 0 2px 8px rgba(0,0,0,0.28), 0 0 0 20px rgba(0,150,136,0.2);
}
</style>

<div class="switch-container" >
    <input type="checkbox" hidden={true} id="username" on:click={(e)=>{
        removeNonOwnedTunnels()
    }}>
    <label class="switch" for="username"></label>
</div>