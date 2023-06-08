import styles from "./UserMenu.module.css"
import { ReactComponent as UserIcon } from "../../../../lib/icons/userIcon.svg"
import { useContext, useState } from "react"
import { UserInfoContext } from "../../../../Contexts/UserInfoContext.js"
import { logoutService } from "../../../../services/authServices.js"
import { useNavigate } from "react-router-dom"

const UserMenu = () => {

    const [isShown, setIsShown] = useState(false)
    const { userInfoState } = useContext(UserInfoContext)
    const navigate = useNavigate()

    return (
        <div className={styles.mainContainer}>
            <p className={styles.username}>{userInfoState.username}</p>
            <button className={styles.openMenuButton}
                type="button"
                onClick={() => { setIsShown(!isShown) }}
            >
                <UserIcon fill={"white"} />
            </button>
            <div className={isShown ? styles.menu : styles.menuHidden}>
                <button className={styles.logoutButton}
                    type="button"
                    onClick={() => { logoutService(navigate) }}>
                    Kirjaudu ulos
                </button>
            </div>
        </div>
    )
}

export default UserMenu