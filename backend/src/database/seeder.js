import pg from 'pg'
import env_vars from '../config/environment_variables.js'
import db from './db.js'

const createNewDB = async () => {
    let createdNewDB = false
    try {

        const client = new pg.Client(`postgres://${env_vars.DATABASE_USER}:${env_vars.DATABASE_PASSWORD}@${env_vars.DATABASE_HOST}/postgres`)
        await client.connect()
        const result = await client.query(
            `SELECT EXISTS(SELECT datname FROM pg_catalog.pg_database WHERE datname = '${env_vars.DATABASE_NAME}');`
        )

        if (!result.rows[0].exists) {
            await client.query(`CREATE DATABASE ${env_vars.DATABASE_NAME}`)
            createdNewDB = true
        }

    } catch (error) {
        console.log(error)
    }
    return createdNewDB
}

const seeder = async () => {
    const createdNewDB = await createNewDB()
    if (createdNewDB) {
        await db.sync()
            .catch(error => console.log(error))
    }
}

export default seeder
