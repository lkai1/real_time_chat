import styles from "./TopContainer.module.css"
import UserMenu from "./UserMenu"

const TopContainer = () => {

    return (
        <div className={styles.mainContainer}>
            <div className={styles.logoContainer}>
                <p className={styles.logoText}>FLIERCHAT</p>
            </div>
            <UserMenu />
        </div>
    )
}

export default TopContainer