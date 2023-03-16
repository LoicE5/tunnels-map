import express, {Request, Response} from 'express'
import cors from 'cors'
import config from './config.json' assert {type: 'json'}

const app: express = express()

app.use(cors({
    origin: config.cors.origin
}))

app.get("/", async (req:Request, res:Response) => {
    res.send("coucou")
})

app.listen(config.port, console.log(`The server is running and listening on port ${config.port}`))