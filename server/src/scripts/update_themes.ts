import db from '../database.js'
import { randomInt, generateSqlDate } from '../functions.js'

const visits_periods = {
    general: 3,
    elec: 5,
    water: 5,
    light: 5,
    vent: 2,
    safety: 1
} as any | object

(async () => {

    const tunnels = await db.query(`select * from tunnels`)
    
    for (let tunnel of tunnels) {

        const check_if_exists = await db.query(`select * from themes where tunnel_id = ${tunnel.tunnel_id}`)

        if (check_if_exists.length > 0)
            continue

        const year = randomInt(2022, 2023)
        const month = randomInt(1, 12)
        const day = randomInt(1, 28)
        
        await db.query(`
        insert into themes(
            tunnel_id, general, general_next, elec, elec_next,water, water_next,light, light_next,vent, vent_next,safety, safety_next
        ) values(
            ${tunnel.tunnel_id},
            ${generateSqlDate(year, month, day)},
            ${generateSqlDate(year+visits_periods.general, month, day)},
            ${generateSqlDate(year, month, day)},
            ${generateSqlDate(year+visits_periods.elec, month, day)},
            ${generateSqlDate(year, month, day)},
            ${generateSqlDate(year+visits_periods.water, month, day)},
            ${generateSqlDate(year, month, day)},
            ${generateSqlDate(year+visits_periods.light, month, day)},
            ${generateSqlDate(year, month, day)},
            ${generateSqlDate(year+visits_periods.vent, month, day)},
            ${generateSqlDate(year, month, day)},
            ${generateSqlDate(year+visits_periods.safety, month, day)}
            )`)
    }

})()