import { useState, useEffect } from "react"
import { getUserInfo } from "../services/user"

const MainPage = () => {
    const [userInfoState, setUserInfoState] = useState({})

    useEffect(() => {
        const getData = async () => {
            const userInfo = await getUserInfo()
            setUserInfoState(userInfo)
        }
        getData()
    }, [])

    return (
        <div>
            {userInfoState.username}
        </div>
    )
}

export default MainPage