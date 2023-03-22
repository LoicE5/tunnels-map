<script>
// @ts-nocheck

    import '../../css/style.css'
    import BackArrowSvg from './BackArrowSVG.svelte';
    import axios from 'axios'
    import { redirect } from '../../utils/functions'

    const placeholder = {
        username: "max21construction",
        password: "************"
    }

    let username = ''
    let password = ''

    async function submitLogin(){
        const response = await axios.post('/api/login', {
            username: username,
            password: password
        })

        const data = response.data

        if(!data.success){
            console.log(data.message)
            return
        }

        window.sessionStorage.setItem('username', data.username)
        window.sessionStorage.setItem('session_id', data.session_id)

        redirect('/')
    }

</script>

<style>
    .login-form-container {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: center;
        width: 100vw;
        height: 100vh;
        background-image: url("tunnel_background.png");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
    }

    .login-form {
        display: flex;
        flex-flow: column nowrap;
        margin: auto;
        background-color: white;
        width: 50%;
        height: 40vh;
        min-height: 400px;
        border-radius: 20px;
        box-shadow: 3px 3px 10px rgb(81, 81, 81);
    }

    .login-form label, .login-form input, .login-form button {
        display: block;
        width: max-content;
        max-width: 80%;
        margin: 10px auto;
    }

    .login-form label {
        margin-bottom: 10px;
    }

    .login-form input {
        margin-top: 10px;
        outline: none;
        border-radius: 10px;
        border: 0.5px solid gray;
        padding: 10px;
    }

    h1 {
        text-align: center;
    }

    .login-form button {
        background-color: lightgray;
        border: none;
        outline: none;
        padding: 10px;
        border-radius: 10px;
        font-weight: bold;
        transition: box-shadow 0.3s ease;
        cursor: pointer;
    }

    .login-form button:hover {
        box-shadow: 3px 3px 10px gray;
    }

    @media screen and (max-width: 600px){
        .login-form {
            width: 85%;
        }
    }

</style>

<BackArrowSvg />

<main class="login-form-container">
    <form 
        action="" 
        method="post" 
        class="login-form" 
        on:submit={(e)=>{
            e.preventDefault()
            submitLogin()
        }}
    >
        <h1>Connectez-vous à la carte Betuf</h1>
        <label for="username">Identifiant</label>
        <input type="text" name="username" id="username" placeholder={placeholder.username} bind:value={username} >
        <label for="password">Mot de passe</label>
        <input type="password" name="password" id="password" placeholder={placeholder.password} bind:value={password} >
        <button type="submit">Se connecter</button>
    </form>
</main>