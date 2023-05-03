import express from "express"
import env_vars from "./config/environment_variables.js"
import seeder from "./database/seeder.js"
import authRouter from "./routes/auth.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api/auth", authRouter)

const startApp = async () => {
    await seeder()
    app.listen(env_vars.APP_PORT, () => console.log(`Server is running at port: ${env_vars.APP_PORT}.`))
}

startApp()

