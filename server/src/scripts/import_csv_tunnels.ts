import db from '../database.js'
import { parse } from 'csv-parse'
import { randomInt, generateSqlDate } from '../functions.js'
import fs from 'fs'

interface tunnelCsvData {
    province: number,
    name: string,
    city: string,
    lended: boolean,
    road: string,
    tube1_length: number,
    tube1_opening_year: number,
    tube2_length: number,
    tube2_opening_year: number,
    vent: boolean,
    light: boolean
}

function csvToJson(path: string): tunnelCsvData[]{
    let output = []

    const csv = fs.readFileSync(path, 'utf-8')

    let lines = csv.split('\r\n')

    const colNames = lines.shift().split(';')

    for (let line of lines) {
        const values = line.split(";")
        let obj = {}

        for (let i = 0; i < values.length; i++){
            const key = colNames[i]
            const value = isNaN(values[i] as any) ? values[i] : (Number(values[i]) == 0 ? null : Number(values[i]))
            obj[key] = value == 'Oui' ? true : (value == 'Non' ? false : value)
        }

        output.push(obj)
    }

    return output
}

const companies = [
    'Vinci',
    'APRR',
    'Cofiroute',
    'Sanef',
    'SAPN',
    'Escota',
    'Leonord',
    'Adelac',
    'SMTPC'
] as string[]

const path = '/Users/loic/CloudStation/Cours/Master MIAGE 1ère année/💻 Systèmes d’information avancés/Betuf/tunnels_to_import.csv'

const data = csvToJson(path)

for (const tunnel of data) {
    const lastRevision = randomInt(tunnel.tube1_opening_year+10, 2023)

    const statement = `insert into tunnels(
        name,
        road,
        latitude,
        longitude,
        lended,
        tube1_opening_year,
        tube2_opening_year,
        build_company,
        managing_company,
        materials,
        tube1_length,
        tube2_length,
        city,
        province,
        country,
        average_light,
        air_flow,
        number_of_lanes,
        width,
        height,
        max_speed,
        date_last_revision,
        date_next_revision,
        critical,
        average_traffic_density,
        owner_user_id
    ) values (
        '${tunnel.name}',
        '${tunnel.road}',
        ${111},
        ${111},
        ${tunnel.lended},
        ${tunnel.tube1_opening_year},
        ${tunnel.tube2_opening_year},
        '${companies[randomInt(0, companies.length - 1)]}',
        '${companies[randomInt(0, companies.length - 1)]}',
        '${'Ciment, Acier trempé'}',
        ${tunnel.tube1_length},
        ${tunnel.tube2_length},
        '${tunnel.city}',
        ${tunnel.province},
        '${'France'}',
        '${tunnel.light ? randomInt(3, 12) * 100 : `Pas d éclairage`}',
        '${tunnel.vent ? randomInt(3, 12) * 100 : 'Pas de ventilation'}',
        ${randomInt(2, 6, true)},
        ${randomInt(8, 30) * 10},
        ${randomInt(3, 10)},
        ${randomInt(8, 13) * 10},
        ${generateSqlDate(lastRevision, randomInt(1, 12), randomInt(1, 28))},
        ${generateSqlDate(lastRevision+5 < 2023 ? (lastRevision+10 < 2023 ? (lastRevision+15 < 2023 ? lastRevision+20 : lastRevision+15) : lastRevision+10) : lastRevision+5, randomInt(1, 12), randomInt(1, 28))},
        ${0},
        ${randomInt(30, 500)},
        ${randomInt(1,3)}
    )`

    db.query(statement)
}

