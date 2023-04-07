import config from './config.json' assert {type: 'json'}
import { query, Request, Response } from 'express'
// @ts-ignore
import app from './express_setup.js'
import db from './database.js'
// @ts-ignore
import { randomstring } from './functions.js'
import bcrypt from 'bcrypt'

app.get("/", async (req: Request, res: Response) => {
    res.send("The server is working fine :-)")
})

app.post("/login", async (req: Request|any, res: Response) => {
    const username:string = req.body.username
    const password:string = req.body.password
    
    if (username && password) {
        const results: any[] = await db.query(`select * from users where username = '${username}'`)
        

        if (results.length > 0) {

            const session_id: string = randomstring(64)
            
            const encryptedPassword = results[0].password

            if (!await bcrypt.compare(password, encryptedPassword)) {
                res.json({
                    success: false,
                    message: "Incorrect username or password !"
                })
                return
            }

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

app.post("/tunnels", async (req: Request | any, res: Response) => {
    const session_id = req.body.session_id || null
    let auth_level:number
    let user_company: string
    let user_id:number

    if (!session_id) {
        auth_level = 0
        user_id = 0
    } else {
        const result = await db.query(`select auth_level, company, users.user_id as user_id from users join sessions on users.user_id = sessions.user_id where sessions.auth = '${session_id}'`)
        auth_level = result[0].auth_level
        user_company = result[0].company
        user_id = result[0].user_id
    }

    const to_select_other_tunnels = (() => {
        if (auth_level <= 0) return config.auth_level_access[0].join(", ")
        if (auth_level == 1) return config.auth_level_access[0].concat(config.auth_level_access[1]).join(", ")
        if(auth_level >= 2) return "*"
    })()

    const owned_tunnels = await db.query(`select * from tunnels where owner_user_id = ${user_id}`)
    const other_tunnels = await db.query(`select ${to_select_other_tunnels} from tunnels`)

    const tunnels = (() => {
        let result:any[] = []

        for (let tunnel of other_tunnels) {
            let tunnel_id = tunnel.tunnel_id

            let temp_tunnel = owned_tunnels.filter(x => { if (x.tunnel_id == tunnel_id) return x })[0]
            
            if (temp_tunnel) {
                temp_tunnel.owned_tunnel = true
                result.push(temp_tunnel)
            } else {
                tunnel.owned_tunnel = false
                result.push(tunnel)
            }
        }

        return result
    })()

    res.json(tunnels)
})

app.listen(config.port, ()=>console.info(`The server is running and listening on port ${config.port}`))