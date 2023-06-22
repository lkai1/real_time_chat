import styles from "./TopContainer.module.css"
import UserMenu from "./UserMenu"
import logo from "../../../../lib/images/flierchat_logo2.png"

const TopContainer = () => {

    return (
        <div className={styles.mainContainer}>
            <div className={styles.logoContainer}>
                <img
                    src={logo}
                    alt="img"
                    className={styles.logoImg}
                />
            </div>
            <UserMenu />
        </div>
    )
}

export default TopContainer