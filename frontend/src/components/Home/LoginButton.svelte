<script>
    import axios from "axios";
    import { reload } from "../../utils/functions";


    const session_id = window.sessionStorage.getItem('session_id') || null
    const username = window.sessionStorage.getItem('username') || null

    let modalVisible = false

    function toggleModalVisibility(){
        if(!modalVisible) modalVisible = true
        else modalVisible = false
    }

    async function logout(){
        const response = await axios.post('/api/logout', 
        {
            session_id: session_id
        })

        const data = response.data

        if(!data.success) {
            console.error('Logout failed.', data.message)
            alert('Logout failed. '+data.message)
            return
        }

        sessionStorage.clear()
        
        reload()
    }
</script>

<style>
    .login-button, .profile-icon, section {
        position: absolute;
        right: 10px;
        top: 10px;
        display: block;
        z-index: 1;
        cursor: pointer;
    }

    .login-button {
        background: linear-gradient(to right, rgb(89, 173, 206), rgb(66, 66, 224));
        color: white;
        font-size: 1.3rem;
        text-decoration-line: none;
        padding: 10px;
        border-radius: 10px;
        transition: box-shadow 0.3s ease;
    }

    .login-button:hover {
        box-shadow: 3px 3px 10px gray;
    }

    .profile-icon {
        width: 40px;
    }

    section {
        top: 50px;
        min-width: 80px;

        height: max-content;
        border-radius: 10px;
        background-color: white;
        padding: 20px;
    }

    section>div {
        margin-bottom: 5px;
    }

    .invisible {
        visibility: hidden;
    }

    .bold {
        font-weight: bold;
    }
</style>

{#if !session_id}
    <a href="/login" class="login-button">Connexion</a>
{:else}
    <img src="person_circle.svg" alt="profile" class="profile-icon" on:click={toggleModalVisibility}/>
    <section class={modalVisible ? '' : 'invisible'}>
        <div class="bold">Bienvenue, {username}</div>
        <button on:click={logout}>Se déconnecter</button>
    </section>
{/if}
