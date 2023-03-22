import config from './config.json' assert {type: 'json'}
import { query, Request, Response } from 'express'
import app from './express_setup.js'
import db from './database.js'
import { randomstring } from './functions.js'

app.get("/", async (req: Request, res: Response) => {
    res.header("Access-Control-Allow-Origin", 'true')
    res.send("coucou")
})

app.post("/login", async (req: Request|any, res: Response) => {
    const username:string = req.body.username
    const password:string = req.body.password
    
    if (username && password) {
        const results: any[] = await db.query(`select * from users where username = '${username}' and password = '${password}'`)
        
        const session_id:string = randomstring(64)

        if (results.length > 0) {
            await db.query(`insert into sessions (user_id, auth) values (${results[0].user_id}, '${session_id}')`)

            res.json({
                username: username,
                session_id: session_id,
                success: true
            })
        } else {
            res.json({
                success: false,
                message: "Incorrect username or password !"
            })
        }

        res.end()
    } else {
        res.json({
            success: false,
            message: 'Please enter Username and Password!'
        });
		res.end();
    }
})

app.post("/isloggedin", async (req: Request | any, res: Response) => {

    const session_id = req.body.session_id

    if(!session_id) res.json(false)

    const results = await db.query(`select * from sessions where session_id = '${session_id}'`)

    res.json(results.length > 0)
})

app.post("/logout", async (req: Request | any, res: Response) => {
    const results = await db.query(`select * from sessions where auth = '${req.body.session_id}'`)

    if (results.length > 0) await db.query(`delete from sessions where auth = '${req.body.session_id}'`)
    
    res.json({
        success: true
    })
})

app.listen(config.port, ()=>console.log(`The server is running and listening on port ${config.port}`))