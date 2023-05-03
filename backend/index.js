import express from "express"
import env_vars from "./config/environment_variables.js"
import seeder from "./database/seeder.js"

const startApp = async () => {
    await seeder()
    express().listen(env_vars.APP_PORT, () => console.log(`Server is running at port: ${env_vars.APP_PORT}.`))
}

startApp()

