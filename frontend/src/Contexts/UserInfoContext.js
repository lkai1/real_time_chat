import { createContext, useEffect, useState, useMemo } from "react";
import { getUserInfoService } from "../services/userServices";

export const UserInfoContext = createContext({})

const UserInfoProvider = ({ children }) => {

    const [userInfoState, setUserInfoState] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getUserInfoService()
            .then((userInfo) => {
                setUserInfoState(userInfo)
                setLoading(false)
            })
            .catch((_error) => { return })
    }, [])

    const valuesToProvide = useMemo(
        () => ({
            userInfoState,
            userInfoLoading: loading
        }),
        [userInfoState, loading],
    );

    return (
        <UserInfoContext.Provider value={valuesToProvide}>
            {children}
        </UserInfoContext.Provider>
    )
}

export default UserInfoProvider