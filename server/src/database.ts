import mysql, { ConnectionConfig } from 'mysql'
import config from './config.json' assert {type: 'json'}
import util from 'util'

// @ts-ignore
const db: CustomDb = makeDb(config.database)

// Source : https://codeburst.io/node-js-mysql-and-async-await-6fb25b01b628
function makeDb(config:ConnectionConfig):CustomDb {
    const connection = mysql.createConnection(config)
    
    return {
      query(sql:string, args:any) {
        return util.promisify(connection.query).call(connection, sql, args);
      },
      close() {
        return util.promisify(connection.end).call(connection);
      }
    }

}

interface CustomDb {
    query: Function,
    close: Function
}

export default db