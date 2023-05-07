import { useState } from "react"
import { register } from "../services/auth.js"
import { useNavigate } from "react-router-dom"
import styles from "./RegisterPage.module.css"

const RegisterPage = () => {

    const [notification, setNotification] = useState("")
    const emptyRegisterCreds = { username: "", password: "", password2: "" }
    const [registerCreds, setRegisterCreds] = useState(emptyRegisterCreds)
    const navigate = useNavigate()

    const handleFormSubmit = async (emptyRegisterCreds, registerCreds, setRegisterCreds, setNotification) => {
        const result = await register(registerCreds)
        setRegisterCreds(emptyRegisterCreds)
        result.success ?
            navigate("/login") :
            setNotification(result.message)
    }

    return (
        <div className={styles.mainContainer}>
            <p className={styles.logo}>
                FLIERCHAT
            </p>
            <div className={styles.registerContainer}>
                <form
                    className={styles.form}
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleFormSubmit(emptyRegisterCreds, registerCreds, setRegisterCreds, setNotification)
                    }}>
                    <div className={styles.formContentContainer}>
                        <div className={styles.headerContainer}>
                            <p className={styles.headerText}>
                                REKISTERÖITYMINEN
                            </p>
                        </div>
                        <p className={styles.notification}>{notification}</p>
                        <div className={styles.inputsContainer}>
                            <input
                                placeholder="Käyttäjänimi"
                                className={styles.inputField}
                                type="text"
                                value={registerCreds.username}
                                onChange={(event) => {
                                    setRegisterCreds((prevState) => {
                                        return { ...prevState, username: event.target.value }
                                    })
                                }}
                            />
                            <input
                                placeholder="Salasana"
                                className={styles.inputField}
                                type="password"
                                value={registerCreds.password}
                                onChange={(event) => {
                                    setRegisterCreds((prevState) => {
                                        return { ...prevState, password: event.target.value }
                                    })
                                }}
                            />
                            <input
                                placeholder="Salasana uudelleen"
                                className={styles.inputField}
                                type="password"
                                value={registerCreds.password2}
                                onChange={(event) => {
                                    setRegisterCreds((prevState) => {
                                        return { ...prevState, password2: event.target.value }
                                    })
                                }}
                            />
                        </div>
                        <p className={styles.guideText}>
                            Salasanaa ei voi palauttaa, joten ota se talteen!
                        </p>
                        <input
                            className={styles.submitButton}
                            type="submit" value={"Rekisteröidy"} />
                    </div>
                </form>
                <button className={styles.toLoginButton}
                    onClick={() => { navigate("/login") }}
                >
                    Kirjaudu sisään?
                </button>
            </div>
        </div>
    )
}

export default RegisterPage