import styles from "./MainPage.module.css"
import TopContainer from "./pageComponents/MainPage/topContainer/TopContainer.js"
import MiddleLeftContainer from "./pageComponents/MainPage/middleLeftContainer/MiddleLeftContainer.js"
import MiddleRightContainer from "./pageComponents/MainPage/middleRightContainer/MiddleRightContainer"

const MainPage = () => {

    return (
        <div className={styles.mainContainer}>
            <TopContainer />
            <div className={styles.middleContainer}>
                <MiddleLeftContainer />
                <MiddleRightContainer />
            </div>
        </div>
    )
}

export default MainPage