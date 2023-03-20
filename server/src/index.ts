import express, {Express, Request, Response} from 'express'
import config from './config.json' assert {type: 'json'}

const app:Express = express()

app.get("/", async (req: Request, res: Response) => {
    res.header("Access-Control-Allow-Origin", 'true')
    res.send("coucou")
})

app.listen(config.port, ()=>console.log(`The server is running and listening on port ${config.port}`))